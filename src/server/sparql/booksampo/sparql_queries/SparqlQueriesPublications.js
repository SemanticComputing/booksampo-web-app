const perspectiveID = 'publications'

export const publicationProperties = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
  {
    ?id kaunokki:kansikuva ?image__id .
    ?image__id ks-annotaatio:tiedostoUrl ?image__url .
    OPTIONAL {
      ?image__id skos:prefLabel ?image__description .
    }
  }
  UNION
  {
    ?id kaunokki:sivuLkm ?pageCount__id .
    BIND(?pageCount__id as ?pageCount__prefLabel)
  }
  UNION
  {
    ?id kaunokki:hasPublisher ?publisher__id .
    ?publisher__id skos:prefLabel ?publisher__prefLabel .
  }
  UNION
  {
    ?id kaunokki:ilmestymisvuosi ?publicationYear__id .
    ?publicationYear__id skos:prefLabel ?publicationYear__prefLabel .
    OPTIONAL { 
      ?publicationYear__id yso-time:earliestStart ?publicationYear__start_ .
    }
    OPTIONAL { 
      ?publicationYear__id yso-time:latestEnd ?publicationYear__end_ .
    }
  }
  UNION
  {
    ?id kaunokki:kieli ?language__id .
    BIND(?language__id as ?language__prefLabel)
  }
  UNION
  {
    ?id kaunokki:onEnsimmainenVersio ?firstVersion__id .
    ?firstVersion__id skos:prefLabel ?firstVersion__prefLabel .
    FILTER(LANG(?firstVersion__prefLabel) = "<LANG>")
  }
  UNION
  {
    ?id kaunokki:kaantaja ?translator__id .
    ?translator__id skos:prefLabel ?translator__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?translator__id)), "/table") AS ?translator__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:kuvittaja ?illustrator__id .
    ?illustrator__id skos:prefLabel ?illustrator__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?illustrator__id)), "/table") AS ?illustrator__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:toimittaja ?otherAuthor__id .
    ?otherAuthor__id skos:prefLabel ?otherAuthor__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?otherAuthor__id)), "/table") AS ?otherAuthor__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in ?work__id .
    OPTIONAL { 
      ?work__id skos:prefLabel ?work__prefLabel_ .
    }
    BIND(COALESCE(?work__prefLabel_, ?work__id) as ?work__prefLabel)
    OPTIONAL {
      ?work__id a kaunokki:romaani .
      BIND(CONCAT("/novels/page/", ENCODE_FOR_URI(STR(?work__id)), "/table") AS ?work__dataProviderUrl_novel)
    }
    OPTIONAL {
      ?work__id a <http://www.seco.tkk.fi/applications/saha#Instance_ID1237984819752> .
      BIND(CONCAT("/nonfictionBooks/page/", ENCODE_FOR_URI(STR(?work__id)), "/table") AS ?work__dataProviderUrl_nonfiction)
    }
    BIND(COALESCE(?work__dataProviderUrl_novel, ?work__dataProviderUrl_nonfiction) as ?work__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in ?work__id .
    ?work__id a ?workType__id .
    OPTIONAL { 
      ?workType__id skos:prefLabel ?workType__prefLabel_ .
      FILTER(LANG(?workType__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?workType__prefLabel_, ?workType__id) as ?workType__prefLabel)
  }
`

export const publicationsByDecadeAndGenreQuery = `
  SELECT ?id ?dataItem__id ?dataItem__prefLabel (COUNT(?publication) as ?dataItem__value) WHERE {
    <FILTER>
    {
      ?abstract_work kaunokki:manifests_in ?publication .
      ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
      ?publication kaunokki:ilmestymisvuosi ?year .
      OPTIONAL {
        {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "^.*[\\\\.](.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(^.*).[-].*.$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) = 'fi')
          FILTER(regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "^.*[\\\\.](.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) = 'fi')
          FILTER(!regex(?label, "\\\\.") && regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(^.*).[-].*.$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) = 'fi')
          FILTER(!regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
      }
      BIND(COALESCE(xsd:integer(?prefLabel_), xsd:integer(?year)) as ?id)
      ?abstract_work kaunokki:genre ?dataItem__id .
      OPTIONAL { 
        ?dataItem__id skos:prefLabel ?dataItem__prefLabel_ .
        FILTER(LANG(?dataItem__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?dataItem__prefLabel_, ?dataItem__id) as ?dataItem__prefLabel)
      FILTER(BOUND(?id))
    }
  } 
  GROUP BY ?id ?dataItem__id ?dataItem__prefLabel
  ORDER BY ?id
`

export const publicationsByYearLineChartQuery = `
  SELECT ?category (COUNT(?publication) as ?count) WHERE {
    <FILTER>
    ?abstract_work kaunokki:manifests_in ?publication .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
        ?year skos:prefLabel ?label .
        FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
    }
    OPTIONAL {
        ?year skos:prefLabel ?label_FI .
        FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?year)) as ?category)
    FILTER(BOUND(?category))
  }
  GROUP BY ?category
  ORDER BY ?category
`

export const genresByYearTimeSeriesQuery = `
  SELECT ?category ?secondaryCategory ?secondaryPrefLabel (COUNT(?publication) as ?secondaryCount) WHERE {
    <FILTER>
    {
      SELECT ?genre_id ?genre_label (COUNT(?genre_id) as ?genre_count) WHERE {
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:genre ?genre_id .
        OPTIONAL { 
          ?genre_id skos:prefLabel ?genre_label_ .
          FILTER(LANG(?genre_label_) = "fi")
        }
        BIND(COALESCE(?genre_label_, ?genre_id) as ?genre_label)
      }
      GROUP BY ?genre_id ?genre_label
      ORDER BY DESC(?genre_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:genre ?genre_id .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
    }
    OPTIONAL {
      ?year skos:prefLabel ?label_FI .
      FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(?genre_id as ?secondaryCategory)
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?year)) as ?category)
    BIND(?genre_label as ?secondaryPrefLabel)
    FILTER(BOUND(?category))
  }
  GROUP BY ?category ?secondaryCategory ?secondaryPrefLabel
  ORDER BY ?category
`

export const themesByYearTimeSeriesQuery = `
  SELECT ?category ?secondaryCategory ?secondaryPrefLabel (COUNT(?publication) as ?secondaryCount) WHERE {
    <FILTER>
    {
      SELECT ?theme_id ?theme_label (COUNT(?theme_id) as ?theme_count) WHERE {
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:teema ?theme_id .
        OPTIONAL { 
          ?theme_id skos:prefLabel ?theme_label_ .
          FILTER(LANG(?theme_label_) = "fi")
        }
        OPTIONAL {
          ?theme_id skos:prefLabel ?theme_label_SV .
          FILTER(LANG(?theme_label_SV) = "sv")
        }
        BIND(COALESCE(?theme_label_, ?theme_label_SV, ?theme_id) as ?theme_label)
      }
      GROUP BY ?theme_id ?theme_label
      ORDER BY DESC(?theme_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:teema ?theme_id .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
    }
    OPTIONAL {
      ?year skos:prefLabel ?label_FI .
      FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(?theme_id as ?secondaryCategory)
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?year)) as ?category)
    BIND(?theme_label as ?secondaryPrefLabel)
    FILTER(BOUND(?category))
  }
  GROUP BY ?category ?secondaryCategory ?secondaryPrefLabel
  ORDER BY ?category
`

export const keywordsByYearTimeSeriesQuery = `
  SELECT ?category ?secondaryCategory ?secondaryPrefLabel (COUNT(?publication) as ?secondaryCount) WHERE {
    <FILTER>
    {
      SELECT ?keyword_id ?keyword_label (COUNT(?keyword_id) as ?keyword_count) WHERE {
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:asiasana ?keyword_id .
        OPTIONAL { 
          ?keyword_id skos:prefLabel ?keyword_label_ .
          FILTER(LANG(?keyword_label_) = "fi")
        }
        OPTIONAL {
          ?keyword_id skos:prefLabel ?keyword_label_SV .
          FILTER(LANG(?keyword_label_SV) = "sv")
        }
        BIND(COALESCE(?keyword_label_, ?keyword_label_SV, ?keyword_id) as ?keyword_label)
      }
      GROUP BY ?keyword_id ?keyword_label
      ORDER BY DESC(?keyword_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:asiasana ?keyword_id .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
    }
    OPTIONAL {
      ?year skos:prefLabel ?label_FI .
      FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(?keyword_id as ?secondaryCategory)
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?year)) as ?category)
    BIND(?keyword_label as ?secondaryPrefLabel)
    FILTER(BOUND(?category))
  }
  GROUP BY ?category ?secondaryCategory ?secondaryPrefLabel
  ORDER BY ?category
`

export const concretePlacesByYearTimeSeriesQuery = `
  SELECT ?category ?secondaryCategory ?secondaryPrefLabel (COUNT(?publication) as ?secondaryCount) WHERE {
    <FILTER>
    {
      SELECT ?place_id ?place_label (COUNT(?place_id) as ?place_count) WHERE {
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:worldPlace ?place_id .
        OPTIONAL { 
          ?place_id skos:prefLabel ?place_label_ .
          FILTER(LANG(?place_label_) = "fi")
        }
        BIND(COALESCE(?place_label_, ?place_id) as ?place_label)
      }
      GROUP BY ?place_id ?place_label
      ORDER BY DESC(?place_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:worldPlace ?place_id .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
    }
    OPTIONAL {
      ?year skos:prefLabel ?label_FI .
      FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(?place_id as ?secondaryCategory)
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?year)) as ?category)
    BIND(?place_label as ?secondaryPrefLabel)
    FILTER(BOUND(?category))
  }
  GROUP BY ?category ?secondaryCategory ?secondaryPrefLabel
  ORDER BY ?category
`
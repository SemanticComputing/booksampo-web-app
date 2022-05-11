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

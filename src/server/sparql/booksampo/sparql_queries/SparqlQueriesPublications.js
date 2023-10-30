const perspectiveID = 'publications'

export const publicationProperties = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT('/${perspectiveID}/page/', ENCODE_FOR_URI(STR(?id)), '/table') AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT('https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=', ENCODE_FOR_URI(STR(?id)), '&model=booksampo-2022') as ?uri__dataProviderUrl)
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
    OPTIONAL {
      ?language__id skos:prefLabel ?language__prefLabel_ .
      FILTER(LANG(?language__prefLabel_) = '<LANG>')
    }
    OPTIONAL {
      ?language__id skos:prefLabel ?language__prefLabel_fi .
      FILTER(LANG(?language__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?language__prefLabel_, ?language__prefLabel_fi, ?language__id) as ?language__prefLabel)
  }
  UNION
  {
    ?id kaunokki:onEnsimmainenVersio ?firstVersion__id .
    OPTIONAL {
      ?firstVersion__id skos:prefLabel ?firstVersion__prefLabel_ .
      FILTER(LANG(?firstVersion__prefLabel_) = '<LANG>')
    }
    OPTIONAL {
      ?firstVersion__id skos:prefLabel ?firstVersion__prefLabel_fi .
      FILTER(LANG(?firstVersion__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?firstVersion__prefLabel_, ?firstVersion__prefLabel_fi, ?firstVersion__id) as ?firstVersion__prefLabel)
  }
  UNION
  {
    ?id kaunokki:kaantaja ?translator__id .
    ?translator__id skos:prefLabel ?translator__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?translator__id)), '/table') AS ?translator__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:kuvittaja ?illustrator__id .
    ?illustrator__id skos:prefLabel ?illustrator__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?illustrator__id)), '/table') AS ?illustrator__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:toimittaja ?otherAuthor__id .
    ?otherAuthor__id skos:prefLabel ?otherAuthor__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?otherAuthor__id)), '/table') AS ?otherAuthor__dataProviderUrl)
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
      BIND(CONCAT('/novels/page/', ENCODE_FOR_URI(STR(?work__id)), '/table') AS ?work__dataProviderUrl_novel)
    }
    OPTIONAL {
      ?work__id a <http://www.seco.tkk.fi/applications/saha#Instance_ID1237984819752> .
      BIND(CONCAT('/nonfictionBooks/page/', ENCODE_FOR_URI(STR(?work__id)), '/table') AS ?work__dataProviderUrl_nonfiction)
    }
    BIND(COALESCE(?work__dataProviderUrl_novel, ?work__dataProviderUrl_nonfiction) as ?work__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in_part ?workPart__id .
    OPTIONAL { 
      ?workPart__id skos:prefLabel ?workPart__prefLabel_ .
    }
    BIND(COALESCE(?workPart__prefLabel_, ?workPart__id) as ?workPart__prefLabel)
    OPTIONAL {
      ?workPart__id a kaunokki:romaani .
      BIND(CONCAT('/novels/page/', ENCODE_FOR_URI(STR(?workPart__id)), '/table') AS ?workPart__dataProviderUrl_novel)
    }
    OPTIONAL {
      ?workPart__id a <http://www.seco.tkk.fi/applications/saha#Instance_ID1237984819752> .
      BIND(CONCAT('/nonfictionBooks/page/', ENCODE_FOR_URI(STR(?workPart__id)), '/table') AS ?workPart__dataProviderUrl_nonfiction)
    }
    BIND(COALESCE(?workPart__dataProviderUrl_novel, ?workPart__dataProviderUrl_nonfiction) as ?workPart__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in|^kaunokki:manifests_in_part ?abstract_work .
    ?abstract_work a ?workType__id .
    OPTIONAL { 
      ?workType__id skos:prefLabel ?workType__prefLabel_ .
      FILTER(LANG(?workType__prefLabel_) = '<LANG>')
    }
    OPTIONAL { 
      ?workType__id skos:prefLabel ?workType__prefLabel_fi .
      FILTER(LANG(?workType__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?workType__prefLabel_, ?workType__prefLabel_fi, ?workType__id) as ?workType__prefLabel)
  }
  UNION
  {
    ?id ^kaunokki:partOfCollectiveWorks ?part__id .
    ?part__id skos:prefLabel ?part__prefLabel .
    BIND(CONCAT('/publications/page/', ENCODE_FOR_URI(STR(?part__id)), '/table') AS ?part__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:sarjassa ?series__id .
    ?series__id skos:prefLabel ?series__prefLabel .
    BIND(CONCAT('/series/page/', ENCODE_FOR_URI(STR(?series__id)), '/table') AS ?series__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in ?abstract_work .
    ?abstract_work kaunokki:genre ?workGenre__id .
    OPTIONAL { 
      ?workGenre__id skos:prefLabel ?workGenre__prefLabel_ .
      FILTER(LANG(?workGenre__prefLabel_) = '<LANG>')
    }
    OPTIONAL { 
      ?workGenre__id skos:prefLabel ?workGenre__prefLabel_fi .
      FILTER(LANG(?workGenre__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?workGenre__prefLabel_, ?workGenre__prefLabel_fi, ?workGenre__id) as ?workGenre__prefLabel)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in ?abstract_work .
    ?abstract_work kaunokki:teema ?workTheme__id .
    OPTIONAL { 
      ?workTheme__id skos:prefLabel ?workTheme__prefLabel_ .
      FILTER(LANG(?workTheme__prefLabel_) = '<LANG>')
    }
    OPTIONAL { 
      ?workTheme__id skos:prefLabel ?workTheme__prefLabel_fi .
      FILTER(LANG(?workTheme__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?workTheme__prefLabel_, ?workTheme__prefLabel_fi, ?workTheme__id) as ?workTheme__prefLabel)
  }
  UNION
  {
    ?id ^kaunokki:manifests_in ?abstract_work .
    ?abstract_work kaunokki:asiasana ?workKeyword__id .
    OPTIONAL { 
      ?workKeyword__id skos:prefLabel ?workKeyword__prefLabel_ .
      FILTER(LANG(?workKeyword__prefLabel_) = '<LANG>')
    }
    OPTIONAL { 
      ?workKeyword__id skos:prefLabel ?workKeyword__prefLabel_fi .
      FILTER(LANG(?workKeyword__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?workKeyword__prefLabel_, ?workKeyword__prefLabel_fi, ?workKeyword__id) as ?workKeyword__prefLabel)
  }
`

export const publicationsByDecadeAndGenreQuery = `
  SELECT ?id ?dataItem__id ?dataItem__prefLabel (COUNT(?publication) as ?dataItem__value) WHERE {
    {
      ?abstract_work kaunokki:manifests_in ?publication .
      ?publication kaunokki:onEnsimmainenVersio kaunokki:true .
      ?publication kaunokki:ilmestymisvuosi ?yearId .
      OPTIONAL {
        ?yearId skos:prefLabel ?label .
        FILTER(LANG(?label) = '')
      }
      OPTIONAL {
        ?yearId skos:prefLabel ?label_FI .
        FILTER(LANG(?label_FI) = 'fi')
      }
      OPTIONAL {
        ?yearId skos:prefLabel ?label_SV .
        FILTER(LANG(?label_SV) = 'sv')
      }
      OPTIONAL {
        ?yearId skos:prefLabel ?label_EN .
        FILTER(LANG(?label_FI) = 'en')
      }
      BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI), xsd:integer(?label_SV), xsd:integer(?label_EN)) as ?year)
      FILTER(BOUND(?year))
      BIND(CONCAT(REPLACE(STR(?year), '(.*)\\\\d.*$', '$1'), '0') AS ?decade)
      BIND(xsd:integer(?decade) as ?id)
      ?abstract_work kaunokki:genre ?dataItem__id .
      OPTIONAL { 
        ?dataItem__id skos:prefLabel ?dataItem__prefLabel_ .
        FILTER(LANG(?dataItem__prefLabel_) = '<LANG>')
      }
      OPTIONAL { 
        ?dataItem__id skos:prefLabel ?dataItem__prefLabel_fi .
        FILTER(LANG(?dataItem__prefLabel_fi) = 'fi')
      }
      BIND(COALESCE(?dataItem__prefLabel_, ?dataItem__prefLabel_fi, ?dataItem__id) as ?dataItem__prefLabel)
      FILTER(BOUND(?id))
    }
  } 
  GROUP BY ?id ?dataItem__id ?dataItem__prefLabel
  ORDER BY ?id
`

export const publicationsByDecadeAndThemeQuery = `
  SELECT ?id ?dataItem__id ?dataItem__prefLabel (COUNT(?publication) as ?dataItem__value) WHERE {
    {
      SELECT ?dataItem__id (COUNT(?publication) as ?theme_count) {
        ?publication ^kaunokki:manifests_in ?abstract_work ;
                      kaunokki:onEnsimmainenVersio kaunokki:true ;
                      kaunokki:ilmestymisvuosi ?yearId .
        ?dataItem__id ^kaunokki:teema ?abstract_work .
      }
      GROUP BY ?dataItem__id
      HAVING(?theme_count > 17)
    }

    ?dataItem__id ^kaunokki:teema ?abstract_work .
    ?abstract_work kaunokki:manifests_in ?publication .
    ?publication kaunokki:onEnsimmainenVersio kaunokki:true ;
                  kaunokki:ilmestymisvuosi ?yearId .
    ?yearId skos:prefLabel ?label .
    BIND(xsd:integer(?label) as ?year)
    FILTER(BOUND(?year))
    BIND(xsd:integer(FLOOR(?year/10)*10) AS ?id)
    ?dataItem__id skos:prefLabel ?dataItem__prefLabel .
    FILTER(LANG(?dataItem__prefLabel) = '<LANG>')

  } 
  GROUP BY ?id ?dataItem__id ?dataItem__prefLabel
  ORDER BY ?id
`

export const publicationsByYearLineChartQuery = `
  SELECT ?category (COUNT(?publication) as ?count) WHERE {
    <FILTER>
    ?abstract_work kaunokki:manifests_in ?publication .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
        ?year skos:prefLabel ?label .
        FILTER(LANG(?label) = '')
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
        <FILTER>
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:genre ?genre_id .
        OPTIONAL { 
          ?genre_id skos:prefLabel ?genre_label_ .
          FILTER(LANG(?genre_label_) = '<LANG>')
        }
        OPTIONAL { 
          ?genre_id skos:prefLabel ?genre_label_fi .
          FILTER(LANG(?genre_label_fi) = 'fi')
        }
        BIND(COALESCE(?genre_label_, ?genre_label_fi, ?genre_id) as ?genre_label)
      }
      GROUP BY ?genre_id ?genre_label
      ORDER BY DESC(?genre_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:genre ?genre_id .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) = '')
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
        <FILTER>
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:teema ?theme_id .
        OPTIONAL { 
          ?theme_id skos:prefLabel ?theme_label_ .
          FILTER(LANG(?theme_label_) = '<LANG>')
        }
        OPTIONAL {
          ?theme_id skos:prefLabel ?theme_label_fi .
          FILTER(LANG(?theme_label_fi) = 'fi')
        }
        BIND(COALESCE(?theme_label_, ?theme_label_fi, ?theme_id) as ?theme_label)
      }
      GROUP BY ?theme_id ?theme_label
      ORDER BY DESC(?theme_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:teema ?theme_id .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) = '')
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
        <FILTER>
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:asiasana ?keyword_id .
        OPTIONAL { 
          ?keyword_id skos:prefLabel ?keyword_label_ .
          FILTER(LANG(?keyword_label_) = '<LANG>')
        }
        OPTIONAL {
          ?keyword_id skos:prefLabel ?keyword_label_fi .
          FILTER(LANG(?keyword_label_fi) = 'fi')
        }
        BIND(COALESCE(?keyword_label_, ?keyword_label_fi, ?keyword_id) as ?keyword_label)
      }
      GROUP BY ?keyword_id ?keyword_label
      ORDER BY DESC(?keyword_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:asiasana ?keyword_id .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) = '')
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
        <FILTER>
        ?abstract_work kaunokki:manifests_in ?publication .
        ?publication kaunokki:ilmestymisvuosi ?year .
        ?abstract_work kaunokki:worldPlace ?place_id .
        OPTIONAL { 
          ?place_id skos:prefLabel ?place_label_ .
          FILTER(LANG(?place_label_) = '<LANG>')
        }
        OPTIONAL { 
          ?place_id skos:prefLabel ?place_label_fi .
          FILTER(LANG(?place_label_fi) = 'fi')
        }
        BIND(COALESCE(?place_label_, ?place_label_fi, ?place_id) as ?place_label)
      }
      GROUP BY ?place_id ?place_label
      ORDER BY DESC(?place_count)
      LIMIT 10
    }
    
    ?abstract_work kaunokki:manifests_in ?publication ;
                  kaunokki:worldPlace ?place_id .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) = '')
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
export const publicationLengthsByYearLineChartQuery = `
  SELECT ?category (AVG(?pageCount) as ?count) WHERE {
    <FILTER>
    ?abstract_work kaunokki:manifests_in ?publication .
    ?publication kaunokki:ilmestymisvuosi ?year .
    ?publication kaunokki:sivuLkm ?pages .
    BIND(xsd:integer(?pages) as ?pageCount)
    FILTER(BOUND(?pageCount))
    OPTIONAL {
        ?year skos:prefLabel ?label .
        FILTER(LANG(?label) = '')
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

export const genderRatiosByYearTimeSeriesQuery = `
  SELECT ?category ?secondaryCategory ?secondaryPrefLabel (COUNT(?publication) as ?secondaryCount) WHERE {
    <FILTER>
    ?abstract_work kaunokki:manifests_in ?publication .
    ?publication kaunokki:ilmestymisvuosi ?year .
    OPTIONAL {
      ?year skos:prefLabel ?label .
      FILTER(LANG(?label) = '')
    }
    OPTIONAL {
      ?year skos:prefLabel ?label_FI .
      FILTER(LANG(?label_FI) = 'fi')
    }
    BIND(COALESCE(xsd:integer(?label), xsd:integer(?label_FI)) as ?category)
    FILTER(BOUND(?category))
    ?abstract_work kaunokki:tekija ?author_id .
    {
      ?author_id foaf:gender ?secondaryCategory .
      OPTIONAL {
        ?secondaryCategory skos:prefLabel ?gender_label .
        FILTER(LANG(?gender_label) = '<LANG>')
      }
      OPTIONAL {
        ?secondaryCategory skos:prefLabel ?gender_label_fi .
        FILTER(LANG(?gender_label_fi) = 'fi')
      }
      BIND(COALESCE(?gender_label, ?gender_label_fi, ?secondaryCategory) as ?secondaryPrefLabel)
    }
    UNION 
    {
      ?abstract_work kaunokki:tekija ?author_id .
      FILTER NOT EXISTS {
        ?author_id foaf:gender [] .
      }
      BIND('gender unknown' as ?secondaryCategory)
      BIND('gender unknown' as ?secondaryPrefLabel)
    }
  }
  GROUP BY ?category ?secondaryCategory ?secondaryPrefLabel
  ORDER BY ?category
`
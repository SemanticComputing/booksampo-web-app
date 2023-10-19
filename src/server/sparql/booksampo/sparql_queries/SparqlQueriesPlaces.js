export const placePropertiesInstancePage = `
  ?id skos:prefLabel|rdfs:label ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT('/places/page/', ENCODE_FOR_URI(STR(REPLACE(STR(REPLACE(STR(?id), '%28', '~p28~', 'i')), '%29', '~p29~', 'i'))), '/table') AS ?prefLabel__dataProviderUrl)
  # BIND(CONCAT('/places/page/', ENCODE_FOR_URI(STR(?id)), '/table') AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT('https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=', ENCODE_FOR_URI(STR(?id)), '&model=booksampo-2022') as ?uri__dataProviderUrl)
  {
    ?id ^kaunokki:placeOfBirth ?personBorn__id .
    ?personBorn__id skos:prefLabel ?personBorn__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?personBorn__id)), '/table') AS ?personBorn__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:placeOfDeath ?personDead__id .
    ?personDead__id skos:prefLabel ?personDead__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?personDead__id)), '/table') AS ?personDead__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:hasLivedIn ?personLivedIn__id .
    ?personLivedIn__id skos:prefLabel ?personLivedIn__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?personLivedIn__id)), '/table') AS ?personLivedIn__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:worldPlace ?novel__id .
    ?novel__id skos:prefLabel ?novel__prefLabel .
    BIND(CONCAT('/novels/page/', ENCODE_FOR_URI(STR(?novel__id)), '/table') AS ?novel__dataProviderUrl)
  }
`

export const birthplacesQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?place)
      ?person a foaf:Person .
      ?person kaunokki:placeOfDeath ?place .
      ?person kaunokki:placeOfBirth ?category .
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelFI .
        FILTER(LANG(?prefLabelFI) = 'fi')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelEN .
        FILTER(LANG(?prefLabelEN) = 'en')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelSV .
        FILTER(LANG(?prefLabelSV) = 'sv')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelGEN .
      }
      BIND(COALESCE(?prefLabelFI, ?prefLabelEN, ?prefLabelSV, ?prefLabelGEN, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?place)
      ?person a foaf:Person .
      ?person kaunokki:placeOfDeath ?place .
      FILTER NOT EXISTS {
  		  ?person kaunokki:placeOfBirth [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const deathplacesQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?place)
      ?person a foaf:Person .
      ?person kaunokki:placeOfBirth ?place .
      ?person kaunokki:placeOfDeath ?category .
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelFI .
        FILTER(LANG(?prefLabelFI) = 'fi')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelEN .
        FILTER(LANG(?prefLabelEN) = 'en')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelSV .
        FILTER(LANG(?prefLabelSV) = 'sv')
      }
      OPTIONAL {
        ?category skos:prefLabel ?prefLabelGEN .
      }
      BIND(COALESCE(?prefLabelFI, ?prefLabelEN, ?prefLabelSV, ?prefLabelGEN, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?place)
      ?person a foaf:Person .
      ?person kaunokki:placeOfBirth ?place .
      ?person kaunokki:timeOfDeath [] .
      FILTER NOT EXISTS {
  		  ?person kaunokki:placeOfDeath [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const novelsTakingPlaceByGenreQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      ?novel kaunokki:genre ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = '<LANG>')
      }
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_fi .
        FILTER(LANG(?prefLabel_fi) = 'fi')
      }
      BIND(COALESCE(?prefLabel_, ?prefLabel_fi, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      FILTER NOT EXISTS {
        ?novel kaunokki:genre [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const novelsTakingPlaceByThemeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      ?novel kaunokki:teema ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = '<LANG>')
      }
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_fi .
        FILTER(LANG(?prefLabel_fi) = 'fi')
      }
      BIND(COALESCE(?prefLabel_, ?prefLabel_fi, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      FILTER NOT EXISTS {
        ?novel kaunokki:teema [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const genderRatioQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      ?novel kaunokki:tekija ?author .
      ?author foaf:gender ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = '<LANG>')
      }
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_fi .
        FILTER(LANG(?prefLabel_fi) = 'fi')
      }
      BIND(COALESCE(?prefLabel_, ?prefLabel_fi, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?place)
      ?novel kaunokki:worldPlace ?place ;
              a kaunokki:romaani .
      FILTER NOT EXISTS {
        ?novel kaunokki:tekija ?author .
        ?author foaf:gender [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`
const perspectiveID = 'covers'

export const coverProperties = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT('/${perspectiveID}/page/', ENCODE_FOR_URI(STR(?id)), '/table') AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT('https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=', ENCODE_FOR_URI(STR(?id)), '&model=booksampo-2022') as ?uri__dataProviderUrl)
  {
    ?id ks-annotaatio:tiedostoUrl ?image__url .
    BIND(?id as ?image__id)
    OPTIONAL {
      ?image__id skos:prefLabel ?image__description .
    }
  }
  UNION
  {
    ?id kaunokki:asiasana ?keyword__id .
    OPTIONAL { 
      ?keyword__id skos:prefLabel ?keyword__prefLabel_ .
      FILTER(LANG(?keyword__prefLabel_) = '<LANG>')
    }
    OPTIONAL { 
      ?keyword__id skos:prefLabel ?keyword__prefLabel_fi .
      FILTER(LANG(?keyword__prefLabel_fi) = 'fi')
    }
    BIND(COALESCE(?keyword__prefLabel_, ?keyword__prefLabel_fi, ?keyword__id) as ?keyword__prefLabel) 
  }
  UNION
  {
    ?id kaunokki:kuvittaja ?illustrator__id .
    ?illustrator__id skos:prefLabel ?illustrator__prefLabel .
    BIND(CONCAT('/people/page/', ENCODE_FOR_URI(STR(?illustrator__id)), '/table') AS ?illustrator__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
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
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
    ?work__id a ?workType__id .
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
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
    ?work__id kaunokki:genre ?workGenre__id .
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
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
    ?work__id kaunokki:teema ?workTheme__id .
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
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
    ?work__id kaunokki:asiasana ?workKeyword__id .
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

export const coversByKeywordQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?cover) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?cover a kaunokki:kansi .
      ?cover kaunokki:asiasana ?category .
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
      ?cover a kaunokki:kansi .
      FILTER NOT EXISTS {
        ?cover kaunokki:asiasana [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const coversByWorkTypeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?cover) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?cover a kaunokki:kansi .
      ?cover ^kaunokki:kansikuva ?physical_work .
      ?physical_work ^kaunokki:manifests_in ?work .
      ?work a ?category .
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
      ?cover a kaunokki:kansi .
      FILTER NOT EXISTS {
        ?cover ^kaunokki:kansikuva [] .
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const coversByWorkGenreQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?cover) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?cover a kaunokki:kansi .
      ?cover ^kaunokki:kansikuva ?physical_work .
      ?physical_work ^kaunokki:manifests_in ?work .
      ?work kaunokki:genre ?category .
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
      {
        ?cover a kaunokki:kansi .
        FILTER NOT EXISTS {
          ?cover ^kaunokki:kansikuva [] .
        }
      }
      UNION
      {
        ?cover a kaunokki:kansi .
        ?cover ^kaunokki:kansikuva ?physical_work .
        FILTER NOT EXISTS {
          ?physical_work ^kaunokki:manifests_in/kaunokki:genre [] .
        }
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const coversByWorkThemeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?cover) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?cover a kaunokki:kansi .
      ?cover ^kaunokki:kansikuva ?physical_work .
      ?physical_work ^kaunokki:manifests_in ?work .
      ?work kaunokki:teema ?category .
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
      {
        ?cover a kaunokki:kansi .
        FILTER NOT EXISTS {
          ?cover ^kaunokki:kansikuva [] .
        }
      }
      UNION
      {
        ?cover a kaunokki:kansi .
        ?cover ^kaunokki:kansikuva ?physical_work .
        FILTER NOT EXISTS {
          ?physical_work ^kaunokki:manifests_in/kaunokki:teema [] .
        }
      }
      BIND('Unknown' as ?category)
      BIND('Unknown' as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`
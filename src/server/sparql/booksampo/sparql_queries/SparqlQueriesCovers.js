const perspectiveID = 'covers'

export const coverProperties = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
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
      FILTER(LANG(?keyword__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?keyword__prefLabel_, ?keyword__id) as ?keyword__prefLabel) 
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
    ?id ^kaunokki:kansikuva ?physical_work .
    ?physical_work ^kaunokki:manifests_in ?work__id .
    ?work__id a ?workType__id .
    OPTIONAL { 
      ?workType__id skos:prefLabel ?workType__prefLabel_ .
      FILTER(LANG(?workType__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?workType__prefLabel_, ?workType__id) as ?workType__prefLabel)
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
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?cover a kaunokki:kansi .
      FILTER NOT EXISTS {
        ?cover kaunokki:asiasana [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`
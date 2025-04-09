export const seriesPropertiesInstancePage = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT('/series/page/', ENCODE_FOR_URI(STR(?id)), '/table') AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT('https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=', ENCODE_FOR_URI(STR(?id)), '&model=kirjasampo') as ?uri__dataProviderUrl)
  {
    ?id dce:description ?description__id .
    ?description__id skos:prefLabel ?description__prefLabel .
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
    ?id ^kaunokki:sarjassa ?part__id .
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
    ?id ^kaunokki:sarjassa ?subseries__id .
    ?subseries__id a kaunokki:sarja .
    ?subseries__id skos:prefLabel ?subseries__prefLabel .
    BIND(CONCAT('/series/page/', ENCODE_FOR_URI(STR(?subseries__id)), '/table') AS ?subseries__dataProviderUrl)
  }
`
const perspectiveID = 'people'

export const personProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(CONCAT("https://saha.kirjastot.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=kirjasampo") as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id))) AS ?prefLabel__dataProviderUrl)
    }
    UNION 
    {
      ?id <http://seco.tkk.fi/saha3/kirjasampo/kirjailijanKuva> ?image__id .
      ?image__id ks-annotaatio:tiedostoUrl ?image__url .
      OPTIONAL {
        ?image__id skos:prefLabel ?image__description .
      }
    }
    UNION
    {
      ?id kaunokki:occupation ?occupation__id .
      OPTIONAL { 
        ?occupation__id skos:prefLabel ?occupation__prefLabel_ .
        FILTER(LANG(?occupation__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?occupation__prefLabel_, ?occupation__id) as ?occupation__prefLabel)
    }
`
export const placePropertiesInstancePage = `
  ?id skos:prefLabel|rdfs:label ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
  {
    ?id ^kaunokki:placeOfBirth ?personBorn__id .
    ?personBorn__id skos:prefLabel ?personBorn__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?personBorn__id)), "/table") AS ?personBorn__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:placeOfDeath ?personDead__id .
    ?personDead__id skos:prefLabel ?personDead__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?personDead__id)), "/table") AS ?personDead__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:hasLivedIn ?personLivedIn__id .
    ?personLivedIn__id skos:prefLabel ?personLivedIn__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?personLivedIn__id)), "/table") AS ?personLivedIn__dataProviderUrl)
  }
  UNION
  {
    ?id ^kaunokki:worldPlace ?novel__id .
    ?novel__id skos:prefLabel ?novel__prefLabel .
    BIND(CONCAT("/novels/page/", ENCODE_FOR_URI(STR(?novel__id)), "/table") AS ?novel__dataProviderUrl)
  }
`
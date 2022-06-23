export const reviewPropertiesInstancePage = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/series/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
  {
    ?id kaunokki:tekija ?author__id .
    ?author__id skos:prefLabel ?author__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?author__id)), "/table") AS ?author__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:publishedInIssue ?published__id .
    BIND(?published__id as ?published__prefLabel)
  }
  UNION
  {
    ?id kaunokki:arvio ?review__id .
    BIND(?review__id as ?review__prefLabel)
  }
`
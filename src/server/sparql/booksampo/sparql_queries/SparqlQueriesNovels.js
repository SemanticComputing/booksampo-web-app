const perspectiveID = 'novels'

export const novelProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    UNION
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      FILTER(!CONTAINS(STR(?id), "kaunokki#"))
    }
    UNION
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*#(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      FILTER(CONTAINS(STR(?id), "kaunokki#"))
    }
    UNION
    {
      ?id kaunokki:tekija ?author__id .
      ?author__id skos:prefLabel ?author__prefLabel .
      BIND(CONCAT("/authors/page/", REPLACE(STR(?author__id), "^.*\\\\/(.+)", "$1")) AS ?author__dataProviderUrl)
    }
    UNION
    {
      ?id kaunokki:genre ?genre__id .
      ?genre__id skos:prefLabel ?genre__prefLabel . 
      FILTER(LANG(?genre__prefLabel) = "<LANG>")
    }
    UNION
    {
      ?id kaunokki:teema ?theme__id .
      ?theme__id skos:prefLabel ?theme__prefLabel .
      FILTER(LANG(?theme__prefLabel) = "<LANG>")
    }
    UNION
    {
      ?id kaunokki:alkukieli ?originalLanguage__id .
      BIND(?originalLanguage__id as ?originalLanguage__prefLabel)
    }
    UNION
    {
      ?id kaunokki:onPalkinto ?award__id .
      OPTIONAL { 
        ?award__id skos:prefLabel ?award__prefLabel_ .
        FILTER(LANG(?award__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?award__prefLabel_, ?award__id) as ?award__prefLabel) 
    }
`

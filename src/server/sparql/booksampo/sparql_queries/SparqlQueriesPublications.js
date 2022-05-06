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
    ?id kaunokki:toimittaja ?otherAuthor__id .
    ?otherAuthor__id skos:prefLabel ?otherAuthor__prefLabel .
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
const perspectiveID = 'nonfictionBooks'

export const nonfictionBookProperties = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__prefLabel)
  BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
  BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
  {
    ?id kaunokki:tekija ?author__id .
    ?author__id skos:prefLabel ?author__prefLabel .
    BIND(CONCAT("/people/page/", ENCODE_FOR_URI(STR(?author__id)), "/table") AS ?author__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:genre ?genre__id .
    OPTIONAL { 
      ?genre__id skos:prefLabel ?genre__prefLabel_ .
      FILTER(LANG(?genre__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?genre__prefLabel_, ?genre__id) as ?genre__prefLabel) 
  }
  UNION
  {
    ?id kaunokki:teema ?theme__id .
    OPTIONAL { 
      ?theme__id skos:prefLabel ?theme__prefLabel_ .
      FILTER(LANG(?theme__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?theme__prefLabel_, ?theme__id) as ?theme__prefLabel) 
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
    ?id kaunokki:alkukieli ?originalLanguage__id .
    OPTIONAL { 
      ?originalLanguage__id skos:prefLabel ?originalLanguage__prefLabel_ .
      FILTER(LANG(?originalLanguage__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?originalLanguage__prefLabel_, ?originalLanguage__id) as ?originalLanguage__prefLabel) 
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
  UNION
  {
    ?id kaunokki:paahenkilo ?mainCharacter__id .
    ?mainCharacter__id skos:prefLabel ?mainCharacter__prefLabel .
  }
  UNION
  {
    ?id kaunokki:toimija ?character__id .
    OPTIONAL { 
      ?character__id skos:prefLabel ?character__prefLabel_ .
      FILTER(LANG(?character__prefLabel_) = "<LANG>")
    }
    OPTIONAL {
      ?character__id skos:prefLabel ?character__prefLabelGEN_ .
    }
    BIND(COALESCE(?character__prefLabel_, ?character__prefLabelGEN_, ?character__id) as ?character__prefLabel)
  }
  UNION
  {
    ?id kaunokki:paikka ?setting__id .
    OPTIONAL { 
      ?setting__id skos:prefLabel ?setting__prefLabel_ .
      FILTER(LANG(?setting__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?setting__prefLabel_, ?setting__id) as ?setting__prefLabel)
  }
  UNION
  {
    ?id kaunokki:worldPlace ?concretePlace__id .
    OPTIONAL { 
      ?concretePlace__id skos:prefLabel ?concretePlace__prefLabel_ .
      FILTER(LANG(?concretePlace__prefLabel_) = "<LANG>")
    }
    OPTIONAL {
      ?concretePlace__id skos:prefLabel ?concretePlace__prefLabelGEN_ .
    }
    BIND(COALESCE(?concretePlace__prefLabel_, ?concretePlace__prefLabelGEN_, ?concretePlace__id) as ?concretePlace__prefLabel)
    BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?concretePlace__id)), "/table") AS ?concretePlace__dataProviderUrl)
  }
  UNION
  {
    ?id kaunokki:tapahtumaaika ?timeOfStory__id .
    OPTIONAL { 
      ?timeOfStory__id skos:prefLabel ?timeOfStory__prefLabel_ .
      FILTER(LANG(?timeOfStory__prefLabel_) = "<LANG>")
    }
    OPTIONAL {
      ?timeOfStory__id skos:prefLabel ?timeOfStory__prefLabelGEN_ .
    }
    BIND(COALESCE(?timeOfStory__prefLabel_, ?timeOfStory__prefLabelGEN_, ?timeOfStory__id) as ?timeOfStory__prefLabel)
  }
  UNION
  {
    ?id kaunokki:hasTimeOfStory ?exactTimeOfStory__id .
    OPTIONAL { 
      ?exactTimeOfStory__id skos:prefLabel ?exactTimeOfStory__prefLabel_ .
      FILTER(LANG(?exactTimeOfStory__prefLabel_) = "<LANG>")
    }
    OPTIONAL {
      ?exactTimeOfStory__id skos:prefLabel ?exactTimeOfStory__prefLabelGEN_ .
    }
    BIND(COALESCE(?exactTimeOfStory__prefLabel_, ?exactTimeOfStory__prefLabelGEN_, ?exactTimeOfStory__id) as ?exactTimeOfStory__prefLabel)
  }
  UNION
  {
    ?id sch:isbn ?isbn__id, ?isbn__prefLabel .
  }
  UNION
  {
    ?id dce:description ?bookDescription__id .
    BIND(?bookDescription__id AS ?bookDescription__prefLabel)
  }
  UNION 
  {
    ?id kaunokki:manifests_in/kaunokki:kansikuva ?image__id .
    ?image__id ks-annotaatio:tiedostoUrl ?image__url .
    OPTIONAL {
      ?image__id skos:prefLabel ?image__description .
    }
  }
  UNION
  {
    ?id kaunokki:manifests_in/kaunokki:sivuLkm ?pageCount__id .
    BIND(?pageCount__id as ?pageCount__prefLabel)
  }
  UNION
  {
    ?id kaunokki:manifests_in/kaunokki:hasPublisher ?publisher__id .
    ?publisher__id skos:prefLabel ?publisher__prefLabel .
  }
  UNION
  {
    ?id kaunokki:manifests_in/kaunokki:ilmestymisvuosi ?publicationYear__id .
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
    ?id kaunokki:hasClass ?yklClass__id .
    OPTIONAL { 
      ?yklClass__id skos:prefLabel ?yklClass__prefLabel_ .
      FILTER(LANG(?yklClass__prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?yklClass__prefLabel_, ?yklClass__id) as ?yklClass__prefLabel)
  }
`

export const nonfictionBookPublicationsQuery = `
  SELECT ?id ?uri__id ?uri__prefLabel ?uri__dataProviderUrl ?prefLabel__id 
  ?object__id ?object__prefLabel 
  ?object__prefLabel__id ?object__prefLabel__prefLabel ?object__prefLabel__dataProviderUrl
  ?object__image__id ?object__image__url ?object__image__description 
  ?object__publisher__id ?object__publisher__prefLabel 
  ?object__publicationYear__id ?object__publicationYear__prefLabel 
  ?object__pageCount__id ?object__pageCount__prefLabel
  ?object__language__id ?object__language__prefLabel
  ?object__firstVersion__id ?object__firstVersion__prefLabel
  ?object__otherAuthor__id ?object__otherAuthor__prefLabel
  WHERE {
    <FILTER>
    BIND(<ID> as ?id)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__prefLabel)
    BIND(?id as ?uri__dataProviderUrl)
    ?id skos:prefLabel ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    ?id kaunokki:manifests_in ?object__id .

    {
      ?object__id skos:prefLabel ?object__prefLabel__id .
      BIND(?object__prefLabel__id as ?object__prefLabel__prefLabel)
      BIND(CONCAT("/publications/page/", ENCODE_FOR_URI(STR(?object__id)), "/table") AS ?object__prefLabel__dataProviderUrl)
    }
    UNION
    {
      ?object__id kaunokki:kansikuva ?object__image__id .
      ?object__image__id ks-annotaatio:tiedostoUrl ?object__image__url .
      OPTIONAL {
        ?object__image__id skos:prefLabel ?object__image__description .
      }
    }
    UNION
    {
      ?object__id kaunokki:hasPublisher ?object__publisher__id .
      ?object__publisher__id skos:prefLabel ?object__publisher__prefLabel .
    }
    UNION
    {
      ?object__id kaunokki:ilmestymisvuosi ?object__publicationYear__id .
      ?object__publicationYear__id skos:prefLabel ?object__publicationYear__prefLabel .
    }
    UNION
    {
      ?object__id kaunokki:sivuLkm ?object__pageCount__id .
      BIND(?object__pageCount__id as ?object__pageCount__prefLabel)
    }
    UNION
    {
      ?object__id kaunokki:kieli ?object__language__id .
      OPTIONAL {
        ?object__language__id skos:prefLabel ?object__language__prefLabel_ .
        FILTER(LANG(?object__language__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?object__language__prefLabel_, ?object__language__id) as ?object__language__prefLabel)
    }
    UNION
    {
      ?object__id kaunokki:onEnsimmainenVersio ?object__firstVersion__id .
      ?object__firstVersion__id skos:prefLabel ?object__firstVersion__prefLabel .
      FILTER(LANG(?object__firstVersion__prefLabel) = "<LANG>")
    }
    UNION
    {
      ?object__id kaunokki:toimittaja ?object__otherAuthor__id .
      ?object__otherAuthor__id skos:prefLabel ?object__otherAuthor__prefLabel .
    }
  }
`

export const nonfictionBooksByGenreQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?book) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?book a saha:Instance_ID1237984819752 .
      ?book kaunokki:genre ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?book a saha:Instance_ID1237984819752 .
      FILTER NOT EXISTS {
        ?book kaunokki:genre [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const nonfictionBooksByOriginalLanguageQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?book) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?book a saha:Instance_ID1237984819752 .
      ?book kaunokki:alkukieli ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel) 
    }
    UNION
    {
      ?book a saha:Instance_ID1237984819752 .
      FILTER NOT EXISTS {
        ?book kaunokki:alkukieli [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const nonfictionBooksByThemeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?book) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?book a saha:Instance_ID1237984819752 .
      ?book kaunokki:teema ?category. 
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?book a saha:Instance_ID1237984819752 .
      FILTER NOT EXISTS {
        ?book kaunokki:teema [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const nonfictionBooksByPublisherQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?book) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?book a saha:Instance_ID1237984819752 .
      ?book kaunokki:manifests_in/kaunokki:hasPublisher ?category .
      ?category skos:prefLabel ?prefLabel .
    }
    UNION
    {
      ?book a saha:Instance_ID1237984819752 .
      FILTER NOT EXISTS {
        ?book kaunokki:manifests_in/kaunokki:hasPublisher [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const nonfictionBooksByAuthorGenderQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?book) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?book a saha:Instance_ID1237984819752 .
      ?book kaunokki:tekija ?author .
      ?author foaf:gender ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?book a saha:Instance_ID1237984819752 .
      FILTER NOT EXISTS {
        ?book kaunokki:tekija ?author .
        ?author foaf:gender [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

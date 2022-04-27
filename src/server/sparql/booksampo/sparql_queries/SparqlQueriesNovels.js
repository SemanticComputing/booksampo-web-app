const perspectiveID = 'novels'

export const novelProperties = `
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
    }
    UNION
    {
      ?id kaunokki:hasTimeOfStory ?timeOfStory__id .
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
`

export const placePropertiesInfoWindow = `
    OPTIONAL {
      ?id skos:prefLabel ?prefLabelFI .
      FILTER(LANG(?prefLabelFI) = 'fi')
    }
    OPTIONAL {
      ?id skos:prefLabel ?prefLabelGEN .
    }
    OPTIONAL {
      ?id rdfs:label ?labelFI .
      FILTER(LANG(?labelFI) = 'fi')
    }
    OPTIONAL {
      ?id rdfs:label ?labelGEN .
    }
    BIND(COALESCE(?prefLabelFI, ?labelFI, ?prefLabelGEN, ?labelGEN, ?id) as ?prefLabel__id)
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    #BIND(CONCAT("/places/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const novelsTakingPlaceAt = `
    OPTIONAL {
      <FILTER>
      ?related__id kaunokki:worldPlace ?id .
      ?related__id skos:prefLabel ?related__prefLabel .
      OPTIONAL {
        ?related__id skos:prefLabel [] .
        BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?related__id), "^.*\\\\/(.+)", "$1")) AS ?related__dataProviderUrl)
        FILTER(!CONTAINS(STR(?related__id), "kaunokki#"))
      }
      OPTIONAL {
        ?related__id skos:prefLabel [] .
        BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?related__id), "^.*#(.+)", "$1")) AS ?related__dataProviderUrl)
        FILTER(CONTAINS(STR(?related__id), "kaunokki#"))
      }
    }
`

export const novelsPlacesQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?novels) as ?instanceCount)
  WHERE {
    <FILTER>
    ?novels kaunokki:worldPlace ?id ;
          a <FACET_CLASS> .	
    ?id wgs84:lat ?lat ;
        wgs84:long ?long .
    FILTER NOT EXISTS {
      ?id wgs84:lat ?lat, ?lat2 .
      FILTER(?lat != ?lat2) 
    }
    FILTER NOT EXISTS {
      ?id wgs84:long ?long, ?long2 .
      FILTER(?long != ?long2) 
    }
  }
  GROUP BY ?id ?lat ?long
`

export const novelsByGenreQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount)
  WHERE {
    <FILTER>
    ?novel a kaunokki:romaani .
    ?novel kaunokki:genre ?category .
    OPTIONAL { 
      ?category skos:prefLabel ?prefLabel_ .
      FILTER(LANG(?prefLabel_) = "<LANG>")
    }
    BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const novelsByOriginalLanguageQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount)
  WHERE {
    <FILTER>
    ?novel a kaunokki:romaani .
    ?novel kaunokki:alkukieli ?category, ?prefLabel .
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`
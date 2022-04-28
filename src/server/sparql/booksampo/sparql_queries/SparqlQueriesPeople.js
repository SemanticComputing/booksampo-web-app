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
      BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?prefLabel__dataProviderUrl)
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
    UNION
    {
      ?id foaf:gender ?gender__id .
      OPTIONAL { 
        ?gender__id skos:prefLabel ?gender__prefLabel_ .
        FILTER(LANG(?gender__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?gender__prefLabel_, ?gender__id) as ?gender__prefLabel)
    }
    UNION
    {
      ?id kaunokki:aidinkieli ?language__id .
      BIND(?language__id as ?language__prefLabel)
    }
    UNION
    {
      ?id kaunokki:kansallisuus ?nationality__id .
      OPTIONAL { 
        ?nationality__id skos:prefLabel ?nationality__prefLabel_ .
        FILTER(LANG(?nationality__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?nationality__prefLabel_, ?nationality__id) as ?nationality__prefLabel)
    }
    UNION
    {
      ?id kaunokki:hasWritten ?activeYears__id .
      OPTIONAL { 
        ?activeYears__id skos:prefLabel ?activeYears__prefLabel_ .
        FILTER(LANG(?activeYears__prefLabel_) = "<LANG>")
      }
      OPTIONAL {
        ?activeYears__id skos:prefLabel ?activeYears__prefLabelGEN_ .
      }
      BIND(COALESCE(?activeYears__prefLabel_, ?activeYears__prefLabelGEN_, ?activeYears__id) as ?activeYears__prefLabel)
    }
    UNION
    {
      ?id kaunokki:timeOfBirth ?timeOfBirth__id .
      ?timeOfBirth__id skos:prefLabel ?timeOfBirth__prefLabel .
    }
    UNION
    {
      ?id kaunokki:placeOfBirth ?placeOfBirth__id .
      OPTIONAL { 
        ?placeOfBirth__id skos:prefLabel ?placeOfBirth__prefLabel_ .
        FILTER(LANG(?placeOfBirth__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?placeOfBirth__prefLabel_, ?placeOfBirth__id) as ?placeOfBirth__prefLabel)
    }
    UNION
    {
      ?id kaunokki:timeOfDeath ?timeOfDeath__id .
      ?timeOfDeath__id skos:prefLabel ?timeOfDeath__prefLabel .
    }
    UNION
    {
      ?id kaunokki:placeOfDeath ?placeOfDeath__id .
      OPTIONAL { 
        ?placeOfDeath__id skos:prefLabel ?placeOfDeath__prefLabel_ .
        FILTER(LANG(?placeOfDeath__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?placeOfDeath__prefLabel_, ?placeOfDeath__id) as ?placeOfDeath__prefLabel)
    }
`
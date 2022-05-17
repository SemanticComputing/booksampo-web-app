const perspectiveID = 'people'

export const personProperties = `
    {
      ?id skos:prefLabel ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(CONCAT("https://demo.seco.tkk.fi/saha/project/resource.shtml?uri=", ENCODE_FOR_URI(STR(?id)), "&model=booksampo-2022") as ?uri__dataProviderUrl)
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
      ?id <http://seco.tkk.fi/saha3/kirjasampo/kirjailijanMuuNimi> ?otherName__id .
      BIND(?otherName__id as ?otherName__prefLabel)
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
      ?id kaunokki:hasLivedIn ?hasLivedIn__id .
      OPTIONAL { 
        ?hasLivedIn__id skos:prefLabel ?hasLivedIn__prefLabel_ .
        FILTER(LANG(?hasLivedIn__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?hasLivedIn__prefLabel_, ?hasLivedIn__id) as ?hasLivedIn__prefLabel)
      BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?hasLivedIn__id)), "/table") AS ?hasLivedIn__dataProviderUrl)
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
      BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?placeOfBirth__id)), "/table") AS ?placeOfBirth__dataProviderUrl)
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
      BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?placeOfDeath__id)), "/table") AS ?placeOfDeath__dataProviderUrl)
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
      ?id kaunokki:hasAward ?award__id .
      OPTIONAL { 
        ?award__id skos:prefLabel ?award__prefLabel_ .
        FILTER(LANG(?award__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?award__prefLabel_, ?award__id) as ?award__prefLabel)
    }
    UNION
    {
      ?id kaunokki:hasPositionOftrust ?positionOfTrust__id .
      OPTIONAL { 
        ?positionOfTrust__id skos:prefLabel ?positionOfTrust__prefLabel_ .
        FILTER(LANG(?positionOfTrust__prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?positionOfTrust__prefLabel_, ?positionOfTrust__id) as ?positionOfTrust__prefLabel)
    }
    UNION
    {
      ?id kaunokki:hasBiographicalInformation ?biography__id .
      BIND(?biography__id as ?biography__prefLabel)
    }
    UNION
    {
      ?id kaunokki:sameAs ?samePersonAs__id .
      ?samePersonAs__id skos:prefLabel ?samePersonAs__prefLabel .
      BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?samePersonAs__id)), "/table") AS ?samePersonAs__dataProviderUrl)
    }
    UNION
    {
      ?id ^kaunokki:tekija ?novel__id .
      ?novel__id a kaunokki:romaani .
      ?novel__id skos:prefLabel ?novel__prefLabel .
      BIND(CONCAT("/novels/page/", ENCODE_FOR_URI(STR(?novel__id)), "/table") AS ?novel__dataProviderUrl)
    }
    UNION
    {
      ?id ^kaunokki:tekija ?nonfictionBook__id .
      ?nonfictionBook__id a <http://www.seco.tkk.fi/applications/saha#Instance_ID1237984819752> .
      ?nonfictionBook__id skos:prefLabel ?nonfictionBook__prefLabel .
      BIND(CONCAT("/nonfictionBooks/page/", ENCODE_FOR_URI(STR(?nonfictionBook__id)), "/table") AS ?nonfictionBook__dataProviderUrl)
    }
    UNION
    {
      ?id ^kaunokki:tekija ?otherWork__id .
      FILTER NOT EXISTS {
        ?otherWork__id a kaunokki:romaani .
      }
      FILTER NOT EXISTS {
        ?otherWork__id a <http://www.seco.tkk.fi/applications/saha#Instance_ID1237984819752> .
      }
      ?otherWork__id skos:prefLabel ?otherWork__prefLabel .
    }
`

export const peopleByGenderQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?person a foaf:Person .
      ?person foaf:gender ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?person a foaf:Person .
      FILTER NOT EXISTS {
        ?person foaf:gender [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const peopleByOccupationQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?person a foaf:Person .
      ?person kaunokki:occupation ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?person a foaf:Person .
      FILTER NOT EXISTS {
        ?person kaunokki:occupation [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const peopleByNationalityQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      ?person a foaf:Person .
      ?person kaunokki:kansallisuus ?category .
      OPTIONAL { 
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = "<LANG>")
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      ?person a foaf:Person .
      FILTER NOT EXISTS {
        ?person kaunokki:kansallisuus [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const workGenresQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?work) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?person)
      ?person a foaf:Person .
      ?person ^kaunokki:tekija ?work .
      ?work kaunokki:genre ?category .
      OPTIONAL {
        ?category skos:prefLabel ?prefLabel_ .
        FILTER(LANG(?prefLabel_) = 'fi')
      }
      BIND(COALESCE(?prefLabel_, ?category) as ?prefLabel)
    }
    UNION
    {
      BIND(<ID> as ?person)
      ?person a foaf:Person .
      ?person ^kaunokki:tekija ?work .
      FILTER NOT EXISTS {
  		  ?work kaunokki:genre [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
  }
  GROUP BY ?category ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const worksByDecadeQuery = `
  SELECT ?category ?prefLabel (COUNT(DISTINCT ?work) as ?instanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?person)
      ?person a foaf:Person .
      ?person ^kaunokki:tekija ?work .
      ?work kaunokki:manifests_in ?p_work .
      ?p_work kaunokki:onEnsimmainenVersio kaunokki:true .
      ?p_work kaunokki:ilmestymisvuosi ?year .
      OPTIONAL {
        {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "^.*[\\\\.](.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(^.*).[-].*.$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
      }
      BIND(COALESCE(?prefLabel_, ?year) as ?prefLabel)
      BIND(?prefLabel as ?category)
    }
    UNION
    {
      BIND(<ID> as ?person)
  	  ?person a foaf:Person .
  	  ?person ^kaunokki:tekija ?work .
  	  ?work kaunokki:manifests_in ?p_work .
  	  ?p_work kaunokki:onEnsimmainenVersio kaunokki:true .  
      FILTER NOT EXISTS {
  		  ?p_work kaunokki:ilmestymisvuosi [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
    }
    
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`

export const novelGenresByDecadeQuery = `
  SELECT DISTINCT ?category ?prefLabel (COUNT(DISTINCT ?novel) as ?instanceCount) ?secondaryCategory ?secondaryCategoryPrefLabel (COUNT(?secondaryCategory) as ?secondaryInstanceCount)
  WHERE {
    <FILTER>
    {
      BIND(<ID> as ?person)
      ?person a foaf:Person .
      ?person ^kaunokki:tekija ?novel .
      ?novel kaunokki:manifests_in ?pnovel .
      ?pnovel kaunokki:onEnsimmainenVersio kaunokki:true .
      ?pnovel kaunokki:ilmestymisvuosi ?year .
      OPTIONAL {
        {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "^.*[\\\\.](.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(^.*).[-].*.$", "$1"), "0") AS ?prefLabel_)
        }
        UNION {
          ?year skos:prefLabel ?label .
          FILTER(LANG(?label) != 'fi' && LANG(?label) != 'sv' && LANG(?label) != 'en')
          FILTER(!regex(?label, "\\\\.") && !regex(?label, "-"))
          BIND(CONCAT(REPLACE(?label, "(.*)\\\\d.*$", "$1"), "0") AS ?prefLabel_)
        }
      }
      BIND(COALESCE(?prefLabel_, ?year) as ?prefLabel)
      BIND(?prefLabel as ?category)
      ?novel kaunokki:genre ?secondaryCategory .
      OPTIONAL {
        ?secondaryCategory skos:prefLabel ?secondaryCategoryPrefLabel_ .
        FILTER(LANG(?secondaryCategoryPrefLabel_) = 'fi')
      }
      BIND(COALESCE(?secondaryCategoryPrefLabel_, ?secondaryCategory) as ?secondaryCategoryPrefLabel)
    }
    UNION 
    {
      BIND(<ID> as ?person)
      ?person a foaf:Person .
      ?person ^kaunokki:tekija ?novel .
      ?novel kaunokki:manifests_in ?pnovel .
      ?pnovel kaunokki:onEnsimmainenVersio kaunokki:true .
      FILTER NOT EXISTS {
  		  ?pnovel kaunokki:ilmestymisvuosi [] .
      }
      BIND("Unknown" as ?category)
      BIND("Unknown" as ?prefLabel)
      ?novel kaunokki:genre ?secondaryCategory .
      OPTIONAL {
        ?secondaryCategory skos:prefLabel ?secondaryCategoryPrefLabel_ .
        FILTER(LANG(?secondaryCategoryPrefLabel_) = 'fi')
      }
      BIND(COALESCE(?secondaryCategoryPrefLabel_, ?secondaryCategory) as ?secondaryCategoryPrefLabel)
    }

  }
  GROUP BY ?category ?prefLabel ?secondaryCategory ?secondaryCategoryPrefLabel
  ORDER BY ASC(?prefLabel)
`

export const peopleMigrationsQuery = `
  SELECT DISTINCT ?id 
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  (COUNT(DISTINCT ?person) as ?instanceCount)
  WHERE {
    <FILTER>
    ?person kaunokki:placeOfBirth ?from__id ;
            kaunokki:placeOfDeath  ?to__id ;
            a foaf:Person .   
    ?from__id skos:prefLabel ?from__prefLabel ; 
              wgs84:lat ?from__lat ;
              wgs84:long ?from__long .
    FILTER(LANG(?from__prefLabel) = 'fi')
    FILTER NOT EXISTS {
      ?from__id wgs84:lat ?lat, ?lat2 .
      FILTER(?lat != ?lat2) 
    }
    FILTER NOT EXISTS {
      ?from__id wgs84:long ?long, ?long2 .
      FILTER(?long != ?long2) 
    }
    BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?from__id)), "/table") AS ?from__dataProviderUrl)
    ?to__id skos:prefLabel ?to__prefLabel ;
            wgs84:lat ?to__lat ;
            wgs84:long ?to__long .
    FILTER(LANG(?to__prefLabel) = 'fi')
    FILTER NOT EXISTS {
      ?to__id wgs84:lat ?lat, ?lat2 .
      FILTER(?lat != ?lat2) 
    }
    FILTER NOT EXISTS {
      ?to__id wgs84:long ?long, ?long2 .
      FILTER(?long != ?long2) 
    }
    BIND(CONCAT("/places/page/", ENCODE_FOR_URI(STR(?to__id)), "/table") AS ?to__dataProviderUrl)
    BIND(IRI(CONCAT(STR(?from__id), "-", REPLACE(STR(?to__id), "^.*\\\\/(.+)", "$1") )) as ?id)
    FILTER(?from__id != ?to__id)
  }
  GROUP BY ?id 
  ?from__id ?from__prefLabel ?from__lat ?from__long ?from__dataProviderUrl
  ?to__id ?to__prefLabel ?to__lat ?to__long ?to__dataProviderUrl
  ORDER BY desc(?instanceCount)
`

export const peopleMigrationsDialogQuery = `
  SELECT * {
    <FILTER>
    ?id kaunokki:placeOfBirth <FROM_ID> ;
        kaunokki:placeOfDeath <TO_ID> ;
        skos:prefLabel ?prefLabel .
    BIND(CONCAT("/${perspectiveID}/page/", ENCODE_FOR_URI(STR(?id)), "/table") AS ?dataProviderUrl)
  }
`
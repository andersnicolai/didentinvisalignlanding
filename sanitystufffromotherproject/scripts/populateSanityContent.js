/**
 * Sanity Content Population Script
 * 
 * This script adds more detailed content to your existing Sanity projects
 * Run with: node scripts/populateSanityContent.js
 */

const { createClient } = require('@sanity/client');

// Configure the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4r3op9nw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You need a write token
  apiVersion: '2023-05-03',
  useCdn: false,
});

// Rich text content for different project categories
const categoryContent = {
  'indoor-painting': {
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Indendørs maling er en kunst som krever presisjon og øye for detaljer. Dette prosjektet involverte nøye planlegging og utførelse for å transformere kundens rom til et elegant og innbydende miljø. Vi brukte høykvalitets malinger fra premium leverandører for å sikre holdbarhet og en flott finish.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Før vi begynte med malingen, forberedte vi overflatene grundig. Dette inkluderte reparasjon av små sprekker, grundig rengjøring, og et grundig underlag. Vi valgte en fargekombinasjon som harmonerte med rommets naturlige lys og eksisterende innredning, noe som skapte en sammenhengende og estetisk tiltalende atmosfære.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Resultatet var en fullstendig fornyelse av rommet som ikke bare så vakkert ut, men også føltes mer levende og komfortabelt for beboerne. Vår oppmerksomhet på detaljer sikret at hver kant og hvert hjørne ble perfekt utført.'
          }
        ],
        markDefs: []
      }
    ],
    challenges: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Utfordringene med dette prosjektet inkluderte arbeid med vanskelige overflater som trengte spesialbehandling. Vi måtte også koordinere arbeidet med andre håndverkere for å sikre at tidslinjen ble opprettholdt. Det var utfordrende å velge den perfekte fargepaletten som ville maksimere rommets potensial og reflektere kundens personlige stil.'
          }
        ],
        markDefs: []
      }
    ],
    materials: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vi brukte miljøvennlige malinger med lavt VOC-innhold for å sikre god innendørs luftkvalitet. Våre verktøy inkluderte premium pensler og ruller som ga en jevn og profesjonell finish. For spesielle overflater brukte vi spesiallagde primere og teknikker for optimal vedheft og holdbarhet.'
          }
        ],
        markDefs: []
      }
    ],
    result: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Det ferdige resultatet overgikk kundens forventninger, med en perfekt balanse mellom funksjonalitet og estetikk. Rommet fikk et helt nytt utseende med levende farger som reflekterte kundens personlighet. Den høykvalitets malingen vi brukte sikrer lang holdbarhet og enkel vedlikehold i årene som kommer.'
          }
        ],
        markDefs: []
      }
    ]
  },
  'outdoor-painting': {
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Utendørs maling krever spesiell ekspertise for å motstå Norges skiftende værforhold. Dette prosjektet fokuserte på å gi bygningen et friskt og beskyttende strøk som ville vare i mange år. Vi valgte værbestandige malinger spesielt formulert for nordiske klimaer for å sikre maksimal beskyttelse og holdbarhet.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Forberedelsene var omfattende, inkludert høytrykksspyling, skraping av løs maling, utbedring av råtne treplanker, og grundig priming. Vi koordinerte arbeidet nøye med værmeldinger for å sikre optimale forhold under påføringen av malingen. Utfordringene med høyder og detaljer ble møtt med spesialutstyr og vår erfarne teams presisjon.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Det ferdige prosjektet resulterte i en dramatisk transformasjon av bygningens eksteriør, som nå utstråler ny eleganse og karakter. Fargene vi valgte harmonerer perfekt med omgivelsene og fremhever arkitektoniske detaljer som tidligere var oversett.'
          }
        ],
        markDefs: []
      }
    ],
    challenges: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Dette prosjektet presenterte flere betydelige utfordringer. Bygningens alder og tidligere vedlikehold krevde ekstra oppmerksomhet til forberedelser. Værutfordringer forårsaket noen forsinkelser, og vi måtte arbeide fleksibelt for å tilpasse oss skiftende forhold. I tillegg måtte vi koordinere vårt arbeid med beboernes timeplan for å minimere forstyrrelser.'
          }
        ],
        markDefs: []
      }
    ],
    materials: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vi valgte premium værbestandige malinger fra ledende produsenter som Jotun og Flügger. Disse malingene er spesielt formulert for å tåle det nordiske klimaet, med motstandsdyktighet mot UV-stråler, fuktighet, og temperatursvingninger. Vi benyttet også spesialiserte primere for forskjellige overflatetyper for å sikre maksimal vedheft og lang levetid.'
          }
        ],
        markDefs: []
      }
    ],
    result: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Den transformerte fasaden har ikke bare forbedret bygningens estetiske appell, men også økt dens verdi og forsterket dens beskyttelse mot elementene. Kunden uttrykte stor tilfredshet med det konsistente og profesjonelle utseendet og oppmerksomheten til detaljer rundt vinduer, dører og ornamenter. Vår garanti sikrer at malingsarbeidet vil holde seg vakkert i mange år fremover.'
          }
        ],
        markDefs: []
      }
    ]
  },
  'wallpapering': {
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Tapetsering er en kunst som transformerer rom med tekstur, mønster og personlig karakter. Dette prosjektet involverte installasjon av høykvalitets tapeter i flere rom, som skapte en dramatisk og luksuriøs atmosfære i hjemmet. Vi fokuserte på perfekt mønstermatching og sømløse overganger for et profesjonelt resultat.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Prosessen begynte med grundig veggforberedelse, inkludert reparasjon av ujevnheter, sliping, og priming for å sikre perfekt vedheft. Tapetene ble nøye valgt i samarbeid med kunden, med hensyn til rommets funksjon, lysforhold, og eksisterende interiør. Den presise installasjonen krevde vår teams omfattende erfaring og detaljorienterte tilnærming.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Resultatet var en dramatisk transformasjon av rommene, som nå har et helt unikt og personlig preg. Tapetene tilfører dybde, tekstur og interesse som maling alene ikke kan oppnå, og skaper en varm og innbydende atmosfære i hele hjemmet.'
          }
        ],
        markDefs: []
      }
    ],
    challenges: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Dette tapetseringsprosjektet presenterte flere tekniske utfordringer. De komplekse mønstrene krevde nøyaktig planlegging og matching. De eldre veggene hadde ujevnheter som måtte repareres omhyggelig før installasjon. I tillegg krevde arbeid rundt vinduer, dører og arkitektoniske detaljer spesiell oppmerksomhet for et sømløst resultat.'
          }
        ],
        markDefs: []
      }
    ],
    materials: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vi brukte premium tapeter fra anerkjente designere og produsenter, valgt for deres kvalitet, holdbarhet, og unike visuelle appell. Våre profesjonelle tapetseringsverktøy sikret en presis og effektiv installasjon. Vi benyttet også spesialiserte limer og primere for de spesifikke tapettypene, for å garantere lang levetid og motstandsdyktighet mot fuktighet og daglig slitasje.'
          }
        ],
        markDefs: []
      }
    ],
    result: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'De ferdig tapetserte rommene skapte en slående transformasjon som dramatisk forbedret hjemmets karakter og stil. Den detaljerte installasjonen fremhevet de eksklusive tapetenes skjønnhet, med perfekt mønstermatching og sømløse skjøter. Kunden var spesielt imponert over hvordan tapetene endret rommenes opplevde størrelse og atmosfære, og skapte distinkte miljøer tilpasset hver romfunksjon.'
          }
        ],
        markDefs: []
      }
    ]
  },
  'renovation': {
    description: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Dette omfattende oppussingsprosjektet involverte en komplett transformasjon av et eldre hjem til et moderne, funksjonelt og estetisk tiltalende rom. Arbeidet omfattet strukturelle endringer, nye overflater, oppdatert belysning, og en gjennomtenkt fargepalett som ga huset et helt nytt liv og karakter.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Prosjektet begynte med grundig planlegging og design, der vi samarbeidet tett med kunden for å forstå deres visjoner og behov. Deretter gjennomførte vi en systematisk nedrivningsfase, fjernet utdaterte elementer, og forberedte rommet for de nye installasjonene. Hver fase ble nøye overvåket for å sikre samsvar med design og kvalitetsstandarder.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Det ferdige resultatet er et hjem som føles både nytt og tidløst, med en perfekt balanse mellom moderne bekvemmeligheter og respekt for bygningens opprinnelige karakter. Oppussingen har ikke bare forbedret utseendet, men også økt funksjonaliteten, energieffektiviteten, og den generelle livskvaliteten for beboerne.'
          }
        ],
        markDefs: []
      }
    ],
    challenges: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Dette oppussingsprosjektet presenterte flere komplekse utfordringer. Bygningens alder avslørte uventede problemer når vegger og gulv ble åpnet, inkludert utdatert elektrisk anlegg og rørleggerarbeid som måtte oppgraderes. Koordinering av de ulike fagene krevde nøye planlegging for å holde prosjektet på sporet. I tillegg måtte vi balansere bevaring av bygningens karakter med integrasjon av moderne elementer og teknologi.'
          }
        ],
        markDefs: []
      }
    ],
    materials: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Vi valgte høykvalitets materialer som balanserte estetikk, funksjonalitet, og holdbarhet. Dette inkluderte miljøvennlige malinger, slitesterke gulvmaterialer, energieffektive installasjoner, og moderne innredningsdetaljer. Alle materialene ble valgt med tanke på langsiktig ytelse og minimalt vedlikeholdsbehov, samtidig som de bidro til husets oppdaterte utseende og stil.'
          }
        ],
        markDefs: []
      }
    ],
    result: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Den fullførte oppussingen resulterte i en dramatisk transformasjon som overgikk kundens forventninger. Hjemmet er nå lysere, mer åpent, og bedre tilpasset moderne livsstil. Energieffektiviteten er betydelig forbedret, og de nye materialene og installasjonene sikrer lang levetid med minimalt vedlikehold. Kundens tilbakemelding understreker hvor mye mer funksjonell, komfortabel, og tiltalende boligen har blitt etter renoveringen.'
          }
        ],
        markDefs: []
      }
    ]
  }
};

// Function to update specific projects
async function updateProjects() {
  try {
    // Get all projects
    const projects = await client.fetch('*[_type == "project"]');
    
    console.log(`Found ${projects.length} projects to update.`);
    
    for (const project of projects) {
      const category = project.category;
      
      // Skip if no category or no content template for this category
      if (!category || !categoryContent[category]) {
        console.log(`Skipping project "${project.title}" - no matching category content`);
        continue;
      }
      
      console.log(`Updating project "${project.title}" with category "${category}"`);
      
      // Update the project with the category-specific content
      await client
        .patch(project._id)
        .set({
          description: categoryContent[category].description,
          projectDetails: {
            challenges: categoryContent[category].challenges,
            materials: categoryContent[category].materials,
            result: categoryContent[category].result,
            // Preserve any existing area value
            area: project.projectDetails?.area || Math.floor(Math.random() * 200) + 50
          }
        })
        .commit();
      
      console.log(`Updated project "${project.title}" successfully`);
    }
    
    console.log('All projects updated successfully!');
  } catch (error) {
    console.error('Error updating projects:', error);
  }
}

// Run the update function
updateProjects(); 
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-19',
  useCdn: false,
})

const projectsData = [
  {
    title: 'Moderne Leilighet på Frogner',
    slug: { _type: 'slug', current: 'moderne-leilighet-frogner' },
    description: [
      {
        _type: 'block',
        _key: 'description_block_1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'description_span_1',
            text: 'Totalrenovering av en 120m² leilighet i en historisk bygård på Frogner. Prosjektet omfattet oppgradering av alle overflater, med spesiell vekt på å bevare byggets historiske karakter samtidig som moderne elementer ble integrert.'
          }
        ]
      }
    ],
    imageUrls: {
      main: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000',
      gallery: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000',
        'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=2000',
        'https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=2000',
        'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=2000'
      ]
    },
    category: 'renovation',
    date: '2024-01-15',
    location: 'Frogner, Oslo',
    completedAt: '2024-03-01',
    featured: true,
    projectDetails: {
      area: 120,
      challenges: [
        {
          _type: 'block',
          _key: 'challenges_block_1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'challenges_span_1',
              text: 'Utfordringen lå i å bevare originale stukkaturdetaljer samtidig som moderne elementer skulle integreres. Vi måtte også håndtere ujevne vegger og skjeve vinkler typisk for eldre bygårder.'
            }
          ]
        }
      ],
      materials: [
        {
          _type: 'block',
          _key: 'materials_block_1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'materials_span_1',
              text: 'Premium miljøvennlig maling fra Jotun, spesialtilpassede farger for historiske bygg. Restaureringsmaterialer for stukkatur og originale listverk.'
            }
          ]
        }
      ],
      result: [
        {
          _type: 'block',
          _key: 'results_block_1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'results_span_1',
              text: 'En perfekt balanse mellom historisk sjarm og moderne komfort. Alle overflater ble oppgradert med respekt for byggets historie, samtidig som moderne fargevalg og materialer gir et tidløst preg.'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'Villa på Nordstrand',
    slug: { _type: 'slug', current: 'villa-nordstrand' },
    description: [
      {
        _type: 'block',
        _key: 'description_block_2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'description_span_2',
            text: 'Omfattende utvendig oppussing av en stor villa fra 1930-tallet. Prosjektet inkluderte fasademaling, vindusrestaurering og behandling av alle treoverflater.'
          }
        ]
      }
    ],
    imageUrls: {
      main: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000',
      gallery: [
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2000',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000',
        'https://images.unsplash.com/photo-1600607687920-4e03c0cdc337?q=80&w=2000',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000'
      ]
    },
    category: 'outdoor-painting',
    date: '2023-05-01',
    location: 'Nordstrand, Oslo',
    completedAt: '2023-08-15',
    featured: true,
    projectDetails: {
      area: 280,
      challenges: [
        {
          _type: 'block',
          _key: 'challenges_block_2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'challenges_span_2',
              text: 'Krevende værforhold og omfattende forarbeid på grunn av slitt treverk og tidligere malingslag som måtte fjernes.'
            }
          ]
        }
      ],
      materials: [
        {
          _type: 'block',
          _key: 'materials_block_2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'materials_span_2',
              text: 'Værbestandig utendørsmaling fra Jotun, spesialbehandling for treverk, restaureringsmaterialer for vinduer.'
            }
          ]
        }
      ],
      result: [
        {
          _type: 'block',
          _key: 'results_block_2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'results_span_2',
              text: 'Villaen fikk tilbake sin opprinnelige prakt med en moderne touch. Alle overflater er nå godt beskyttet mot vær og vind, samtidig som husets karakter er bevart.'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'Kontorlandskap i Bjørvika',
    slug: { _type: 'slug', current: 'kontorlandskap-bjorvika' },
    description: [
      {
        _type: 'block',
        _key: 'description_block_3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'description_span_3',
            text: 'Moderne oppussing av et 500m² kontorlandskap i Bjørvika. Fokus på funksjonelle og estetiske løsninger som fremmer et godt arbeidsmiljø.'
          }
        ]
      }
    ],
    imageUrls: {
      main: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000',
      gallery: [
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000'
      ]
    },
    category: 'indoor-painting',
    date: '2024-02-01',
    location: 'Bjørvika, Oslo',
    completedAt: '2024-02-28',
    featured: false,
    projectDetails: {
      area: 500,
      challenges: [
        {
          _type: 'block',
          _key: 'challenges_block_3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'challenges_span_3',
              text: 'Stram tidsfrist og behov for å minimere forstyrrelser for ansatte. Krevende logistikk med materialer i høyhus.'
            }
          ]
        }
      ],
      materials: [
        {
          _type: 'block',
          _key: 'materials_block_3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'materials_span_3',
              text: 'Miljøvennlig innendørsmaling med lav VOC, akustikkdempende materialer, spesialmaling for whiteboard-vegger.'
            }
          ]
        }
      ],
      result: [
        {
          _type: 'block',
          _key: 'results_block_3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'results_span_3',
              text: 'Et moderne og inspirerende arbeidsmiljø med gjennomtenkte fargevalg som fremmer både fokus og kreativitet. Prosjektet ble levert før tiden og innenfor budsjett.'
            }
          ]
        }
      ]
    }
  }
]

// Helper function to create an image asset from URL
async function createImageAsset(imageUrl) {
  try {
    const response = await fetch(imageUrl)
    const buffer = await response.buffer()
    
    const asset = await client.assets.upload('image', buffer, {
      filename: `image-${Date.now()}.jpg`
    })
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error('Error creating image asset:', error)
    return null
  }
}

async function createProjects() {
  try {
    for (const projectData of projectsData) {
      // Create image assets first
      console.log(`Creating image assets for ${projectData.title}...`)
      
      // Create main image asset
      const mainImage = await createImageAsset(projectData.imageUrls.main)
      
      // Create gallery image assets with _key properties
      const gallery = await Promise.all(
        projectData.imageUrls.gallery.map((url, index) => 
          createImageAsset(url).then(image => {
            if (image) {
              // Add a _key property to each gallery item
              return {
                ...image,
                _key: `gallery_image_${Date.now()}_${index}`
              }
            }
            return null
          })
        )
      )
      
      // Filter out any null values from failed uploads
      const validGalleryImages = gallery.filter(img => img !== null)
      
      // Create the project document with the image assets
      const { imageUrls, ...projectWithoutImages } = projectData
      const result = await client.create({
        _type: 'project',
        ...projectWithoutImages,
        mainImage,
        gallery: validGalleryImages
      })
      
      console.log(`Created project: ${result.title} (ID: ${result._id})`)
    }
    
    console.log('Successfully created all projects')
  } catch (error) {
    console.error('Error creating projects:', error)
  }
}

createProjects() 
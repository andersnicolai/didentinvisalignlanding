export const clinic = {
  name: 'clinic',
  title: 'Klinikk',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Klinikknavn',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Gate',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postnummer',
          type: 'string',
        },
        {
          name: 'city',
          title: 'Sted',
          type: 'string',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contactInfo',
      title: 'Kontaktinformasjon',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
        },
        {
          name: 'email',
          title: 'E-post',
          type: 'string',
        },
        {
          name: 'emergencyPhone',
          title: 'Nødtelefon',
          type: 'string',
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'openingHours',
      title: 'Åpningstider',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Dag',
              type: 'string',
              options: {
                list: [
                  { title: 'Mandag', value: 'monday' },
                  { title: 'Tirsdag', value: 'tuesday' },
                  { title: 'Onsdag', value: 'wednesday' },
                  { title: 'Torsdag', value: 'thursday' },
                  { title: 'Fredag', value: 'friday' },
                  { title: 'Lørdag', value: 'saturday' },
                  { title: 'Søndag', value: 'sunday' },
                ],
              },
            },
            {
              name: 'open',
              title: 'Åpner',
              type: 'string',
            },
            {
              name: 'close',
              title: 'Stenger',
              type: 'string',
            },
            {
              name: 'closed',
              title: 'Stengt',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Klinikkbilder',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt tekst',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Bildetekst',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'facilities',
      title: 'Fasiliteter',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'parkingInfo',
      title: 'Parkeringsinformasjon',
      type: 'text',
    },
    {
      name: 'publicTransport',
      title: 'Kollektivtransport',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Kartplassering',
      type: 'geopoint',
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
    },
    {
      name: 'socialMedia',
      title: 'Sosiale medier',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
      ],
    },
    {
      name: 'about',
      title: 'Om klinikken',
      type: 'text',
    },
    {
      name: 'virtualTour',
      title: 'Virtuell omvisning',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
    },
  },
}; 
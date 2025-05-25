export const dentist = {
  name: 'dentist',
  title: 'Tannleger',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
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
      name: 'position',
      title: 'Stilling',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Bilde',
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
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biografi',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortBio',
      title: 'Kort biografi',
      type: 'text',
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'education',
      title: 'Utdanning',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'degree',
              title: 'Grad',
              type: 'string',
            },
            {
              name: 'institution',
              title: 'Institusjon',
              type: 'string',
            },
            {
              name: 'year',
              title: 'År',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'specialties',
      title: 'Spesialiteter',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'certifications',
      title: 'Sertifiseringer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              type: 'string',
            },
            {
              name: 'issuer',
              title: 'Utsteder',
              type: 'string',
            },
            {
              name: 'year',
              title: 'År',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'languages',
      title: 'Språk',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'treatmentExpertise',
      title: 'Behandlingsekspertise',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'treatment' }],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Vis på forsiden',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Rekkefølge',
      type: 'number',
      description: 'Lavere tall vises først',
      initialValue: 10,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
}; 
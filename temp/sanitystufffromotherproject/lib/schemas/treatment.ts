export const treatment = {
  name: 'treatment',
  title: 'Behandlinger',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Behandlingsnavn',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Kort beskrivelse',
      type: 'text',
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
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
      name: 'benefits',
      title: 'Fordeler',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'treatmentSteps',
      title: 'Behandlingstrinn',
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
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
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
            },
          ],
        },
      ],
    },
    {
      name: 'priceRange',
      title: 'Prisområde',
      type: 'object',
      fields: [
        {
          name: 'from',
          title: 'Fra',
          type: 'number',
        },
        {
          name: 'to',
          title: 'Til',
          type: 'number',
        },
      ],
    },
    {
      name: 'duration',
      title: 'Varighet',
      type: 'object',
      fields: [
        {
          name: 'min',
          title: 'Minimum (minutter)',
          type: 'number',
        },
        {
          name: 'max',
          title: 'Maksimum (minutter)',
          type: 'number',
        },
      ],
    },
    {
      name: 'faq',
      title: 'Ofte stilte spørsmål',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Spørsmål',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Svar',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'beforeAfterGallery',
      title: 'Før og etter galleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'before',
              title: 'Før',
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
            },
            {
              name: 'after',
              title: 'Etter',
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
            },
            {
              name: 'description',
              title: 'Beskrivelse',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      description: 'Lucide ikonets navn (f.eks. "tooth", "smile", "shield")',
    },
    {
      name: 'relatedTreatments',
      title: 'Relaterte behandlinger',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'treatment' }],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta tittel',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta beskrivelse',
          type: 'text',
        },
        {
          name: 'keywords',
          title: 'Nøkkelord',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}; 
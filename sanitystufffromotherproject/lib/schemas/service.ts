export const service = {
  name: 'service',
  title: 'Tjenester',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
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
      name: 'gallery',
      title: 'Bildegalleri',
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
          ],
        },
      ],
    },
    {
      name: 'features',
      title: 'Egenskaper/Fordeler',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'icon',
      title: 'Ikon',
      type: 'string',
      description: 'Lucide ikonets navn (f.eks. "paint-bucket", "scissors", "hammer", "ruler")',
    },
    {
      name: 'relatedProjects',
      title: 'Relaterte prosjekter',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
  ],
}; 
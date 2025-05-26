export const patientReview = {
  name: 'patientReview',
  title: 'Pasientomtaler',
  type: 'document',
  fields: [
    {
      name: 'patientName',
      title: 'Pasientnavn',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'patientInitials',
      title: 'Initialer',
      type: 'string',
      description: 'For anonymisering hvis ønskelig (f.eks. "M.J.")',
    },
    {
      name: 'reviewText',
      title: 'Omtaletekst',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Vurdering',
      type: 'number',
      options: {
        list: [
          { title: '1 stjerne', value: 1 },
          { title: '2 stjerner', value: 2 },
          { title: '3 stjerner', value: 3 },
          { title: '4 stjerner', value: 4 },
          { title: '5 stjerner', value: 5 },
        ],
      },
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'patientImage',
      title: 'Pasientbilde',
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
      name: 'treatment',
      title: 'Behandling',
      type: 'reference',
      to: [{ type: 'treatment' }],
    },
    {
      name: 'dentist',
      title: 'Tannlege',
      type: 'reference',
      to: [{ type: 'dentist' }],
    },
    {
      name: 'date',
      title: 'Dato',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'videoReview',
      title: 'Video omtale',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'beforeAfterImages',
      title: 'Før og etter bilder',
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
      ],
    },
    {
      name: 'featured',
      title: 'Vis på forsiden',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'approved',
      title: 'Godkjent',
      type: 'boolean',
      initialValue: false,
      description: 'Må være godkjent for å vises på nettstedet',
    },
    {
      name: 'source',
      title: 'Kilde',
      type: 'string',
      options: {
        list: [
          { title: 'Google', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Direkte', value: 'direct' },
          { title: 'Annet', value: 'other' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'patientName',
      subtitle: 'rating',
      media: 'patientImage',
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: number; media: any }) {
      return {
        title,
        subtitle: `${subtitle} stjerner`,
        media,
      };
    },
  },
}; 
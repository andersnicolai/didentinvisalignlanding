export const blogPost = {
  name: 'blogPost',
  title: 'Blogginnlegg',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-navn',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Publisert dato',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Utdrag',
      type: 'text',
      description: 'En kort oppsummering av artikkelen (vises i oversikten)',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'categories',
      title: 'Kategorier',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Maling', value: 'maling' },
          { title: 'Tapetsering', value: 'tapetsering' },
          { title: 'Oppussing', value: 'oppussing' },
          { title: 'Tips og triks', value: 'tips' },
          { title: 'Trender', value: 'trender' },
          { title: 'Nyheter', value: 'nyheter' },
        ],
      },
    },
    {
      name: 'body',
      title: 'Innhold',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Overskrift 2', value: 'h2' },
            { title: 'Overskrift 3', value: 'h3' },
            { title: 'Overskrift 4', value: 'h4' },
            { title: 'Sitat', value: 'blockquote' },
          ],
          lists: [
            { title: 'Punktliste', value: 'bullet' },
            { title: 'Nummerert liste', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Fet', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
              { title: 'Understreket', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lenke',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Bildetekst',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativ tekst',
              description: 'Viktig for SEO og tilgjengelighet',
            },
          ],
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
          title: 'Meta-tittel',
          type: 'string',
          description: 'Tittel som vises i søkeresultater (maks 60 tegn)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta-beskrivelse',
          type: 'text',
          description: 'Beskrivelse som vises i søkeresultater (maks 160 tegn)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Nøkkelord',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Nøkkelord for søkemotorer',
        },
      ],
    },
    {
      name: 'featured',
      title: 'Fremhevet artikkel',
      type: 'boolean',
      description: 'Merk av for å vise denne artikkelen på forsiden',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString('no-NO') : 'Ikke publisert',
      };
    },
  },
}; 
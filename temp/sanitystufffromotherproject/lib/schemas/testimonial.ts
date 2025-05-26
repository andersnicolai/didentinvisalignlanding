export const testimonial = {
  name: 'testimonial',
  title: 'Kundeomtale',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Kundenavn',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'testimonialText',
      title: 'Omtaletekst',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Miniatyrbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Vis på forsiden',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'customerName',
      media: 'thumbnail',
    },
  },
}; 
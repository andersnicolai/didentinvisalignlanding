import { Rule } from '@sanity/types';

export const project = {
  name: 'project',
  title: 'Prosjekt',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL-navn',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Beskrivelse',
      type: 'blockContent',
      description: 'Prosjektbeskrivelse med formattering',
    },
    {
      name: 'mainImage',
      title: 'Hovedbilde',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
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
        },
      ],
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Innendørs maling', value: 'indoor-painting' },
          { title: 'Utendørs maling', value: 'outdoor-painting' },
          { title: 'Tapetsering', value: 'wallpapering' },
          { title: 'Oppussing', value: 'renovation' },
          { title: 'Spesialbehandling', value: 'special-treatment' },
          { title: 'Møbler', value: 'furniture' },
          { title: 'Spesialtilpasning', value: 'custom-build' },
          { title: 'Utendørs', value: 'outdoor' },
        ],
      },
    },
    {
      name: 'date',
      title: 'Prosjekt dato',
      type: 'date',
      description: 'Dato prosjektet ble påbegynt',
    },
    {
      name: 'location',
      title: 'Lokasjon',
      type: 'string',
      description: 'Hvor prosjektet ble utført',
    },
    {
      name: 'completedAt',
      title: 'Ferdigstilt dato',
      type: 'date',
    },
    {
      name: 'featured',
      title: 'Fremhevet prosjekt',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'projectDetails',
      title: 'Prosjektdetaljer',
      type: 'object',
      fields: [
        {
          name: 'area',
          title: 'Område (m²)',
          type: 'number',
          description: 'Størrelse på prosjektområdet i kvadratmeter',
        },
        {
          name: 'challenges',
          title: 'Utfordringer og løsninger',
          type: 'blockContent',
          description: 'Beskriv utfordringer som oppstod og hvordan de ble løst',
        },
        {
          name: 'materials',
          title: 'Materialer og metoder',
          type: 'blockContent',
          description: 'Liste over materialer og metoder brukt i prosjektet',
        },
        {
          name: 'result',
          title: 'Resultat',
          type: 'blockContent',
          description: 'Beskriv sluttresultatet av prosjektet',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
      date: 'completedAt',
    },
    prepare({ title, media, subtitle, date }: { 
      title: string; 
      media: any; 
      subtitle: string; 
      date: string | undefined; 
    }) {
      const categoryMap: Record<string, string> = {
        'indoor-painting': 'Innendørs maling',
        'outdoor-painting': 'Utendørs maling',
        'wallpapering': 'Tapetsering',
        'renovation': 'Oppussing',
        'special-treatment': 'Spesialbehandling',
        'furniture': 'Møbler',
        'custom-build': 'Spesialtilpasning',
        'outdoor': 'Utendørs',
      };
      
      const mappedCategory = categoryMap[subtitle] || subtitle;
      const displayDate = date ? new Date(date).toLocaleDateString('no-NO') : '';
      
      return {
        title,
        media,
        subtitle: `${mappedCategory}${displayDate ? ` • ${displayDate}` : ''}`,
      };
    },
  },
}; 



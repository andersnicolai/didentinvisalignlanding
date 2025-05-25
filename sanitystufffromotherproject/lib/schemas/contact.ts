export const contact = {
  name: 'contact',
  title: 'Kontakthenvendelser',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
    },
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'string',
    },
    {
      name: 'projectType',
      title: 'Prosjekttype',
      type: 'string',
      options: {
        list: [
          { title: 'Innendørs maling', value: 'interior' },
          { title: 'Utendørs maling', value: 'exterior' },
          { title: 'Oppussing', value: 'renovation' },
          { title: 'Annet', value: 'other' },
        ],
      },
    },
    {
      name: 'projectSize',
      title: 'Prosjektstørrelse',
      type: 'string',
      options: {
        list: [
          { title: 'Lite', value: 'small' },
          { title: 'Middels', value: 'medium' },
          { title: 'Stort', value: 'large' },
        ],
      },
    },
    {
      name: 'timeframe',
      title: 'Tidsramme',
      type: 'string',
      options: {
        list: [
          { title: 'Så snart som mulig', value: 'asap' },
          { title: 'Innen 1 måned', value: '1month' },
          { title: 'Innen 3 måneder', value: '3months' },
          { title: 'Fleksibel', value: 'flexible' },
        ],
      },
    },
    {
      name: 'message',
      title: 'Melding',
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Opprettet',
      type: 'datetime',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ny', value: 'new' },
          { title: 'Kontaktet', value: 'contacted' },
          { title: 'Tilbud sendt', value: 'quote_sent' },
          { title: 'Avsluttet', value: 'closed' },
        ],
      },
      initialValue: 'new',
    },
    {
      name: 'notes',
      title: 'Notater',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'projectType',
      description: 'createdAt',
    },
    prepare({ title, subtitle, description }) {
      const projectTypeMap: Record<string, string> = {
        interior: 'Innendørs maling',
        exterior: 'Utendørs maling',
        renovation: 'Oppussing',
        other: 'Annet',
      };
      
      const formattedDate = description 
        ? new Date(description).toLocaleDateString('no-NO')
        : '';
      
      return {
        title,
        subtitle: `${projectTypeMap[subtitle] || subtitle} - ${formattedDate}`,
      };
    },
  },
}; 
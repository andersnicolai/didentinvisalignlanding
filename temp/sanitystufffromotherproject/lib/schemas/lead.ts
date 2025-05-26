export const lead = {
  name: 'lead',
  title: 'Henvendelser',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Navn',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'E-post',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'message',
      title: 'Melding',
      type: 'text',
    },
    {
      name: 'requestedService',
      title: 'Ønsket behandling',
      type: 'reference',
      to: [{ type: 'treatment' }],
    },
    {
      name: 'preferredDentist',
      title: 'Foretrukket tannlege',
      type: 'reference',
      to: [{ type: 'dentist' }],
    },
    {
      name: 'preferredDate',
      title: 'Foretrukket dato',
      type: 'date',
    },
    {
      name: 'preferredTime',
      title: 'Foretrukket tidspunkt',
      type: 'string',
      options: {
        list: [
          { title: 'Morgen (08:00-11:00)', value: 'morning' },
          { title: 'Lunsj (11:00-14:00)', value: 'lunch' },
          { title: 'Ettermiddag (14:00-17:00)', value: 'afternoon' },
          { title: 'Kveld (17:00-20:00)', value: 'evening' },
        ],
      },
    },
    {
      name: 'isEmergency',
      title: 'Akutt behov',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ny', value: 'new' },
          { title: 'Kontaktet', value: 'contacted' },
          { title: 'Time booket', value: 'appointment_booked' },
          { title: 'Møtt opp', value: 'showed_up' },
          { title: 'Ikke møtt', value: 'no_show' },
          { title: 'Avbrutt', value: 'cancelled' },
          { title: 'Fullført', value: 'completed' },
        ],
      },
      initialValue: 'new',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'appointmentDate',
      title: 'Avtaledato',
      type: 'datetime',
    },
    {
      name: 'source',
      title: 'Kilde',
      type: 'string',
      options: {
        list: [
          { title: 'Nettsted', value: 'website' },
          { title: 'Telefonhenvendelse', value: 'phone' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'E-post', value: 'email' },
          { title: 'Sosiale medier', value: 'social_media' },
          { title: 'Google', value: 'google' },
          { title: 'Eksisterende pasient', value: 'existing_patient' },
          { title: 'Anbefaling', value: 'referral' },
          { title: 'Annet', value: 'other' },
        ],
      },
    },
    {
      name: 'utmSource',
      title: 'UTM Source',
      type: 'string',
    },
    {
      name: 'utmMedium',
      title: 'UTM Medium',
      type: 'string',
    },
    {
      name: 'utmCampaign',
      title: 'UTM Campaign',
      type: 'string',
    },
    {
      name: 'firstVisitPage',
      title: 'Første besøkte side',
      type: 'string',
    },
    {
      name: 'conversionPage',
      title: 'Konverteringsside',
      type: 'string',
    },
    {
      name: 'notes',
      title: 'Notater',
      type: 'text',
    },
    {
      name: 'assignedTo',
      title: 'Tildelt til',
      type: 'reference',
      to: [{ type: 'dentist' }],
    },
    {
      name: 'estimatedValue',
      title: 'Estimert verdi (NOK)',
      type: 'number',
    },
    {
      name: 'actualValue',
      title: 'Faktisk verdi (NOK)',
      type: 'number',
    },
    {
      name: 'sentDateTime',
      title: 'Sendt til Dident',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
      description: 'requestedService.title',
      date: 'createdAt',
    },
    prepare({ title, subtitle, description, date }: { title: string; subtitle: string; description: string; date: string }) {
      return {
        title,
        subtitle: `${subtitle} - ${description || 'Ingen spesifikk behandling'} - ${date ? new Date(date).toLocaleDateString() : 'Dato ikke satt'}`,
      };
    },
  },
}; 
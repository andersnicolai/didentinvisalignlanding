/**
 * This configuration is used for the Sanity Studio
 */
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './lib/schemas'

export default defineConfig({
  name: 'default',
  title: 'Dident Tannklinikk',
  
  projectId: 'your-project-id',
  dataset: 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  document: {
    // Group documents in the desk structure
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return [
          ...prev.filter(
            (templateItem) => 
              templateItem.templateId !== 'project' && 
              templateItem.templateId !== 'service' && 
              templateItem.templateId !== 'testimonial'
          ),
          {
            templateId: 'treatment',
            title: 'Behandling',
          },
          {
            templateId: 'dentist',
            title: 'Tannlege',
          },
          {
            templateId: 'patientReview',
            title: 'Pasientomtale',
          },
          {
            templateId: 'lead',
            title: 'Henvendelse',
          },
          {
            templateId: 'clinic',
            title: 'Klinikkinformasjon',
          },
          {
            templateId: 'blogPost',
            title: 'Blogginnlegg',
          },
        ];
      }
      return prev;
    },
  },
}) 
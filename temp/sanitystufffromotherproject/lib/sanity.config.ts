import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemas';

export const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4r3op9nw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'XK Malerfirma',
  apiVersion: '2023-05-03',
  basePath: '/admin',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Gjør at nye dokumenter får norsk språk som standard
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'project');
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'project') {
        return prev.filter(({ action }) => !['unpublish', 'delete'].includes(action));
      }
      return prev;
    },
  },
  form: {
    components: {
      input: (props) => {
        if (props.id === 'slug' && props.schemaType.name === 'slug') {
          return props.renderDefault({
            ...props,
            title: 'URL-navn (genereres automatisk)',
          });
        }
        return props.renderDefault(props);
      },
    },
  },
}); 
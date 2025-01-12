import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(), // Add Vue plugin
  ],
  resolve: {
    alias: {
      // Simplifies imports for files in the 'src' directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.ts', '.vue', '.css'], // File extensions to resolve
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'], // Explicitly include image formats to handle them as static assets
  server: {
    port: 3000, // Default dev server port
    open: true, // Opens the browser automatically on server start
  },
});

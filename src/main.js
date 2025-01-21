// main.js
import { createApp } from 'vue';
import DentalApp from './DentalApp.vue'; // Import the DentalApp component as the root component
import router from './router'; // Ensure the router is properly imported
import './style.css';
import './index.css';
import FacebookPixel from './plugins/facebook-pixel';

// Create a Vue application with DentalApp as the root component
const app = createApp(DentalApp);
app.use(FacebookPixel);
app.use(router);

// Spor sidevisninger når ruten endres
router.afterEach((to, from) => {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
});

app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './index.css';
import router from './router'; // Ensure the correct path to your router/index.js file


const app = createApp(App)
app.use(router)
app.mount('#app');
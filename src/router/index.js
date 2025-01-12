import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('@/App.vue') // Ensure the path is correct for App.vue    , // Directly use the imported App component
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import('@/components/PrivacyPolicy.vue'), 
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

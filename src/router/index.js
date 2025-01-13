import { createRouter, createWebHistory } from 'vue-router';

const routes = [
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

// Example router setup with a hypothetical `/home` route
import { createRouter, createWebHistory } from 'vue-router';
import LayoutComponent from '@/components/MainLayout.vue';
import InvisalignComponent from '@/components/InvisalignComponent.vue';
import DentalBooking from '@/components/DentalBooking.vue';
import BookingLayoutComponent from "@/components/BookingLayoutComponent.vue";

const routes = [
  {
    path: '/',
    component: LayoutComponent,
    children: [
      { path: '', name: 'home', component: InvisalignComponent },
      { path: 'home', component: InvisalignComponent },
    ],
  },
  {
    path: '/booking',
    component: BookingLayoutComponent, // a different layout for /booking
    children: [
      { path: '', name: 'booking', component: DentalBooking },
    ],
  },
  {
    path: '/privacy-policy',
    component: LayoutComponent,
    children: [
      { path: '', name: 'privacy-policy', component: () => import('@/components/PrivacyPolicy.vue') },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

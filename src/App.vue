
<template>
  <!-- Main Wrapper -->
  <div class="w-full h-screen">
    <!-- Video Section -->
    <div class="relative">
      <VideoSection />
    </div>

    <!-- Notification and Menu -->
    <div class="absolute inset-0 z-10">
      <div class="mt-safe">
        <NotificationPane
          :message="notificationMessage"
          :buttonText="notificationButtonText"
        />
      </div>
      <div>
        <AppHeader
          :logoVideo="logoVideo"
          :logoImage="logoImage"
        />
      </div>
    </div>

    <!-- Scrollable Sections -->
    <div id="how-it-works" class="scroll-section">
      <HeroSectionClient />
    </div>
    <div id="about-us" class="scroll-section">
      <Bonus />
    </div>
    <div id="pricing" class="scroll-section">
      <PricingSection />
    </div>
    <div id="faq" class="scroll-section">
      <FaqComponent />
    </div>
    <div id="clinic-showcase" class="scroll-section">
      <ClinicShowcase />
    </div>
    <div id="footer" class="scroll-section">
      <FooterComponent />
    </div>

    <!-- Router View -->
    <router-view />
    
    <!-- Cookie Consent -->
    <CookieConsent />
    <div id="cookie-declaration"></div>
  </div>
</template>


<script setup>
import { computed, onMounted, onUnmounted } from 'vue'; // Import onMounted and onUnmounted
import { useRoute } from 'vue-router';

const route = useRoute();
const isHomePage = computed(() => route.path === '/'); // Determine if the current route is the homepage

import NotificationPane from "@/components/NotificationPane.vue";
import AppHeader from "@/components/AppHeader.vue";
import VideoSection from "@/components/VideoSection.vue";
import HeroSectionClient from "./components/HeroSectionClient/HeroSectionClient.vue";
import SecondVideoTeaser from "./components/SecondVideoTeaser.vue";
import Bonus from "./components/Bonus.vue";
import StarReviews from "@/components/StarReviews.vue";
import PricingSection from "@/components/PricingSection.vue";
import CookieConsent from "./components/CookieConsent.vue";
import FaqComponent from "./components/FaqComponent.vue";
import ClinicShowcase from "./components/ClinicShowcase.vue";
import FooterComponent from './components/FooterComponent.vue';

import logoVideo from "@/assets/videos/logo.mp4";

const logoImage = "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
const notificationMessage = "Get your free consultation now!";
const notificationButtonText = "Close";

// Intersection Observer for Scroll Animations
function setupScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-active');
        } else {
          entry.target.classList.remove('animate-active');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.scroll-section').forEach(el => {
    observer.observe(el);
  });
}

onMounted(setupScrollAnimation);
onUnmounted(() => {
  observer.disconnect();
});
</script>

<style scoped>
.scroll-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.animate-active {
  opacity: 1;
  transform: none;
}
</style>

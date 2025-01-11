<template>
  <!-- First Section (Video Section) -->
<div class="w-full h-screen">
    <div class="relative">
      <VideoSection />
    </div>

    <!-- Notification and Menu (Overlays the video) -->
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
  </div>

  <!-- Second Section -->
  <div class="scroll-section">
    <HeroSectionClient />
  </div>

  <div class="scroll-section">
    <Bonus />
  </div>

  <div class="scroll-section">
    <SecondVideoTeaser />
  </div>

  <div class="scroll-section">
    <StarReviews />
  </div>

  <div class="scroll-section">
    <PricingSection />
    <FaqComponent />
  </div>



  <div class="scroll-section">
    <ClinicShowcase />
  </div>


  <div class="scroll-section">

    <FooterComponent />
  </div>
  <CookieConsent />

  <!-- Cookie Declaration Script -->
  <div id="cookie-declaration"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
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
import logoVideo from "@/assets/videos/logo.mp4";
import FooterComponent from './components/FooterComponent.vue';

const logoImage = "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
const notificationMessage = "Get your free consultation now!";
const notificationButtonText = "Close";

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

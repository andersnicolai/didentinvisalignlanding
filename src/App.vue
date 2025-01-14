<template>
  <!-- Main Wrapper -->
  <div class="w-full h-screen">
    <!-- Video Section -->
    <div class="relative">
      <VideoSection />
    </div>

    <!-- Notification and Menu -->
    <div class="absolute inset-0 z-10">
      <div class="mt-safe sticky-wrapper">
        <!-- Make NotificationPane sticky -->
        <div class="sticky-notification">
          <NotificationPane
            :message="notificationMessage"
            :buttonText="notificationButtonText"
          />
        </div>
      </div>
      <div>
        <AppHeader
          :logoVideo="logoVideo"
          :logoImage="logoImage"
          :formModal="formModal"
        />
      </div>
    </div>

    <!-- Scrollable Sections -->
    <div id="how-it-works" class="scroll-section">
      <HeroSectionClient />
    </div>
    <Advertiser />



    <div id="quiz" class="scroll-section">
      <Quiz />
    </div>
    <div id="pricing" class="scroll-section">
      <PricingSection />
    </div>
 
      <div id="about-us" class="scroll-section">
    <Bonus />
  </div>
  
    <div id="blogger" class="scroll-section">
      <Blogger />
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

    <!-- ChatBot Component -->


    <!-- HighLevelFormModal -->
    <HighLevelFormModal ref="formModal" />

    <div id="cookie-declaration"></div>
  </div>
</template>



<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const isHomePage = computed(() => route.path === '/'); // Determine if the current route is the homepage
import { ref, computed, onMounted, onUnmounted } from "vue";

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
import Blogger from './components/Blogger.vue';
import HighLevelFormModal from "@/components/FormModal.vue";
import Quiz from './components/Quiz.vue';
import logoVideo from "@/assets/videos/logo.mp4";
import Advertiser from './components/Advertiser.vue';
import GPTbot from '@/components/GPTbot.vue';
const logoImage = "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
const notificationMessage = "Get your free consultation now!";
const notificationButtonText = "Close";


const formModal = ref(null); // Reference for the modal

// Fire Meta Pixel PageView event when component is mounted
onMounted(() => {
  // Trigger PageView event for Facebook Pixel
  if (window.fbq) {
    fbq('track', 'PageView');
  } else {
    console.error("Facebook Pixel (fbq) not loaded correctly");
  }

  // Set up scroll animation observer
  setupScrollAnimation();
});

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

/* Make the NotificationPane sticky */
.sticky-wrapper {
  position: relative;
}

.sticky-notification {
  position: sticky;
  top: 0; /* Adjust the top value to your preference */
  z-index: 20; /* Ensure it's above other content */
  background-color: white; /* Optional: Add background to avoid overlapping */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for visibility */
}

.chatbot-fixed {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999; /* Sørg for at den ligger over annet innhold */
}

</style>

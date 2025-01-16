<template>
  <div>

    <div id="how-it-works">
      <HeroSectionClient />
    </div>

    <div class="map-section">
      <iframe
          loading="lazy"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBPjyiJOIpziomjiQqiOqtB9_XKwT_YfZM&q=dident%20tannlegesenter&zoom=15"
          title="dident tannlegesenter"
          aria-label="dident tannlegesenter"
          frameborder="0"
          style="border:0; width: 100%; height: 400px;"
          allowfullscreen
      ></iframe>
    </div>
    
    <div id="about-us">
      <Bonus />
    </div>
    <Advertiser />
    <div id="pricing">
      <PricingSection />
    </div>




    <div id="quiz">
      <Quiz />
    </div>

    <div id="clinic-showcase">
      <ClinicShowcase />
    </div>
  </div>
</template>

<script setup>
import HeroSectionClient from '@/components/HeroSectionClient/HeroSectionClient.vue';
import Advertiser from '@/components/Advertiser.vue';
import Quiz from '@/components/Quiz.vue';
import PricingSection from '@/components/PricingSection.vue';
import Bonus from '@/components/Bonus.vue';
import Blogger from '@/components/Blogger.vue';
import ClinicShowcase from '@/components/ClinicShowcase.vue';
</script>

<style scoped>
/* Removed the scroll-section styles */
</style>

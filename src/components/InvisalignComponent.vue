<template>
  <div>
    <div id="how-it-works">
      <HeroSectionClient />
    </div>
    <Advertiser />
    <div id="quiz">
      <Quiz />
    </div>
    <div id="pricing">
      <PricingSection />
    </div>
    <div id="about-us">
      <Bonus />
    </div>
    <div id="blogger">
      <Blogger />
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

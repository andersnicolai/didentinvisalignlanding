<template>
  <div>
    <div id="how-it-works">
      <HeroSectionClient />
    </div>


    <div id="reviews">
      <StarReviews />
    </div>

    <div id="reputation-widget">
      <ReputationHubWidget />
    </div>


  </div>
</template>

<script setup>
import HeroSectionClient from '@/components/Booking/HeroSectionClient/HeroSectionClient.vue';
import Advertiser from '@/components/Advertiser.vue';
import Quiz from '@/components/Quiz.vue';
import PricingSection from '@/components/PricingSection.vue';
import Bonus from '@/components/Bonus.vue';
import Blogger from '@/components/Blogger.vue';
import TestShowCase from "@/components/Booking/TestShowCase.vue";
import ClinicShowcase from '@/components/ClinicShowcase.vue';
import StarReviews from "@/components/StarReviews.vue";
import OfferSection from "@/components/Booking/OfferSection.vue";
import ReputationHubWidget from "@/components/Booking/ReputationHubWidget.vue";
</script>

<style scoped>
/* Removed the scroll-section styles */
</style>

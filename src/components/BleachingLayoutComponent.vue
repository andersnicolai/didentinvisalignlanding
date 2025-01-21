<template>
  <div>
    <!-- Logo Section -->
    <div class="bg-white py-4 md:py-6">
      <div class="max-w-7xl mx-auto flex flex-col items-center px-4">
        <img
          src="@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg"
          alt="Dident Logo"
          class="h-16 md:h-24 object-contain"
        />
        <p class="text-gray-600 font-semibold mt-2">Tannlegesenter på Bjølsen, Oslo</p>
      </div>
    </div>

    <!-- Timer Banner -->
    <div class="bg-green-600 py-6 md:py-8">
      <div class="max-w-4xl mx-auto text-center px-4">
        <p class="font-bold text-3xl md:text-5xl text-white leading-tight">
          TIDSBEGRENSET TILBUD PÅ BJØLSEN
        </p>
        <p class="text-xl md:text-3xl text-white mt-2 font-semibold">
          KUN FOR NYE PASIENTER!
        </p>
    
      </div>
    </div>

    <!-- Hero Image -->
    <div class="relative h-[400px] md:h-[800px]">
      <img
        src="@/assets/images/Landingsside-4.png"
        alt="Tannbleking behandling hos Dident Tannlegesenter på Bjølsen"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
    </div>

    <!-- Main Content -->
    <router-view />

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from './FooterComponent.vue';

// Deaktiver chat widget for denne siden
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    const chatWidget = document.querySelector('div[data-widget-id="67829c21c89c1d3cdb8ffb1f"]');
    if (chatWidget) {
      chatWidget.style.display = 'none';
    }
  });
}
</script>

<style scoped>
/* Forbedre tekst-lesbarhet på mobil */
@media (max-width: 768px) {
  .text-3xl {
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
}
</style> 
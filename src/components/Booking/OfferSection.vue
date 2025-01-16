<template>
  <div class="p-8 lg:p-16">
    <div class="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
      <!-- Left Section -->
      <div
        class="bg-white opacity-100 w-full h-full p-8"
        v-motion
        :initial="{ opacity: 0, x: -50 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 0.8 } }"
      >
        <h3 class="text-sm text-blue-500 font-semibold uppercase mb-6 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          Tilbud
        </h3>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
          SPAR 770 KR: Komplett tannlegeundersøkelse
        </h1>
        <p class="text-gray-700 leading-relaxed mb-6 text-lg">
          Komplett undersøkelse med rens, fjerning av tannstein, og 2 røntgenbilder til kun kr 590,- (total Verdi kr 1360,-).
        </p>
        <button
          @click="handleClick"
          class="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition text-lg shadow-md"
        >
          BESTILL TIME OG SPAR 57% NÅ
        </button>
      </div>

      <!-- Right Section -->
      <div
        class="bg-gray-100 w-full h-full space-y-8 p-8"
        v-motion
        :initial="{ opacity: 0, x: 50 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }"
      >
        <div
          v-for="(item, index) in included"
          :key="index"
          class="bg-white shadow-lg rounded-xl p-8"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 * index } }"
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ item.title }}</h2>
          <p class="text-gray-600 text-lg">{{ item.description }}</p>
        </div>
        <img
          :src="manimage"
          alt="Patient and dentist"
          class="mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import manimage from "@/assets/images/Landingsside-4.png";

const handleClick = () => {
  alert("Booking modal triggered!"); // Replace with modal logic
};

const included = [
  {
    title: "Undersøkelse",
    description: "Komplett tannsjekk inkludert røntgen, diagnostikk, fjerning av tannstein og rens.",
  },
  {
    title: "Røntgen",
    description: "Vi tar røntgenbilder av tennene dine for å få full oversikt over din tannhelse.",
  },
  {
    title: "Rens",
    description: "Enkel rens og fjerning av tannstein slik at munnen føles både frisk og ren.",
  },
];
</script>

<style scoped>
/* Add spacing and consistent design */
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>

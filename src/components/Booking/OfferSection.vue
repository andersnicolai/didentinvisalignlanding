<template>
  <div class="offer-section py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-2xl font-bold text-blue-500 mb-4">
        SPAR 770 KR: Komplett tannlegeundersøkelse med rens, fjerning av tannstein og 2 røntgenbilder til kun kr 590,- (total Verdi kr 1360,-)
      </h2>
      <p class="text-gray-700 mb-6">Tilbudet gjelder kun nye pasienter.</p>
      <button class="px-6 py-3 bg-blue-500 text-white rounded-lg mb-12">
        BESTILL TIME OG SPAR 57% NÅ
      </button>

      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Inkludert i undersøkelsen:</h3>
        <ul class="list-disc list-inside text-gray-700 mb-8">
          <li>Undersøkelse: Komplett tannsjekk inkludert røntgen, diagnostikk, fjerning av tannstein og rens.</li>
          <li>Røntgen: Vi tar røntgenbilder av tennene dine for å få full oversikt over din tannhelse. Sammen går vi gjennom eventuelle funn.</li>
          <li>Rens: Vi gir tennene dine en enkel rens og fjerning av tannstein, slik at munnen din vil føles både frisk og ren etter undersøkelsen.</li>
        </ul>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img :src="manimage" alt="Patient and dentist" class="rounded-lg shadow-lg w-full md:w-3/4">
      </div>

      <div class="mt-12">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Velkommen til oss!</h3>
        <p class="text-gray-700 mb-6">
          Vi ønsker deg velkommen til en behagelig tannundersøkelse i flotte og moderne lokaler. Vi har lang erfaring, moderne utstyr og er dyktige på tannlegeskrekk.
        </p>
        <p class="text-gray-700">BESTILL TIME OG SPAR KR 770,- NÅ</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import manimage from "@/assets/images/Landingsside-4.png";
import dentalEquipment from "@/assets/images/Landingsside-4.png";

// No additional logic required for this static content, unless you need dynamic props in the future
</script>

<style scoped>
/* Style the section as needed, you can add padding, text colors, and margin adjustments */
.offer-section {
  background-color: #f9f9f9;
}
.grid img {
  width: 100%; /* Adjust the image width as per design requirements */
  height: auto; /* Maintain aspect ratio */
}
</style>

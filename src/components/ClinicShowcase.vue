<template>
  <div class="relative bg-white text-gray-800 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Images Section -->
      <div class="space-y-4">
        <img :src="clinicImage" alt="Moderne Tannklinikk" class="rounded-lg shadow-lg">
        <div class="md:hidden">
          <img :src="equipmentImage" alt="Tannlege i arbeid" class="rounded-lg shadow-lg">
        </div>
      </div>

      <!-- Text Section -->
      <div>
        <a href="#" class="text-blue-600 text-sm uppercase tracking-wider font-semibold">Om oss</a>
        <h1 class="text-5xl font-extrabold mt-3 leading-tight">
          Velkommen til DiDent Tannlegesenter
        </h1>
        <p class="text-gray-600 mt-4 text-lg leading-relaxed">
          DiDent Tannlegesenter er en toppmoderne tannklinikk med nyeste teknologi og etterspurte tannleger, sentralt plassert i Oslo.
        </p>
        <p class="text-gray-600 mt-3 text-lg leading-relaxed">
          Vi tilbyr smertefri tannbehandling, kvalitet og omsorg, kombinert med et kostnadsoverslag som hjelper deg med å planlegge behandlingene dine.
        </p>
        <ul class="mt-6 space-y-2 text-gray-600 text-lg">
          <li class="flex items-center">
            <span class="text-blue-600 text-xl mr-3">&rarr;</span> 12 behandlere + 5 deltid
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 text-xl mr-3">&rarr;</span> 8 behandlingsrom
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 text-xl mr-3">&rarr;</span> Oral kirurg
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 text-xl mr-3">&rarr;</span> Tannteknisk lab inhouse
          </li>
        </ul>

        <BookingButton
          class="relative z-30 mt-6"
          label="Book gratis konsultasjon"
          @click="handleClick"
        />

        <!-- Second image for larger screens -->
        <div class="hidden md:block mt-8">
          <img :src="equipmentImage" alt="Tannlege i arbeid" class="rounded-lg shadow-lg">
        </div>
      </div>
    </div>
    <HighLevelFormModal ref="formModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Image assets
import clinicImage from "@/assets/images/klinikken.jpg";
import equipmentImage from "@/assets/images/tannlegeutstyr.jpg";
import BookingButton from "./BookingButton.vue";
const formModal = ref(null);
import HighLevelFormModal from "@/components/FormModal.vue";

const handleClick = () => {
  console.log("Button clicked!");
  formModal.value.open();
};

// Example text message
const message = ref("Transform Your Smile with Invisalign – Book a Free Consultation Now!");
</script>

<style scoped>
/* Custom styles for hover effects and responsive design */
a {
  color: #1e40af; /* Ensure link color contrasts well on a white background */
}
a:hover {
  color: #2563eb; /* Brighter blue on hover */
}
</style>

<template>
  <div class="p-8 lg:p-16">
    <!-- Hero Section -->
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
          {{ sectionTitle }}
        </h3>
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight"
        >
          {{ headline }}
        </h1>

        <p class="text-gray-700 leading-relaxed mb-12 text-lg">
          {{ description }}
        </p>
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="mx-auto md:mx-0 rounded-lg shadow-lg"
        />
      </div>

      <!-- Right Section -->
      <div
        class="bg-gray-100 sm:bg-transparent w-full h-full space-y-8 p-8"
        v-motion
        :initial="{ opacity: 0, x: 50 }"
        :enter="{ opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }"
      >
        <div
          v-for="(item, index) in benefits"
          :key="index"
          class="bg-white shadow-lg rounded-xl p-8"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.3 * index } }"
        >
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ item.title }}</h2>
          <p class="text-gray-600 text-lg">{{ item.description }}</p>
        </div>

        <button
          @click="handleClick"
          class="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition text-lg shadow-md"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } }"
        >
          {{ buttonText }}
        </button>
      </div>

      
    </div>

    <HighLevelFormModal ref="formModal" />
  </div>
</template>

<script setup>
import { reactive, toRefs, ref } from "vue";
import textData from "./content.json";
import HighLevelFormModal from "@/components/FormModal.vue";

const formModal = ref(null);

const handleClick = () => {
  if (formModal.value) {
    formModal.value.open(); // This will now correctly call the open method
  }
};

import imageSrc from "@/assets/images/Invisalign-aligners2.png";

const {
  sectionTitle,
  headline,
  description,
  imageAlt,
  buttonText,
  benefits,
} = reactive(textData);
</script>

<style scoped>
/* Add keyframes for CSS animations as fallback */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-animate {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

.card-delay {
  animation-delay: calc(var(--index) * 0.3s);
}
</style>

<template>
  <header
      id="shrinkable-header"
      class="fixed top-[50px] left-0 w-full bg-white/30 backdrop-blur-md z-40 shadow-lg"
  >
    <nav class="flex flex-wrap items-center justify-between px-4 sm:px-8 py-2 max-w-6xl mx-auto rounded-2xl">
      <!-- Logo Section -->
      <div id="logo-container" class="flex items-center">
        <video
            id="logo"
            class="w-32 sm:w-48 h-16 sm:h-16 rounded-full object-cover"
            autoplay
            loop
            muted
        >
          <source :src="logoVideo" type="video/mp4" />
          <img
              :src="logoImage"
              alt="Logo"
              class="w-32 sm:w-48 h-16 sm:h-16 rounded-full"
          />
        </video>
      </div>

      <!-- Desktop Navigation Links -->
      <ul
          id="menu-links"
          class="hidden sm:flex flex-row gap-4 sm:gap-8 text-gray-700 font-semibold items-center"
      >
        <li>
          <a href="#" class="text-black hover:text-green-600 transition duration-300">
            Hvordan det fungerer
          </a>
        </li>
        <li>
          <a href="#" class="text-black hover:text-green-600 transition duration-300">
            Om oss
          </a>
        </li>
        <li>
          <a href="#" class="text-black hover:text-green-600 transition duration-300">
            Priser
          </a>
        </li>
        <li>
          <a href="#" class="text-black hover:text-green-600 transition duration-300">
            Spørsmål og svar
          </a>
        </li>
      </ul>

      <!-- Call-to-Action Button (Visible on Desktop) -->
      <button
          id="cta-button"
          @click="handleClick"
          class="hidden sm:block bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Book gratis konsultasjon
      </button>

      <!-- Hamburger Menu Toggle (Visible on Mobile) -->
      <button
          @click="toggleMenu"
          class="sm:hidden text-black focus:outline-none"
          id="menu-toggle"
      >
        <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </nav>

    <!-- Fullscreen Sliding Menu (Mobile) -->
    <div
        :class="{ 'translate-x-0': isMenuOpen, 'translate-x-full': !isMenuOpen }"
        class="fixed inset-0 min-h-screen bg-dark-blue transition-transform duration-300 ease-in-out"
        style="z-index: 9999;"
    >
      <!-- Close Button -->
      <button
          @click="toggleMenu"
          class="absolute top-8 right-8 text-white"
      >
        <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <!-- Mobile Menu Links -->
      <div class="h-screen flex flex-col items-center justify-center">
        <ul class="flex flex-col items-center justify-center space-y-8 text-white font-semibold text-xl">
          <li>
            <a
                href="#"
                class="text-white hover:text-green-600 transition duration-300"
            >
              Hvordan det fungerer
            </a>
          </li>
          <li>
            <a
                href="#"
                class="text-white hover:text-green-600 transition duration-300"
            >
              Om oss
            </a>
          </li>
          <li>
            <a
                href="#"
                class="text-white hover:text-green-600 transition duration-300"
            >
              Priser
            </a>
          </li>
          <li>
            <a
                href="#"
                class="text-white hover:text-green-600 transition duration-300"
            >
              Spørsmål og svar
            </a>
          </li>
        </ul>

        <!-- Mobile CTA Button -->
        <div class="mt-12">
          <button class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full">
            Book gratis konsultasjon
          </button>
        </div>

        <!-- Additional Details -->
        <div class="mt-8 text-white text-center space-y-4">
          <p class="text-lg">Besøk oss</p>
          <p>Stavangergata 44b</p>
          <p>0467 Oslo</p>
          <p>
            Telefon:
            <a href="tel:+4794095643" class="hover:text-green-500">940 95 643</a>
          </p>
          <p>info@dident.no</p>
        </div>
      </div>
    </div>
  </header>

  <!-- Modal -->
  <HighLevelFormModal ref="formModal" />
</template>

<script setup>
// Import assets directly
import logoVideo from "@/assets/videos/logo.mp4";
import logoImage from "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
import HighLevelFormModal from "@/components/FormModal.vue"; // Import the form modal component

// State to manage menu visibility
import { ref } from "vue";
const isMenuOpen = ref(false);

// Handle button click to open the form modal
const formModal = ref(null);
const handleClick = () => {
  console.log("Button clicked!");
  formModal.value.open(); // Open the modal
};

// Toggle menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};
</script>

<style scoped>
/* Fullscreen Sliding Menu */
.translate-x-full {
  transform: translateX(100%);
}
.translate-x-0 {
  transform: translateX(0);
}

/* Dark blue background */
.bg-dark-blue {
  background-color: #001f3f; /* Replace with your preferred dark blue color */
}
</style>

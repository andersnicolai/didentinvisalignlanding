<template>
    <div class="relative bg-pink-800 text-white p-6">
      <div class="story-carousel-wrapper relative">
        <!-- Carousel -->
        <div
          class="story-carousel"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
            class="story-slide"
            v-for="(slide, index) in slides"
            :key="index"
          >
            <!-- Image Section -->
            <img
              :src="slide.image"
              :alt="slide.title"
              class="rounded-lg shadow-lg w-full mb-4"
            />
  
            <!-- Text Section -->
            <div class="text-center px-4">
              <h2 class="text-2xl font-bold">{{ slide.title }}</h2>
              <p class="text-gray-200 mt-2 text-lg leading-relaxed">
                {{ slide.description }}
              </p>
              <p class="text-gray-300 mt-4 text-base leading-relaxed">
                Andre kjendiser som har brukt Invisalign inkluderer skuespilleren
                Zac Efron, realitystjernen Khloé Kardashian og supermodellen
                Gisele Bündchen. Invisalign har vært et populært valg blant
                kjendiser på grunn av sin nesten usynlige design og effektive
                resultater.
              </p>
              <button
                v-if="slide.cta"
                @click="openSidebar(slide)"
                class="mt-4 bg-white text-pink-800 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-pink-200"
              >
                {{ slide.cta }}
              </button>
              <p class="text-gray-400 text-sm mt-4">
                Innholdet er hentet fra <a href="https://blogg.no" target="_blank" class="text-blue-300 underline">blogg.no</a>.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Navigation Buttons for Desktop -->
        <button
          v-if="isDesktop"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-pink-800 p-4 rounded-full shadow-lg hover:bg-pink-200"
          @click="prevSlide"
        >
          ‹
        </button>
        <button
          v-if="isDesktop"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-pink-800 p-4 rounded-full shadow-lg hover:bg-pink-200"
          @click="nextSlide"
        >
          ›
        </button>
  
        <!-- Dots Navigation -->
        <div class="dots-container flex justify-center mt-4">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            :class="['dot', { active: currentSlide === index }]"
            @click="goToSlide(index)"
          ></div>
        </div>
      </div>
  
      <!-- Sidebar -->
      <div
        v-if="isSidebarOpen"
        class="fixed top-0 right-0 h-full w-full lg:w-2/3 bg-white shadow-lg z-50 overflow-y-auto"
      >
        <button
          class="absolute top-4 left-4 text-pink-800 font-bold text-lg"
          @click="closeSidebar"
        >
          ✖
        </button>
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-4">{{ activeSlide.title }}</h2>
          <p>{{ activeSlide.description }}</p>
          <p class="mt-4">
            Les mer på
            <a
              :href="activeSlide.link"
              target="_blank"
              class="text-blue-500 underline"
            >
              blogg.no
            </a>.
          </p>
          <iframe
            v-if="activeSlide.link"
            :src="activeSlide.link"
            class="mt-6 w-full h-[80vh] border rounded"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const slides = ref([
    {
      image: "https://cdn.blogg.no/content/uploads/sites/172/2019/09/18232755/cropped-Unknown-4.jpeg",
      title: "Andrea’s Invisalign Reise",
      description: "Hvordan en norsk toppblogger oppnådde drømmesmilet.",
      cta: "Les Mer",
      link: "https://andreabadendyck.blogg.no/invisalign-5-ar-etter.html",
    },
    {
      image: "https://cdn.blogg.no/wp-content/uploads/sites/172/2018/11/12164621/285455-8-1407632317938.jpg",
      title: "Skinnene er nesten usynlige",
      description: `"Her kan dere se skinnene på tennene mine! Ganske usynlig, ikke sant?"`,
      cta: "Se Behandlinger",
      link: "https://andreabadendyck.blogg.no",
    },
    {
      image: "https://cdn.blogg.no/content/uploads/sites/172/2020/03/08182408/BeFunky-collage-70-scaled.jpg",
      title: "Reisen mot drømmesmilet",
      description: "23 forskjellige skinner og ett års behandling - det perfekte smil!",
      cta: "Kontakt Oss",
      link: "https://andreabadendyck.blogg.no",
    },
  ]);
  
  const currentSlide = ref(0);
  const isSidebarOpen = ref(false);
  const activeSlide = ref({});
  const isDesktop = ref(window.innerWidth >= 1024);
  
  const touchStartX = ref(0);
  const touchEndX = ref(0);
  
  const handleTouchStart = (event) => {
    touchStartX.value = event.touches[0].clientX;
  };
  
  const handleTouchMove = (event) => {
    touchEndX.value = event.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) {
      // Swipe left
      nextSlide();
    } else if (touchEndX.value - touchStartX.value > 50) {
      // Swipe right
      prevSlide();
    }
  };
  
  const openSidebar = (slide) => {
    activeSlide.value = slide;
    isSidebarOpen.value = true;
  };
  
  const closeSidebar = () => {
    isSidebarOpen.value = false;
  };
  
  const nextSlide = () => {
    if (currentSlide.value < slides.value.length - 1) {
      currentSlide.value++;
    }
  };
  
  const prevSlide = () => {
    if (currentSlide.value > 0) {
      currentSlide.value--;
    }
  };
  
  const goToSlide = (index) => {
    currentSlide.value = index;
  };
  
  const handleResize = () => {
    isDesktop.value = window.innerWidth >= 1024;
  };
  
  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
  </script>
  
  <style scoped>
  .story-carousel-wrapper {
    position: relative;
    overflow: hidden;
  }
  
  .story-carousel {
    display: flex;
    transition: transform 0.5s ease-in-out;
    touch-action: pan-y; /* Allow horizontal swiping */
  }
  
  .story-slide {
    flex: 0 0 100%;
    max-width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 1rem;
    scroll-snap-align: start;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .story-slide img {
    object-fit: cover;
    border-radius: 10px;
  }
  
  .dots-container {
    display: flex;
    gap: 0.5rem;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ccc;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .dot.active {
    background: #ff6781;
  }

  .text-gray-400 {
  color: rgba(255, 255, 255, 0.6); /* Subtil gråfarge */
}
.text-gray-400 a {
  text-decoration: underline;
  color: rgba(173, 216, 230, 0.8); /* Subtil blå lenke */
}
.text-gray-400 a:hover {
  color: rgba(173, 216, 230, 1); /* Litt lysere blå ved hover */
}

  </style>
  
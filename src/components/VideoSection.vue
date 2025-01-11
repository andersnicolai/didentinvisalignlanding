<template>
  <div class="w-full h-screen bg-gray-900 overflow-hidden relative">
    <!-- Video -->
    <video
      ref="videoRef"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      class="absolute top-0 left-0 w-full h-full object-cover z-0"
    >
      <source :src="currentVideo" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Background overlay -->
    <div class="absolute inset-0 w-full h-full bg-black/30 z-10"></div>

    <!-- Text overlay -->
    <div class="text-overlay absolute inset-0 z-20 flex flex-col justify-center items-center">
      <div
        class="diagonal-overlay w-full h-full bg-black/30 backdrop-blur-md flex flex-col justify-center py-8 px-4"
      >
        <div class="text-center text-white max-w-2xl mx-auto pt-8">
          <p class="text-3xl md:text-4xl font-bold">
            Forvandle smilet ditt med gjennomsiktig tannregulering
          </p>
          <!-- Button with higher z-index -->

          <!-- Booking Button with higher z-index -->
          <BookingButton
            class="relative z-30"
            label="Book gratis konsultasjon"
            @click="handleClick"
          />
        </div>
      </div>
    </div>
    <HighLevelFormModal ref="formModal" />

  </div>
</template>



<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import desktopVideo from "@/assets/videos/6037831_Person_People_1920x1080.mp4";
import mobileVideo from "@/assets/videos/hushorts.mov";
import BookingButton from "@/components/BookingButton.vue";
const formModal = ref(null);
import HighLevelFormModal from "@/components/FormModal.vue";

const videoRef = ref(null);
const currentVideo = ref(desktopVideo);


// Define handleClick at the top level
const handleClick = () => {
  console.log("Button clicked!");
  formModal.value.open();
  // Add logic for what happens when the button is clicked
};


onMounted(() => {
  const updateVideoSource = () => {
    const newVideo = window.innerWidth <= 768 ? mobileVideo : desktopVideo;
    if (currentVideo.value !== newVideo) {
      currentVideo.value = newVideo;
    }
  };

  // Watch for changes and reload the video element
  watch(currentVideo, () => {
    if (videoRef.value) {
      videoRef.value.load(); // Reload the video element to apply the updated source
    }
  });

  // Initial check
  updateVideoSource();

  // Update video source on window resize
  window.addEventListener("resize", updateVideoSource);

  // Handle autoplay setup
  if (videoRef.value) {
    videoRef.value.play().catch((error) => {
      console.warn("Autoplay prevented:", error);
    });

    // Pause/play on visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        videoRef.value?.pause();
      } else {
        videoRef.value?.play().catch(() => {});
      }
    });
  }
});




onBeforeUnmount(() => {
  window.removeEventListener("resize", updateVideoSource);
});
</script>

<style scoped>
/* Support for safe area insets */
@supports (padding-top: env(safe-area-inset-top)) {
  .mt-safe {
    padding-top: env(safe-area-inset-top);
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  video {
    animation: none;
  }
}

/* Text Overlay Styling */
.text-overlay {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 50%;
  transform: translateY(-50%);
}

/* Adjust height for larger screens */
@media screen and (min-width: 368px) {
  .text-overlay {
    height: 40%;
    top: 80%;
  }
}

/* Move text and button up for smaller screens */
@media screen and (max-width: 767px) {
  .diagonal-overlay > div {
    margin-top: -70px; /* Adjust text and button position within the overlay */
  }
}

/* Adjust height for larger screens */
@media screen and (min-width: 768px) {
  .text-overlay {
    height: 20%;
    top: 90%;
  }
}

/* Diagonal overlay effect for small screens */
@media screen and (max-width: 968px) {
  .diagonal-overlay {
    clip-path: polygon(0 0, 100% 20%, 100% 100%, 0% 100%);
  }
}

/* Remove diagonal overlay effect for larger screens */
@media screen and (min-width: 769px) {
  .diagonal-overlay {
    clip-path: none;
  }
}

/* Specific styling for 375px by 667px screens */
@media screen and (min-width: 375px) and (max-width: 375px) and (min-height: 667px) and (max-height: 667px) {
  .text-overlay {
    height: 45%;
    top: 80%;
  }

  .diagonal-overlay > div {
    margin-top: -20px;
  }

  .diagonal-overlay {
    clip-path: polygon(0 0, 100% 15%, 100% 100%, 0% 100%);
  }
}


</style>

<template>
    <div class="relative w-full bg-white-500 mt-8 flex items-center justify-center h-[800px] md:h-[100vh]">
      <!-- Video -->
      <video ref="videoRef" class="w-full h-full object-cover" autoplay loop muted>
        <source :src="videoSource" type="video/mp4" />
      </video>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
  
  // Import video sources
  import desktopVideoPath from '@/assets/videos/7021991_Aesthetic_Attractive_1920x1080.mp4';
  import mobileVideoPath from '@/assets/videos/snasneshorts.mov';
  
  // Reactive video source
  const videoSource = ref(desktopVideoPath); // Default to desktop video
  
  // Function to check if the user is on mobile
  const isMobile = () => window.innerWidth <= 1400;
  
  // Function to update the video source dynamically
  const updateVideoSource = () => {
    const newSource = isMobile() ? mobileVideoPath : desktopVideoPath;
    if (videoSource.value !== newSource) {
      videoSource.value = newSource; // Update the video source
    }
  };
  
  // Reload the video player when the video source changes
  const videoRef = ref<HTMLVideoElement | null>(null);
  watch(videoSource, () => {
    if (videoRef.value) {
      videoRef.value.load(); // Reload the video element to apply the new source
    }
  });
  
  onMounted(() => {
    updateVideoSource(); // Set the initial video source
    window.addEventListener('resize', updateVideoSource); // Update source on resize
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateVideoSource); // Clean up event listener
  });
  </script>
  
  <style scoped>
  .relative {
    position: relative;
  }
  
  .video-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .video-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  
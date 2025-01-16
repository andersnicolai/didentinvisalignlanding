<template>
  <div>
    <div class="relative">

      <VideoSection
          :desktopVideoSrc="desktopVideo"
          :mobileVideoSrc="desktopVideo"
          headlineText="Bestill time og spar 57% NÅ"
          buttonLabel="Bestill nå" />

      <div class="absolute inset-0 z-10">
        <div class="mt-safe sticky-wrapper">
          <div class="sticky-notification">
            <NotificationPane
                :message="notificationMessage"
                :buttonText="notificationButtonText"
            />
          </div>
        </div>
        <div>
          <AppHeader
              :logoVideo="logoVideo"
              :logoImage="logoImage"
              :formModal="formModal"
          />
        </div>
      </div>
    </div>
    <!-- Inserting the Google Maps iframe here -->

    <div class="spacer-section my-12 w-full bg-white">
  <div class="flex flex-col items-center p-6 rounded-lg shadow-lg max-w-screen-xl mx-auto">
    <h3 class="text-xl font-semibold text-blue-600">Hvor holder vi til?</h3>
    <p class="text-center max-w-3xl mt-4 text-gray-700">
      Du finner oss på Dident Tannlegesenter, sentralt i Oslo. Vi er dedikerte til å gi deg den beste tannpleien og Invisalign-behandlingen. Besøk oss i dag for en gratis konsultasjon!
    </p>
    <div class="map-section mt-6 w-full">
      <iframe
        loading="lazy"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBPjyiJOIpziomjiQqiOqtB9_XKwT_YfZM&q=dident%20tannlegesenter&zoom=15"
        title="dident tannlegesenter"
        aria-label="dident tannlegesenter"
        frameborder="0"
        style="border:0; width: 100%; height: 400px;"
        allowfullscreen
        class="rounded-lg"
      ></iframe>
    </div>
  </div>
</div>

    <!-- This is where routed content will appear -->
    <router-view />
    <!-- Footer that appears on all pages using this layout -->
 
    <FooterComponent />
  </div>
</template>

<script setup>
import desktopVideo from "@/assets/videos/6008132_4k Video_Blond_1920x1080.mp4";

import VideoSection from "@/components/VideoSection.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import formModal from "@/components/FormModal.vue"; // Ensure the formModal is imported correctly

const logoVideo = "@/assets/videos/logo.mp4";
const logoImage = "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
const notificationMessage = "Get your free consultation now!";
const notificationButtonText = "Close";
</script>

<style scoped>
/* Styles specific to the layout */
.map-section {
  padding: 20px 0;
}
</style>

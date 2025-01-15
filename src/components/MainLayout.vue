<template>
  <div>
    <div class="relative">
      <VideoSection
          :desktopVideoSrc="desktopVideo"
          mobileVideoSrc="huDer"
          headlineText="Helt usynlig tannregulering"
          buttonLabel="Bestill Gratis Konsultasjon" />

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
    <!-- This is where routed content will appear -->
    <router-view />
    <!-- Footer that appears on all pages using this layout -->
    <FooterComponent />
  </div>
</template>


<script setup>
import VideoSection from "@/components/VideoSection.vue";
import NotificationPane from "@/components/NotificationPane.vue";
import AppHeader from "@/components/AppHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import formModal from "@/components/FormModal.vue";
import desktopVideo from "@/assets/videos/6037831_Person_People_1920x1080.mp4"; // Make sure to import the FooterComponent
import huDer from "@/assets/videos/hushorts.mov";

const logoVideo = "@/assets/videos/logo.mp4";
const logoImage = "@/assets/images/logo/DiDent-logo-A1-e1733310238845.jpg";
const notificationMessage = "Get your free consultation now!";
const notificationButtonText = "Close";
</script>

<style scoped>
/* Styles specific to the layout */
</style>

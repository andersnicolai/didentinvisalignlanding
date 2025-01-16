<template>
<footer class="bg-white text-gray-800 py-6">
  <!-- Bold Line -->
  <div class="h-4 bg-blue-900"></div>
  <div class="container mx-auto text-center">
    <div class="flex justify-center items-center mb-6">
      <video
        id="logo"
        class="w-32 sm:w-48 h-16 sm:h-16 rounded-full object-cover transition-all duration-300"
        autoplay
        loop
        muted
      >
        <source :src="logoVideo" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <p class="mb-4">
      Velkommen til DiDent Tannlegesenter, hvor du får tannbehandling av høyeste kvalitet. Vi kombinerer førsteklasses behandling med moderne teknologi for å gi deg det beste innen tannhelse. Hos oss møter du et vennlig og profesjonelt miljø som setter din komfort og ditt smil i fokus.
    </p>
    <div class="mb-4">
      <p><strong>Kontakt oss</strong></p>
      <p>
        Email:
        <a href="mailto:info@dident.no" class="hover:text-green-500">info@dident.no</a>
      </p>
      <p>
        Telefon:
        <a href="tel:+4794095643" class="hover:text-green-500">940 95 643</a>
      </p>
      <p><strong>Organisasjonsnummer:</strong> 933 203 719</p>
    </div>
    <div class="flex flex-wrap justify-center space-x-6 mb-4">
      <div>
        <p class="font-bold">Nyttige lenker</p>
        <ul class="text-left">
          <li><a href="#" class="hover:text-green-500">Hvordan det fungerer</a></li>
          <li><a href="#" class="hover:text-green-500">Om oss</a></li>
          <li><a href="#" class="hover:text-green-500">Priser</a></li>
          <li><a href="#" class="hover:text-green-500">Spørsmål & Svar</a></li>
          <li><a href="#" class="hover:text-green-500">Personvernerklæring</a></li>
        </ul>
      </div>
    </div>
    <div class="flex justify-center space-x-4 mt-4">
      <a href="#" class="hover:text-green-500">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#" class="hover:text-green-500">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="#" class="hover:text-green-500">
        <i class="fab fa-tiktok"></i>
      </a>
    </div>

    <p class="mt-4">&copy; 2025 Dident. All Rights Reserved.</p>
    <router-link to="/privacy-policy" class="hover:text-green-500">
      Personvernerklæring
    </router-link>
  </div>
</footer>

</template>

<script>
import logoVideo from "@/assets/videos/logo.mp4";

export default {
  name: "FooterComponent",
  data() {
    return {
      logoVideo,
    };
  },
};
</script>

<style scoped>
/* Additional styles for hover states and transitions if needed */
a {
  color: #2d3748; /* Dark gray for better readability on white background */
}
a:hover {
  color: #38a169; /* Green hover effect */
}
</style>

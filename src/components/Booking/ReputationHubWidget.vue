<template>
  <div ref="reputationHubContainer" class="reputation-hub-widget"></div>
</template>

<script>
export default {
  name: 'ReputationHubWidget',
  mounted() {
    // Dynamically adding the script to ensure it's executed correctly within the Vue lifecycle
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.onload = this.appendIframe; // Append the iframe once the script is loaded
    this.$refs.reputationHubContainer.appendChild(script);
  },
  methods: {
    appendIframe() {
      // Creating the iframe dynamically after the script is loaded
      const iframe = document.createElement('iframe');
      iframe.className = 'lc_reviews_widget';
      iframe.src = 'https://reputationhub.site/reputation/widgets/review_widget/7zGDabJudfn9AdfzT6N5';
      iframe.frameBorder = '0';
      iframe.scrolling = 'no';
      iframe.style.minWidth = '100%';
      iframe.style.width = '100%';
      this.$refs.reputationHubContainer.appendChild(iframe);
    }
  }
}
</script>

<style scoped>
.reputation-hub-widget {
  min-width: 100%; /* Ensuring the container takes full width */
}
</style>

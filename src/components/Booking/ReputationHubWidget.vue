<template>
  <div>
    <iframe
      class="lc_reviews_widget"
      src="https://reputationhub.site/reputation/widgets/review_widget/7zGDabJudfn9AdfzT6N5"
      frameborder="0"
      scrolling="no"
      style="min-width: 100%; width: 100%;"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: "ReputationHubWidget",
  mounted() {
    // Dynamically inject the script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://reputationhub.site/reputation/assets/review-widget.js";
    document.body.appendChild(script);
  },
};
</script>

<style scoped>
.lc_reviews_widget {
  border-radius: 8px; /* Optional styling for rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
}
</style>

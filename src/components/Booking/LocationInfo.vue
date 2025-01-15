<template>
  <div class="location-info">
    <h2>Location Information</h2>
    <!-- Google Maps Iframe -->
    <iframe
        loading="lazy"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBPjyiJOIpziomjiQqiOqtB9_XKwT_YfZM&q=dident%20tannlegesenter&zoom=15"
        title="dident tannlegesenter"
        aria-label="dident tannlegesenter"
        frameborder="0"
        style="border:0; width: 100%; height: 300px;"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'LocationInfo'
};
</script>

<style>
.location-info {
  max-width: 600px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>

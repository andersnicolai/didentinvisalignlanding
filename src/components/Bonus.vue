<template>
  <div class="bonus-container">
    <div class="bonus-content">
      🎉 Bonus: Du får tilbud om gratis tannbleking når behandlingen er ferdig hvis du bestiller nå!
    </div>
  </div>
</template>

<script setup>
/* No additional setup needed */
</script>

<style scoped>
.bonus-container {
  background: #facc15; /* Bright yellow background */
  color: #713f12; /* Warm brown text color for contrast */
  padding: 1.5rem; /* Add padding for better spacing */
  border-radius: 1rem; /* Rounded corners for a friendly look */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  text-align: center; /* Center-align the text */
  animation: pulse 2s infinite; /* Pulsing animation to draw attention */
  overflow: hidden; /* Prevent content overflow */
  width: 70%; /* Set the width to 70% of the parent container */
  margin: 1rem auto; /* Center it horizontally and add vertical spacing */
}

.bonus-content {
  display: inline-block; /* Keeps text inline for animation */
  animation: bounce 2s infinite ease-in-out; /* Add bouncing effect */
  font-size: 1.25rem; /* Slightly larger text size for emphasis */
  font-weight: bold; /* Make the text bold */
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1); /* Original size */
    background-color: #facc15; /* Bright yellow */
  }
  50% {
    transform: scale(1.05); /* Slightly larger */
    background-color: #fbbf24; /* Slightly darker yellow */
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0); /* No movement */
  }
  50% {
    transform: translateY(-10px); /* Move up slightly */
  }
}
</style>

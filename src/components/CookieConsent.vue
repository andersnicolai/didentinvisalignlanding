<template>
    <div v-if="showConsent" class="cookie-consent">
      <p>We collect cookies to improve your experience. By using this site, you agree to our use of cookies.</p>
      <button @click="acceptCookies">Accept</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const showConsent = ref(!localStorage.getItem("cookieConsent"));
  
  function acceptCookies() {
    localStorage.setItem("cookieConsent", "true");
    showConsent.value = false;
  }
  </script>
  
  <style scoped>
  .cookie-consent {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .cookie-consent p {
    margin: 0 0 10px 0;
    font-size: 14px;
  }
  
  .cookie-consent button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .cookie-consent button:hover {
    background-color: #0056b3;
  }
  </style>
  
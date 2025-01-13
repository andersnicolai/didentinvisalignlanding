<template>
    <div class="recent-activity">
      <div
        v-for="(notification, index) in visibleNotifications"
        :key="index"
        class="notification-bubble"
      >
        <div class="notification-content">
          {{ notification.name }}, {{ notification.age }} år, fra {{ notification.location }} booket en konsultasjon!
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Cookies from "js-cookie";
  import norwegianNames from "@/assets/norwegian_names.json"; // Adjust the path if needed
  
  const visibleNotifications = ref([]);
  const isVisible = ref(false);
  
  const getRandomDelay = () => Math.random() * (180000 - 140000) + 140000; // Random delay between 2:20 and 3:00 minutes
  
  const startNotificationCycle = () => {
    setInterval(() => {
      // Pick a random name from the JSON file
      const randomIndex = Math.floor(Math.random() * norwegianNames.length);
      const randomNotification = norwegianNames[randomIndex];
  
      visibleNotifications.value.push(randomNotification);
  
      setTimeout(() => {
        visibleNotifications.value.shift(); // Remove the notification after 5 seconds
      }, 5000);
    }, 15000); // Show a new notification every 15 seconds
  };
  
  onMounted(() => {
    const hasSeenAdvertiser = Cookies.get("hasSeenAdvertiser");
  
    if (!hasSeenAdvertiser) {
      const delay = getRandomDelay();
      setTimeout(() => {
        isVisible.value = true;
        Cookies.set("hasSeenAdvertiser", "true", { expires: 1 });
        startNotificationCycle();
      }, delay);
    }
  });
  </script>
  
  <style scoped>
  .recent-activity {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .notification-bubble {
    background-color: #2563eb;
    color: white;
    padding: 10px 15px;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    font-weight: 500;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: bubbleAnimation 6s ease-in-out;
  }
  
  .notification-content {
    text-align: center;
    line-height: 1.2;
  }
  
  @keyframes bubbleAnimation {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.8);
    }
    10% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    90% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px) scale(0.8);
    }
  }
  </style>
  
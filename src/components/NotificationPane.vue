<template>
  <div
    v-if="isVisible"
    id="notification-pane"
    :class="[
      isHighlight ? 'bg-highlight' : 'bg-custom-gold',
      'text-white',
      'py-1',
      'px-2',
      'shadow-lg',
      'z-50',
      'transition-all',
      'duration-500'
    ]"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Notification Message -->
      <h1 class="text-xs sm:text-sm font-bold">
        {{ message }}
      </h1>

      <!-- Notification Button -->
      <button
        @click="handleClick"
        class="bg-gray-800 text-white font-bold py-1 px-2 rounded hover:bg-gray-900 transition"
      >
        {{ buttonText }}
      </button>
    </div>
    <HighLevelFormModal ref="formModal" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import HighLevelFormModal from "@/components/FormModal.vue";

// State variables
const formModal = ref(null);
const isVisible = ref(true); // Controls visibility
const isHighlight = ref(false); // Controls highlight state
const message = ref("Transform Your Smile with Invisalign – Book a Free Consultation Now!");
const buttonText = ref("Gratis Konsultasjon");

// Existing facts array
const facts = [
  "Usynlig og komfortabel. 😁",
  "Skreddersydde aligners. 🦷",
  "50 % raskere enn reguleringer. 💨",
  "Nesten usynlige aligners. 🔍",
  "Kan fjernes ved måltider. 🍴",
  "For voksne og tenåringer. 👨‍👩‍👧",
  "Perfekt smil uten metall. 🌟",
  "Resultater på få måneder. ⏱️",
  "Praktisk og enkel behandling. ✨",
  "Kjendiser elsker Invisalign. 🎬",
];


// New locations and messages for orders, only containing Oslo
const locations = ["Oslo"];
const orderMessages = [
  "Fra Oslo har noen nettopp bestilt en gratis konsultasjon! 🎉",
  "Ny bestilling fra Oslo – Se transformasjonen nå! 🌟",
  "Kunde fra Oslo har booket en time! 🦷",
];

// Function to handle click
const handleClick = () => {
  formModal.value.open();
};

// Function to set a random fact
const setRandomFact = () => {
  message.value = facts[Math.floor(Math.random() * facts.length)];
};

// Function to set a new order message with location
const setOrderMessage = () => {
  const randomOrderMessage = orderMessages[Math.floor(Math.random() * orderMessages.length)];
  message.value = randomOrderMessage;

  // Highlight notification
  isHighlight.value = true;

  // Reset highlight after 5 seconds
  setTimeout(() => {
    isHighlight.value = false;
  }, 5000);
};

// Initialize messages on mount
onMounted(() => {
  setRandomFact();

  // Alternate between facts and order messages every 10 seconds
  setInterval(() => {
    if (Math.random() > 0.5) {
      setRandomFact();
    } else {
      setOrderMessage();
    }
  }, 10000);
});
</script>

<style scoped>
/* Notification Pane */
#notification-pane {
  background-color: #c6a016; /* Custom gold */
  animation: slideDown 0.5s ease-in-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Highlight State */
.bg-highlight {
  background-color: #ff6347; /* Tomato Red */
}

.bg-custom-gold {
  background-color: #f8c102;
}

button:hover {
  background-color: #d4a40f;
}
</style>

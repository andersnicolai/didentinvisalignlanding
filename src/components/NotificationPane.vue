<template>
  <div
      v-if="isVisible"
      id="notification-pane"
      class="fixed top-0 left-0 w-full bg-custom-gold text-white py-1 px-2 shadow-lg z-50"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Notification Message -->
      <h1 class="text-xs sm:text-sm font-bold">{{ message }}</h1>

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
const formModal = ref(null);
import HighLevelFormModal from "@/components/FormModal.vue";


// State variables
const isVisible = ref(true); // Controls notification visibility
const message = ref("Transform Your Smile with Invisalign – Book a Free Consultation Now!");
const buttonText = ref("Gratis Konsultasjon");
const facts = [
  "Invisalign er usynlig og komfortabel. 😁",
  "Bruker skreddersydde aligners for å rette tennene. 🦷",
  "Kan være 50 % raskere enn tradisjonelle reguleringer. 💨",
  "Aligners er nesten umulige å se. 🔍",
  "Kan fjernes ved måltider og tannpuss. 🦷",
  "Passer for voksne og tenåringer. 👩‍👩‍👧‍👦",
  "Få et perfekt smil uten metallbraketter! 🌟",
  "Resultater vises på noen måneder! ⏱️",
  "Praktisk behandling uten bryderi. ✨",
  "Populært blant kjendiser og influencere. 🎬",
];



// Define handleClick at the top level
const handleClick = () => {
  console.log("Button clicked!");
  formModal.value.open();
  // Add logic for what happens when the button is clicked
};




// Set random initial message
onMounted(() => {
  message.value = facts[Math.floor(Math.random() * facts.length)];
});
</script>

<style scoped>
/* Notification Pane */
#notification-pane {
  background-color: #c6a016; /* Custom gold */
}

/* Button Styling */
.bg-custom-gold {
  background-color: #f8c102;
}
</style>

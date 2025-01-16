<template>
  <div class="relative bg-blue-100 text-gray-800 p-6 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-center text-blue-600">
      Er Invisalign riktig for deg?
    </h2>
    <p class="text-lg text-center mt-4">
      Ta vår raske quiz og lær mer om hvordan Invisalign kan transformere smilet ditt!
    </p>

    <!-- Start Quiz Button -->
    <div v-if="!quizStarted" class="text-center mt-8">
      <button
        class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
        @click="startQuiz"
      >
        Start Quiz
      </button>
    </div>

    <!-- Quiz Section -->
    <div v-if="quizStarted && !quizCompleted" class="mt-8">
      <div v-for="(question, index) in quizQuestions" :key="index" v-show="currentQuestion === index">
        <h3 class="text-2xl font-semibold">{{ question.text }}</h3>
        <div class="mt-4">
          <button
            v-for="(option, idx) in question.options"
            :key="idx"
            class="w-full bg-white text-blue-600 font-medium py-3 px-6 rounded-lg mt-3 shadow-lg hover:bg-blue-200"
            @click="selectOption(option.correct)"
          >
            {{ option.text }}
          </button>
        </div>
        <p
          v-if="feedback"
          :class="{
            'text-green-600': feedback === 'Riktig!',
            'text-red-600': feedback === 'Feil!',
          }"
          class="mt-4 text-lg font-bold"
        >
          {{ feedback }}
        </p>
      </div>
    </div>

    <!-- Email Submission Section -->
    <div v-if="quizCompleted && !emailSubmitted" class="text-center mt-8">
      <h3 class="text-2xl font-bold text-blue-600">Delta i trekningen!</h3>
      <p class="text-lg mt-4">
        Legg inn din e-post for å delta i trekningen av et Invisalign-gavekort!
      </p>
      <input
        type="email"
        v-model="email"
        placeholder="Din e-postadresse"
        class="w-full mt-4 p-3 rounded-lg border border-gray-300"
      />
      <button
        class="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
        @click="submitEmail"
      >
        Delta
      </button>
    </div>

    <!-- Result Section -->
    <div v-else-if="emailSubmitted" class="text-center mt-8">
      <h3 class="text-2xl font-bold text-blue-600">Takk for din deltakelse!</h3>
      <p class="text-lg mt-4">
        Du er nå med i trekningen. Lykke til, og sjekk din e-post for mer informasjon!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const quizStarted = ref(false); // Track whether the quiz has started
const quizQuestions = ref([
  {
    text: "Hvor gammel må du være for å bruke Invisalign?",
    options: [
      { text: "10 år", correct: false },
      { text: "16 år", correct: false },
      { text: "Alle aldre", correct: true },
    ],
  },
  {
    text: "Hva er den største fordelen med Invisalign?",
    options: [
      { text: "Det er usynlig", correct: true },
      { text: "Det er billigere enn vanlig regulering", correct: false },
      { text: "Det krever ingen oppfølging", correct: false },
    ],
  },
  {
    text: "Hvor lenge må du bruke Invisalign hver dag?",
    options: [
      { text: "12 timer", correct: false },
      { text: "20–22 timer", correct: true },
      { text: "Bare om natten", correct: false },
    ],
  },
]);

const currentQuestion = ref(0);
const quizCompleted = ref(false);
const emailSubmitted = ref(false);
const feedback = ref("");
const score = ref(0);
const email = ref("");

// Start Quiz Function
const startQuiz = () => {
  quizStarted.value = true;
};

const selectOption = (isCorrect) => {
  if (isCorrect) {
    score.value++;
    feedback.value = "Riktig!";
  } else {
    feedback.value = "Feil!";
  }

  setTimeout(() => {
    feedback.value = "";
    if (currentQuestion.value < quizQuestions.value.length - 1) {
      currentQuestion.value++;
    } else {
      quizCompleted.value = true;
    }
  }, 1500);
};

const submitEmail = async () => {
  if (!email.value) {
    alert("Vennligst skriv inn en gyldig e-postadresse!");
    return;
  }

  try {
    const response = await axios.post(
      "https://rest.gohighlevel.com/v1/contacts/",
      {
        email: email.value,
        tags: ["Invisalign Quiz Participant"],
        source: "Quiz App",
      },
      {
        headers: {
          Authorization: "Bearer <YOUR_API_KEY>",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      emailSubmitted.value = true;
      alert("E-posten din er lagret, og du er med i trekningen!");
    }
  } catch (error) {
    console.error("Feil ved innsending av e-post:", error);
    alert("Det oppstod en feil. Prøv igjen senere.");
  }
};
</script>

<style scoped>
button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

.bg-blue-100 {
  background-color: #ebf8ff;
}
</style>

<template>
    <div class="max-w-4xl mx-auto my-12">
      <h2 class="text-3xl font-semibold text-center mb-8">Spørsmål og svar</h2>
  
      <div class="space-y-4">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <button
            class="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            @click="toggleAnswer(index)"
          >
            <span class="text-lg font-semibold text-gray-700">{{ question.question }}</span>
            <svg
              class="w-6 h-6 text-blue-500 ml-2 transform transition-transform duration-300"
              :class="{ 'rotate-180': question.open }"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M5 9l7 7 7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
          <div v-if="question.open" class="p-4 bg-white">
            <p>{{ question.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FAQComponent",
    data() {
      return {
        questions: [
          {
            question: "Hva er Invisalign?",
            answer:
              "Invisalign er en moderne tannreguleringsløsning som bruker gjennomsiktige, avtagbare skinner for å rette opp tennene dine over tid.",
            open: false,
          },
          {
            question: "Hvordan fungerer Invisalign?",
            answer:
              "Invisalign-skinner er skreddersydd til din tannstruktur, og byttes ut med nye omtrent hver 7. dag eller som anbefalt av tannlegen din. Dette er for å gradvis flytte tennene dine til ønsket posisjon.",
            open: false,
          },
          {
            question: "Er Invisalign-behandling smertefull?",
            answer:
              "Noen pasienter kan oppleve mild ubehag når de begynner med et nytt sett med skinner, men dette pleier å avta etter et par dager.",
            open: false,
          },
          {
            question: "Hvor lenge må jeg ha på Invisalign-skinnene hver dag?",
            answer:
              "Du må bruke skinnene minimum 20-22 timer hver dag. Jo mer du bruker skinnene, jo raskere får du ønsket resultater.",
            open: false,
          },
          {
            question: "Kan jeg spise og drikke med Invisalign-skinnene på?",
            answer:
              "Nei, det anbefales å ta av skinnene når du spiser og drikker, for å unngå skader og/eller misfarging. Du kan derimot alltid drikke kaldt vann med skinnene på. NB! Varmt vann vil deformere skinnene.",
            open: false,
          },
          {
            question: "Hvor lenge varer en typisk Invisalign-behandling?",
            answer:
              "En Invisalign-behandling varer alt mellom 3-18 måneder, avhengig av kompleksiteten i tannjusteringen som er nødvendig.",
            open: false,
          },
          {
            question: "Hvor ofte trenger jeg å besøke tannlegen under behandlingen?",
            answer:
              "Du vil typisk ha oppfølgingstimer med tannlegen din hver 6. til 8. uke for å overvåke fremdriften og motta dine neste sett med skinner.",
            open: false,
          },
          {
            question: "Er Invisalign egnet for tenåringer?",
            answer:
              "Ja, Invisalign har løsninger spesielt designet for tenåringer. Det er imidlertid anbefalt at tenåringer er gamle nok til å håndtere ansvaret med å ta vare på og bruke skinnene korrekt.",
            open: false,
          },
          {
            question: "Hvordan kan jeg rengjøre Invisalign-skinnene?",
            answer:
              "Skinnene kan rengjøres med en spesiell Invisalign-rengjøringsløsning eller ved å skylle og børste dem forsiktig med tannkrem.",
            open: false,
          },
          {
            question: "Hva skjer etter at Invisalign-behandlingen er fullført?",
            answer:
              "Etter fullført behandling vil tannlegen din gi deg en retainertråd eller skinne, for å sikre at tennene dine forblir i den nye posisjonen.",
            open: false,
          },
        ],
      };
    },
    methods: {
      toggleAnswer(index) {
        this.questions[index].open = !this.questions[index].open;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  
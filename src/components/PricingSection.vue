<template>
  <section class="bg-gradient-to-b from-blue-500 to-blue-600 py-12">
    <div class="container mx-auto text-center text-white px-6 md:px-12 lg:px-24">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Priser for gjennomsiktig regulering</h2>
      <p class="text-lg md:text-xl mb-8">
        Prisen for behandling med Invisalign avhenger av hvor mange skinner du trenger for å oppnå ønsket resultat. <br />
        <strong>Invisalign har fire behandlings-kategorier med ulike priser.</strong>
      </p>

      <!-- Horizontal Scroll Container -->
      <div class="flex space-x-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-0">
        <!-- Card 1 -->
        <article
          class="bg-white text-black rounded-lg shadow-lg p-6 flex-shrink-0 w-80 snap-center"
          v-for="treatment in treatments"
          :key="treatment.id"
        >
          <h3 class="text-xl font-semibold mb-4">{{ treatment.title }}</h3>
          <p class="text-sm text-gray-700 mb-2">Estimert behandlingstid</p>
          <p class="font-medium text-lg mb-4">{{ treatment.duration }}</p>
          <p class="text-sm text-gray-700 mb-2">Priser</p>
          <p class="font-bold text-xl mb-4">{{ treatment.pricePerMonth }}</p>
          <p class="text-gray-600 mb-4">{{ treatment.totalPrice }}</p>
          <button
            class="bg-blue-500 text-white rounded-full px-4 py-2 w-full font-semibold"
            @click="handleClick"
          >
            Book gratis konsultasjon
          </button>
        </article>
      </div>

      <div class="mt-8 bg-white text-black rounded-lg p-6 shadow-lg">
  <p class="text-lg font-bold text-center animate-fade-in">
    <span class="text-blue-600">*12 mnd nedbetaling</span> tilgjengelig via
    <span class="text-blue-600 animate-bounce">Resurs Bank AB</span>,
    <span class="text-blue-600 animate-bounce delay-200">Svea Bank</span>,
    og flere alternativer!
  </p>
  <p class="text-md text-gray-700 mt-4 text-center animate-fade-in delay-500">
    Kontakt oss for å finne den betalingsløsningen som passer best for deg.
  </p>
</div>

    </div>
    <HighLevelFormModal ref="formModal" />

  </section>
</template>

<script>
import { ref } from "vue";
import HighLevelFormModal from "@/components/FormModal.vue";

export default {
  name: "PricingSection",
  components: {
    HighLevelFormModal,
  },
  data() {
    return {
      treatments: [
        {
          id: 1,
          title: "Veldig enkel Behandling",
          duration: "2-3 mnd",
          pricePerMonth: "2.916,-/mnd*",
          totalPrice: "Fastpris: 34.990,-",
        },
        {
          id: 2,
          title: "Enkel Behandling",
          duration: "3-6 mnd",
          pricePerMonth: "3.749,-/mnd*",
          totalPrice: "Fastpris: 44.990,-",
        },
        {
          id: 3,
          title: "Middels Behandling",
          duration: "6-12 mnd",
          pricePerMonth: "4.583,-/mnd*",
          totalPrice: "Fastpris: 54.990,-",
        },
        {
          id: 4,
          title: "Avansert Behandling",
          duration: "12-18 mnd",
          pricePerMonth: "5.416,-/mnd*",
          totalPrice: "Fastpris: 64.990,-",
        },
      ],
    };
  },
  setup() {
    const formModal = ref(null);

    const handleClick = () => {
      console.log("Button clicked!");
      if (formModal.value) {
        formModal.value.open();
      }
    };

    return { formModal, handleClick };
  },
};
</script>

<style scoped>
/* Add any specific styles for this component here */
</style>

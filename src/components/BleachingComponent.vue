<template>
  <div class="min-h-screen bg-white">
    <!-- Floating Content Box -->
    <div class="relative -mt-64 md:-mt-72 z-10">
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-3 md:p-8 mx-4">
        <div class="text-center">
          <h1 class="text-xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">
            Spar 50% på tannbleking og AirFlow
          </h1>
          <div class="text-lg md:text-2xl font-bold text-green-600 mb-2 md:mb-4">
            <div class="flex flex-col items-center">
              <span class="text-2xl md:text-3xl">Kun kr 1.995,-</span>
              <span class="text-sm md:text-base text-gray-500 line-through mt-1">
                (Ordinær pris kr 4.940,-)
              </span>
            </div>
          </div>
          <div class="bg-yellow-50 border border-yellow-200 p-2 md:p-3 rounded-lg mb-3 md:mb-6">
            <p class="font-bold text-sm md:text-lg text-yellow-800">
              ⚡ BONUS: Gratis tannundersøkelse
            </p>
            <p class="text-yellow-800 font-semibold text-xs md:text-base">
              Verdi: 950 kr
            </p>
          </div>
          <div class="space-y-2 md:space-y-4">
            <button
              @click="scrollToBooking"
              class="w-full bg-green-600 text-white px-3 md:px-4 py-2 md:py-4 rounded-xl text-sm md:text-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 duration-200 shadow-xl uppercase tracking-wide"
            >
              Bestill tilbud nå ➔
            </button>
            <p class="text-xs md:text-base text-green-600 font-semibold animate-pulse">
              🔥 Kun {{ remainingSpots }} plasser igjen til denne prisen!
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Value Props Section -->
    <div class="bg-gray-50 py-6 md:py-16 px-4 mt-4 md:mt-16">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div class="bg-white p-3 md:p-4 rounded-xl shadow-lg text-center">
            <div class="text-xl md:text-2xl mb-1 md:mb-2">💰</div>
            <h3 class="text-base md:text-lg font-bold mb-1">Spar 3.895 kr</h3>
            <p class="text-xs md:text-sm">Markedets beste tilbud på tannbleking</p>
          </div>
          <div class="bg-white p-3 md:p-4 rounded-xl shadow-lg text-center">
            <div class="text-xl md:text-2xl mb-1 md:mb-2">✨</div>
            <h3 class="text-base md:text-lg font-bold mb-1">Synlige resultater</h3>
            <p class="text-xs md:text-sm">Hvitere tenner etter første behandling</p>
          </div>
          <div class="bg-white p-3 md:p-4 rounded-xl shadow-lg text-center">
            <div class="text-xl md:text-2xl mb-1 md:mb-2">🦷</div>
            <h3 class="text-base md:text-lg font-bold mb-1">Trygg behandling</h3>
            <p class="text-xs md:text-sm">Utført av erfarne tannleger</p>
          </div>
        </div>
      </div>
    </div>


    <!-- Map Section -->
    <div class="bg-white py-12 md:py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">Sentralt på Bjølsen</h2>
        <div class="bg-blue-50 p-4 md:p-6 rounded-lg shadow-lg">
          <div class="text-center mb-6 md:mb-8">
            <p class="text-lg md:text-xl font-semibold mb-3 md:mb-4">
              Dident Tannlegesenter
            </p>
            <p class="text-base md:text-lg text-gray-700 mb-2">
              Sentralt på Bjølsen, lett tilgjengelig med både bil og kollektivtransport
            </p>
            <div class="space-y-2 text-gray-600 text-sm md:text-base">
              <p>✓ Gratis parkering for våre pasienter</p>
              <p>✓ 2 minutter fra Bjølsen Trikk</p>
              <p>✓ Moderne lokaler med det nyeste utstyret</p>
            </div>
          </div>
          <iframe
            loading="lazy"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBPjyiJOIpziomjiQqiOqtB9_XKwT_YfZM&q=dident%20tannlegesenter&zoom=15"
            title="Dident Tannlegesenter på Bjølsen"
            aria-label="Dident Tannlegesenter på Bjølsen"
            frameborder="0"
            style="border:0; width: 100%; height: 300px;"
            allowfullscreen
            class="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- ReputationHub Widget Section -->
    <div class="bg-white py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">
          Hva sier våre pasienter?
        </h2>

        <!-- Star Reviews Section -->
        <StarReviews />
        <ReputationHubWidget />
      </div>
    </div>



    <!-- Velkommen Section -->
    <div class="bg-gray-50 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Velkommen til Bjølsens mest moderne tannlegesenter
        </h2>
        <p class="text-lg md:text-xl text-gray-700 mb-8">
          I våre flotte lokaler på Bjølsen tilbyr vi profesjonell behandling med lang erfaring. 
          Vi har det nyeste utstyret, gratis parkering og er spesialister på behandling av tannlegeskrekk.
        </p>
      </div>
    </div>

    <!-- Helt uforpliktende Section -->
    <div class="bg-blue-50 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Helt uforpliktende</h2>
        <p class="text-lg md:text-xl text-gray-700">
          Det er ingen forpliktelser eller skjulte kostnader ved dette tilbudet. 
          Vi er sikre på at du kommer til å ha en fantastisk opplevelse, og håper selvfølgelig at du vil fortsette hos oss som pasient.
        </p>
      </div>
    </div>

    <!-- Trygghet Section -->
    <div class="bg-white py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
          Hos oss kan du føle deg trygg!
        </h2>
        <div class="space-y-6">
          <div class="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
            <span class="text-green-500 text-xl">✓</span>
            <p class="text-lg">Pasienter blir bedt om å desinfisere hendene eller vaske dem ved inngang.</p>
          </div>
          <div class="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
            <span class="text-green-500 text-xl">✓</span>
            <p class="text-lg">Begrenset tilgang på venterommet.</p>
          </div>
          <div class="flex items-start space-x-4 bg-green-50 p-4 rounded-lg">
            <span class="text-green-500 text-xl">✓</span>
            <p class="text-lg">Vi desinfiserer dørhåndtak og overflater etter hvert besøk.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dette er inkludert Section -->
    <div class="bg-gray-50 py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Dette er inkludert i undersøkelsen:
        </h2>
        <div class="space-y-8">
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold mb-4">Undersøkelse</h3>
            <p class="text-lg text-gray-700">
              Komplett tannhelsesjekk inkludert røntgen, diagnostikk, fjerning av tannstein og grundig rens.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold mb-4">Røntgen</h3>
            <p class="text-lg text-gray-700">
              Vi tar røntgenbilder av tennene dine for å få full oversikt over din tannhelse. 
              Sammen går vi gjennom eventuelle funn.
            </p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold mb-4">Rens</h3>
            <p class="text-lg text-gray-700">
              Vi renser tennene dine med Airflow, fjerner tannstein og misfargning. 
              Resultatet er at tennene dine blir rene, glatte og hvite. 
              Slik at du får et enda finere smil.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section - Updated -->
    <div class="bg-blue-600 py-16 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Bestill time på Bjølsen i dag!
        </h2>
        <p class="text-xl text-white mb-8">
          Spar 3.895 kr på profesjonell tannbleking
        </p>
        <button
          @click="scrollToBooking"
          class="bg-green-600 text-white px-8 py-6 rounded-xl text-xl md:text-2xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 duration-200 shadow-xl uppercase tracking-wide"
        >
          JEG VIL BENYTTE MEG AV TILBUDET NÅ ➔
        </button>
      </div>
    </div>

    <!-- Booking Section -->
    <div class="py-16 px-4" id="booking">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white p-8 rounded-lg shadow-xl border-2 border-blue-100">
          <!-- Vis skjema hvis ikke submitted -->
          <div v-if="!isSubmitted">
            <div class="text-center mb-8">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">Bestill time nå</h2>
              <p class="text-lg text-gray-600">
                Fyll ut skjemaet under, så kontakter vi deg innen 24 timer for å bekrefte timen din.
              </p>
            </div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700">Navn</label>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Skriv inn ditt navn"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">E-post</label>
                <input
                  type="email"
                  v-model="form.email"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Din e-postadresse"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Telefon</label>
                <input
                  type="tel"
                  v-model="form.phone"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ditt telefonnummer"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-green-600 text-white px-6 py-4 rounded-xl text-xl font-bold hover:bg-green-700 transition-all transform hover:scale-105 duration-200 shadow-lg uppercase"
              >
                JA! Jeg vil spare 3.895 kr ➔
              </button>
            </form>
            <div class="mt-6 space-y-2 text-center">
              <p class="text-sm text-gray-500">
                100% trygg booking - Vi kontakter deg innen 24 timer
              </p>
              <p class="text-sm text-gray-500">
                ⭐ Mer enn 500 fornøyde pasienter
              </p>
            </div>
          </div>

          <!-- Vis takkemelding etter innsending -->
          <div v-else class="text-center py-8">
            <div class="mb-6">
              <span class="text-5xl">✅</span>
            </div>
            <h2 class="text-3xl md:text-4xl font-bold text-green-600 mb-4">
              Takk for din bestilling!
            </h2>
            <p class="text-xl text-gray-700 mb-4">
              Vi har mottatt din henvendelse og kontakter deg innen 24 timer for å bekrefte timen din.
            </p>
            <p class="text-lg text-gray-600">
              Sjekk gjerne e-posten din for bekreftelse på mottatt bestilling.
            </p>
            <div class="mt-8 space-y-3">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Du finner oss her:</h3>
                <p class="text-gray-700">Dident Tannlegesenter</p>
                <p class="text-gray-700">Moldegata 5</p>
                <p class="text-gray-700">0445 Oslo</p>
                <a 
                  href="https://maps.google.com/?q=Moldegata+5,+0445+Oslo" 
                  target="_blank" 
                  class="text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
                >
                  Åpne i Google Maps ↗
                </a>
              </div>
              <div class="space-y-2">
                <p class="text-sm text-gray-500">
                  🕒 Åpningstider: Man-Fre 08:00-16:00
                </p>
                <p class="text-sm text-gray-500">
                  📞 Telefon: 940 95 643
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import StarReviews from './StarReviews.vue';
import ReputationHubWidget from './Booking/ReputationHubWidget.vue';

const form = ref({
  name: '',
  email: '',
  phone: ''
});

const remainingSpots = ref(50);
const isSubmitted = ref(false);

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      "https://rest.gohighlevel.com/v1/contacts/",
      {
        email: form.value.email,
        phone: form.value.phone,
        firstName: form.value.name,
        tags: ["Bleking Kampanje"],
        source: "Bleking Landing Page",
      },
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Ijd6R0RhYkp1ZGZuOUFkZnpUNk41IiwidmVyc2lvbiI6MSwiaWF0IjoxNzM2NTAzNzc3MDczLCJzdWIiOiI1dmVsYU5VRUduT1VLOTlYZWtkMCJ9.cpWGfwqhyoJzr1VfdgBvGoLpidbisqqXohbDsBB1aoI",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      // Spor vellykket innsending
      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Bleking Kampanje',
          content_category: 'Tannbleking',
          value: 1990.00,
          currency: 'NOK'
        });
      }
      
      isSubmitted.value = true;
      remainingSpots.value--;
      setTimeout(() => {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  } catch (error) {
    console.error("Feil ved innsending:", error);
    alert("Det oppstod en feil. Vennligst prøv igjen senere.");
  }
};

const scrollToBooking = () => {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .animate-pulse {
    animation-duration: 3s;
  }
  
  h1, h2, h3 {
    letter-spacing: -0.01em;
  }
  
  button {
    min-height: 44px;
  }
}
</style> 
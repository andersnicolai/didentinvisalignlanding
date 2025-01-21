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

    <!-- Social Proof Bar - Legg til rett under hero-seksjonen -->
    <div class="bg-green-50 py-3 border-y border-green-100">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm md:text-base">
          <div class="flex items-center">
            <span class="text-green-600 mr-2">✓</span>
            <span>{{ bookingsThisWeek }} bookinger denne uken</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-600 mr-2">⭐</span>
            <span>4.9/5 kundetilfredshet</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-600 mr-2">🔥</span>
            <span>{{ remainingSpots }} plasser igjen</span>
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

    <!-- Risk Reversal Section - Legg til før booking-seksjonen -->
    <div class="bg-blue-50 py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-8">
          100% Fornøyd eller Pengene Tilbake
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="text-3xl mb-4">🛡️</div>
            <h3 class="font-bold mb-2">Trygg Behandling</h3>
            <p class="text-gray-600">
              Utført av erfarne tannleger med over 10 års erfaring
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="text-3xl mb-4">⚡</div>
            <h3 class="font-bold mb-2">Rask Prosess</h3>
            <p class="text-gray-600">
              Behandlingen tar kun 60-90 minutter
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="text-3xl mb-4">💰</div>
            <h3 class="font-bold mb-2">Pengene Tilbake</h3>
            <p class="text-gray-600">
              Hvis du ikke er 100% fornøyd med resultatet
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tannlege Profiler Section -->
    <div class="bg-gray-50 py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Møt vårt erfarne team
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg" 
                alt="Dr. Sarah Hansen"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-bold mb-2">Dr. Sarah Hansen</h3>
            <p class="text-gray-600 mb-4">Spesialist i kosmetisk tannbehandling</p>
            <p class="text-gray-700">
              Med over 10 års erfaring i kosmetisk tannbehandling, har Dr. Hansen hjulpet hundrevis av pasienter 
              å få et hvitere og friskere smil.
            </p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="aspect-square rounded-full overflow-hidden mb-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1280px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg" 
                alt="Dr. Marcus Nilsson"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-xl font-bold mb-2">Dr. Marcus Nilsson</h3>
            <p class="text-gray-600 mb-4">Tannlege med fokus på pasientkomfort</p>
            <p class="text-gray-700">
              Dr. Nilsson er kjent for sin varsomme tilnærming og er spesialist på behandling 
              av pasienter med tannlegeskrekk.
            </p>
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

    <!-- Trust Bar - Legg til før FAQ -->
    <div class="bg-gray-50 py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-gray-600 mb-8">Vi er godkjent og anbefalt av:</p>
        <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <img src="@/assets/images/helfo-logo.png" alt="Helfo" class="h-12" />
          <img src="@/assets/images/tannlegeforeningen-logo.jpg" alt="Den norske tannlegeforening" class="h-12" />
          <!-- Legg til flere relevante logoer -->
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
        <Card class="p-8">
          <CardHeader>
            <CardTitle class="text-3xl md:text-4xl font-bold text-center">
              Bestill time nå
            </CardTitle>
            <CardDescription class="text-lg text-center">
              Fyll ut skjemaet under, så kontakter vi deg innen 24 timer for å bekrefte timen din.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <!-- Progress Bar -->
            <div class="mb-6">
              <div class="flex justify-between text-sm mb-2">
                <span>Fremdrift</span>
                <span :class="formProgress.value >= 66 ? 'text-green-600' : 'text-gray-600'">
                  {{ formProgress }}% fullført
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  :class="[formProgressColor, 'h-2 rounded-full transition-all duration-300']" 
                  :style="{ width: `${formProgress}%` }"
                ></div>
              </div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Navn</label>
                <Input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Skriv inn ditt navn"
                  @focus="handleFormFocus"
                  class="shadow-sm"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">E-post</label>
                <Input
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="Din e-postadresse"
                  class="shadow-sm"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Telefon</label>
                <Input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="Ditt telefonnummer"
                  class="shadow-sm"
                />
              </div>

              <Button type="submit" class="w-full" size="lg">
                <div>
                  <div class="text-lg">JA! Jeg vil spare 3.895 kr ➔</div>
                  <div class="text-xs opacity-90">Klikk her - Vi kontakter deg innen 24t</div>
                </div>
              </Button>

              <div class="mt-6 space-y-2 text-center">
                <p class="text-sm text-gray-500">
                  100% trygg booking - Vi kontakter deg innen 24 timer
                </p>
                <p class="text-sm text-gray-500">
                  ⭐ Mer enn 500 fornøyde pasienter
                </p>
              </div>
            </form>

            <!-- Vis takkemelding etter innsending -->
            <div v-if="isSubmitted" class="text-center py-8">
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
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="bg-gray-50 py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
          Ofte stilte spørsmål
        </h2>
        <div class="space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold mb-3">{{ faq.question }}</h3>
            <p class="text-gray-700">{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Countdown Timer Component -->
    <div class="bg-yellow-50 p-4 rounded-lg mb-6">
      <p class="font-bold text-lg text-yellow-800 mb-2">
        Tilbudet utløper om:
      </p>
      <div class="flex justify-center space-x-4">
        <div v-for="(unit, index) in timeLeft" :key="index" class="text-center">
          <div class="text-2xl font-bold text-yellow-900">
            {{ unit.value }}
          </div>
          <div class="text-sm text-yellow-700">
            {{ unit.label }}
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Urgency Banner -->
    <div 
      v-show="showUrgencyBanner"
      class="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-100 p-4 transform transition-transform duration-300 z-50"
    >
      <div class="max-w-4xl mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <span class="text-yellow-800 font-bold mr-2">🔥 Kun {{ remainingSpots }} plasser igjen!</span>
          <div class="hidden md:block text-yellow-700">
            Tilbudet utløper snart - Spar 3.895 kr nå
          </div>
        </div>
        <Button 
          @click="scrollToBooking"
          size="sm"
          class="whitespace-nowrap"
        >
          Bestill Nå ➔
        </Button>
      </div>
    </div>

    <!-- Exit Intent Popup -->
    <div 
      v-if="showExitPopup"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-8 rounded-xl max-w-md mx-4">
        <h3 class="text-2xl font-bold mb-4">Vent! Ikke gå glipp av dette tilbudet</h3>
        <p class="mb-6">
          🎁 Bestill nå og få en gratis tannundersøkelse (verdi 950 kr) i tillegg til rabatten!
        </p>
        <div class="space-y-4">
          <Button 
            @click="handleExitPopupBooking" 
            class="w-full"
          >
            Ja takk, jeg vil spare penger!
          </Button>
          <button 
            @click="showExitPopup = false"
            class="w-full text-gray-500 hover:text-gray-700"
          >
            Nei takk, jeg vil betale full pris senere
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import StarReviews from './StarReviews.vue';
import ReputationHubWidget from './Booking/ReputationHubWidget.vue';
import Card from '@/components/ui/card.vue'
import CardHeader from '@/components/ui/card/card-header.vue'
import CardTitle from '@/components/ui/card/card-title.vue'
import CardDescription from '@/components/ui/card/card-description.vue'
import CardContent from '@/components/ui/card/card-content.vue'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'
import { useEventTracking } from '@/composables/useEventTracking';

const form = ref({
  name: '',
  email: '',
  phone: ''
});

const remainingSpots = ref(50);
const isSubmitted = ref(false);
const bookingsThisWeek = ref(37); // Dynamisk nummer som øker

const { 
  trackEvent, 
  trackPageView, 
  trackLead, 
  trackViewContent,
  trackInitiateCheckout 
} = useEventTracking();

const handleSubmit = async () => {
  try {
    // Send til backend i stedet for direkte til GoHighLevel
    const response = await axios.post('/api/leads', {
      email: form.value.email,
      phone: form.value.phone,
      firstName: form.value.name,
      source: new URLSearchParams(window.location.search).get('utm_source') || 'direct',
      campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      landingPage: window.location.pathname
    });

    if (response.status === 200) {
      trackLead({
        content_name: 'Tannbleking Booking',
        content_category: 'Booking Form',
        currency: 'NOK',
        value: 1995.00,
        lead_type: 'Tannbleking',
        form_id: 'booking-form'
      });
      
      isSubmitted.value = true;
    }
  } catch (error) {
    console.error("Submission error:", error);
    // Track error event
    trackEvent('form_error', {
      error_type: error.message,
      form_id: 'booking-form'
    });
  }
};

const scrollToBooking = () => {
  document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
};

// Forbedret event tracking
onMounted(() => {
  // Track initial page view med mer data
  trackPageView({
    page_title: 'Tannbleking Landing Page',
    page_location: window.location.href,
    campaign_source: new URLSearchParams(window.location.search).get('utm_source'),
    campaign_medium: new URLSearchParams(window.location.search).get('utm_medium'),
    campaign_name: new URLSearchParams(window.location.search).get('utm_campaign')
  });

  // Sett opp scroll tracking
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        trackViewContent({
          content_name: sectionId,
          content_category: 'Section View',
          percent_visible: Math.round(entry.intersectionRatio * 100)
        });
      }
    });
  }, { 
    threshold: [0.25, 0.5, 0.75, 1] 
  });

  // Observer alle viktige seksjoner
  ['booking', 'reviews', 'faq', 'trust-badges'].forEach(id => {
    const element = document.getElementById(id);
    if (element) observer.observe(element);
  });
});

const faqs = [
  {
    question: "Hvor lenge varer behandlingen?",
    answer: "En tannblekingsbehandling tar vanligvis 60-90 minutter. Dette inkluderer konsultasjon, forberedelse og selve blekingen."
  },
  {
    question: "Er tannbleking skadelig?",
    answer: "Nei, profesjonell tannbleking er en trygg behandling når den utføres av kvalifiserte tannleger. Vi bruker kun godkjente produkter og metoder."
  },
  {
    question: "Hvor lenge varer resultatet?",
    answer: "Resultatet kan vare i flere år med god tannhygiene. Faktorer som røyking, kaffe og rødvin kan påvirke varigheten."
  },
  {
    question: "Er behandlingen smertefull?",
    answer: "De fleste opplever ingen smerte under behandlingen. Noen kan kjenne lett sensitivitet i tennene etterpå, men dette går vanligvis over etter kort tid."
  }
];

const timeLeft = ref([
  { value: '02', label: 'Dager' },
  { value: '23', label: 'Timer' },
  { value: '59', label: 'Minutter' },
  { value: '59', label: 'Sekunder' }
]);

// Add countdown logic
onMounted(() => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 3); // 3 dager fra nå

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeLeft.value = [
      { value: String(days).padStart(2, '0'), label: 'Dager' },
      { value: String(hours).padStart(2, '0'), label: 'Timer' },
      { value: String(minutes).padStart(2, '0'), label: 'Minutter' },
      { value: String(seconds).padStart(2, '0'), label: 'Sekunder' }
    ];

    if (distance < 0) {
      clearInterval(timer);
    }
  }, 1000);
});

const showUrgencyBanner = ref(false);

onMounted(() => {
  window.addEventListener('scroll', () => {
    showUrgencyBanner.value = window.scrollY > 500;
  });
});

const showExitPopup = ref(false);

onMounted(() => {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !showExitPopup.value) {
      showExitPopup.value = true;
    }
  });
});

const handleExitPopupBooking = () => {
  showExitPopup.value = false;
  scrollToBooking();
};

const formProgress = computed(() => {
  let progress = 0;
  const fields = [form.value.name, form.value.email, form.value.phone];
  const totalFields = fields.length;
  
  fields.forEach(field => {
    if (field && field.length > 0) {
      progress += (100 / totalFields);
    }
  });
  
  return Math.round(progress);
});

const formProgressColor = computed(() => {
  if (formProgress.value < 33) return 'bg-red-500';
  if (formProgress.value < 66) return 'bg-yellow-500';
  return 'bg-green-600';
});

// Oppdater eksisterende form inputs med tracking
const handleFormFocus = () => {
  trackInitiateCheckout();
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
<template>
  <div class="relative w-full">
    <!-- Stars Scrolling Section -->
    <div class="relative bg-pink-700 h-24 flex justify-center items-center overflow-hidden">
      <ul class="flex gap-16 text-white whitespace-nowrap animate-scroll-reverse">
        <li
          v-for="review in reviews"
          :key="review.site"
          class="flex items-center gap-4 text-lg font-semibold"
        >
          <img
            :src="review.logo"
            :alt="`${review.site} logo`"
            :class="{
              'w-12 h-12': review.site === 'Google' || review.site === 'Trustpilot',
              'w-8 h-8': review.site === 'Facebook',
            }"
          />
          <span>
            <i class="fas fa-star text-yellow-300"></i>
            <i class="fas fa-star text-yellow-300"></i>
            <i class="fas fa-star text-yellow-300"></i>
            <i class="fas fa-star text-yellow-300"></i>
            <i class="fas fa-star-half-alt text-yellow-300"></i>
          </span>
          <span>{{ review.rating }}/5 {{ review.site }} anmeldelser</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StarReviews',
  data() {
    return {
      reviews: [
        {
          site: 'Google',
          rating: 4.5,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        },
        {
          site: 'Facebook',
          rating: 4.6,
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
        },
        {
          site: 'Trustpilot',
          rating: 4.7,
          logo: 'https://cdn.trustpilot.net/brand-assets/1.6.0/logo-white.svg',
        },
      ],
    };
  },
});
</script>

<style scoped>
.animate-scroll-reverse {
  animation: scroll-reverse 20s linear infinite;
}

@keyframes scroll-reverse {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Cool Font Style */
ul li span {
  font-family: 'Poppins', sans-serif;
}
</style>

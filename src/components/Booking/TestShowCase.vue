<template>
  <div class="services-container mx-auto p-8 bg-white rounded-lg shadow-lg">
    <div class="service-grid">
      <!-- Undersøkelse -->
      <div class="service-item">
        <img
          src="//www.kampanjeskjema.no/hosted/images/68/1729a9da9e4e9cbf62f3efeda038de/tannundersokelse.png"
          alt="Undersøkelse"
          class="service-icon"
        />
        <h2 class="service-title">Undersøkelse</h2>
        <p class="service-description">
          Komplett tannhelsesjekk inkludert røntgen, diagnostikk, fjerning av tannstein og grundig rens.
        </p>
      </div>

      <!-- Røntgen -->
      <div class="service-item">
        <img
          src="//www.kampanjeskjema.no/hosted/images/b7/2e0e9084a444278c9c2a6a23cb8521/Rontgen.png"
          alt="Røntgen"
          class="service-icon"
        />
        <h2 class="service-title">Røntgen</h2>
        <p class="service-description">
          Vi tar røntgenbilder av tennene dine for å få full oversikt over din tannhelse. Sammen går vi gjennom eventuelle funn.
        </p>
      </div>

      <!-- Rens -->
      <div class="service-item">
        <img
          src="//www.kampanjeskjema.no/hosted/images/66/4e20f7591048f2aac0555fe8c0d9e6/rens2222.png"
          alt="Rens"
          class="service-icon"
        />
        <h2 class="service-title">Rens</h2>
        <p class="service-description">
          Vi renser tennene dine med Airflow, fjerner tannstein og misfargning. Resultatet er at tennene dine blir rene, glatte og hvite. Slik at du får et enda finere smil.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DentalServices",
};
</script>

<style scoped>
.services-container {
  max-width: 1200px; /* Restrict the width for a centered layout */
  margin: 0 auto; /* Center the container */
  background-color: #ffffff; /* Clean background */
}

.service-grid {
  display: grid; /* Use CSS Grid for layout */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  gap: 24px; /* Spacing between items */
}

.service-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  background-color: #f9f9f9; /* Light background for items */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px); /* Lift on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Elevated shadow */
}

.service-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
}

.service-title {
  font-size: 1.25rem; /* Slightly larger for emphasis */
  font-weight: bold;
  color: #1e5589; /* Blue color */
  margin: 0 0 8px;
}

.service-description {
  font-size: 1rem;
  color: #333333; /* Dark text for readability */
  line-height: 1.5;
}
</style>

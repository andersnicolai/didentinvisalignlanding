<template>
    <div class="modal-backdrop">
      <div class="modal-content">
        <!-- Custom Form -->
        <div class="form-container">
          <h2 class="text-3xl font-bold text-blue-600 text-center mb-6">
            Bestill en gratis Invisalign konsultasjon
          </h2>
          <p class="text-lg text-gray-700 text-center mb-6">
            Fyll ut skjemaet nedenfor, så kontakter vi deg!
          </p>
          <form @submit.prevent="submitForm">
            <!-- Name Input -->
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-gray-700">Navn</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                class="form-input"
                placeholder="Ditt navn"
                required
              />
            </div>
  
            <!-- Email Input -->
            <div class="form-group">
              <label for="email" class="block text-sm font-medium text-gray-700">E-post</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="form-input"
                placeholder="Din e-postadresse"
                required
              />
            </div>
  
            <!-- Phone Number Input -->
            <div class="form-group">
              <label for="phone" class="block text-sm font-medium text-gray-700">Telefonnummer</label>
              <div class="phone-input">
                <span class="flag-icon">🇳🇴</span>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="form-input"
                  placeholder="(+47) 123 45 678"
                  required
                />
              </div>
            </div>
  
            <!-- Consultation Details -->
            <div class="form-group">
              <label for="details" class="block text-sm font-medium text-gray-700">Hva ønsker du vi skal vite før konsultasjonen?</label>
              <textarea
                id="details"
                v-model="formData.details"
                class="form-textarea"
                placeholder="Skriv dine tanker her..."
                rows="4"
              ></textarea>
            </div>
  
            <!-- Submit Button -->
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send</span>
              <span v-else>Laster...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    name: "CustomFormModal",
    setup() {
      const isSubmitting = ref(false);
      const formData = ref({
        name: "",
        email: "",
        phone: "",
        details: "",
      });
  
      const submitForm = async () => {
        if (!formData.value.name || !formData.value.email || !formData.value.phone) {
          alert("Vennligst fyll ut alle feltene!");
          return;
        }
  
        isSubmitting.value = true;
  
        try {
          const response = await axios.post(
            "https://rest.gohighlevel.com/v1/contacts/",
            {
              email: formData.value.email,
              phone: formData.value.phone,
              name: formData.value.name,
              customField: formData.value.details,
              tags: ["Invisalign Quiz Participant"],
              source: "Custom Form Modal",
            },
            {
              headers: {
                Authorization: "Bearer <your-token-here>",
              },
            }
          );
  
          if (response.status === 200 || response.status === 201) {
            alert("Takk! Skjemaet er sendt inn.");
          }
        } catch (error) {
          console.error("Feil ved innsending av skjemaet:", error);
          alert("Det oppstod en feil. Prøv igjen senere.");
        } finally {
          isSubmitting.value = false;
        }
      };
  
      return {
        isSubmitting,
        formData,
        submitForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
  }
  
  .modal-content {
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    max-width: 500px;
    width: 90%;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-input,
  .form-textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  .phone-input {
    display: flex;
    align-items: center;
  }
  
  .flag-icon {
    margin-right: 8px;
  }
  
  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #2563eb;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .submit-button:hover {
    background-color: #1e4eab;
    transform: scale(1.05);
  }
  </style>
  
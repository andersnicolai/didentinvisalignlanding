<template>
  <transition name="fade">
    <div class="modal-backdrop" v-if="visible" @click.self="close">
      <div class="modal-content">
        <!-- Embed HighLevel Form -->
        <iframe
            v-show="!isLoading"
            @load="onIframeLoad"
            src="https://link.onedevconsultancy.com/widget/form/sLWh3xv4s7jOAOxuBWsr"
            style="width:100%;height:100%;border:none;border-radius:20px"
            id="inline-sLWh3xv4s7jOAOxuBWsr"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Invisalign"
            data-height="692"
            data-layout-iframe-id="inline-sLWh3xv4s7jOAOxuBWsr"
            data-form-id="sLWh3xv4s7jOAOxuBWsr"
            title="Invisalign"
        ></iframe>

        <!-- Loading spinner -->
        <div v-if="isLoading" class="loading-spinner"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "HighLevelFormModal",
  setup() {
    const visible = ref(false);
    const isLoading = ref(true);

    // Open the modal and track the event
    const open = () => {
      visible.value = true;

      // Track Meta Pixel event when the form modal opens
      if (window.fbq) {
        fbq('track', 'FormOpen', {
          formName: 'Invisalign',
          category: 'Engagement'
        });
      } else {
        console.error("Facebook Pixel (fbq) not loaded correctly");
      }
    };

    // Close the modal
    const close = () => {
      visible.value = false;
      isLoading.value = true;
    };

    const onIframeLoad = () => {
      isLoading.value = false;
    };

    onMounted(() => {
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && visible.value) {
          close(); // Close modal when Esc is pressed
        }
      });
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Escape" && visible.value) {
          close(); // Remove listener to avoid memory leaks
        }
      });
    });

    return {
      visible,
      isLoading,
      open,
      close,
      onIframeLoad,
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
  background-color: rgba(0, 0, 0, 0.5); /* Transparent backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  width: 95%;
  max-width: 1200px; /* Even wider modal */
  height: 90%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 6px solid rgba(0, 0, 0, 0.1);

<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal-backdrop" v-if="visible" @click.self="close">
        <div class="modal-content">
          <!-- Loading spinner while iframe is loading -->
          <div v-if="isLoading" class="loading-spinner">
            <div class="spinner"></div>
          </div>

          <!-- Embed HighLevel Form -->
          <iframe
            v-show="!isLoading"
            @load="onIframeLoad"
            src="https://link.onedevconsultancy.com/widget/form/sLWh3xv4s7jOAOxuBWsr"
            style="width:100%;height:100%;border:none;border-radius:20px"
            id="inline-sLWh3xv4s7jOAOxuBWsr"
            title="Invisalign"
          ></iframe>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";

export default {
  name: "HighLevelFormModal",
  setup() {
    const visible = ref(false);
    const isLoading = ref(true);

    const open = () => {
      visible.value = true;
    };

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
          close();
        }
      });
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Escape" && visible.value) {
          close();
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999; /* Highest z-index */
}

.modal-content {
  width: 95%;
  max-width: 1200px;
  height: 90%;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  position: relative;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

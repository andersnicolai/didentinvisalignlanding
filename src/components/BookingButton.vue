<template>
  <button
    class="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-5 px-12 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:bg-gradient-to-l hover:shadow-xl hover:-translate-y-1 hover:scale-110"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "BookingButton",
  props: {
    label: {
      type: String,
      default: "Book Now",
    },
    handleClick: {
      type: Function,
      default: null,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
      if (this.handleClick) {
        this.handleClick();
      } else {
        this.defaultClick();
      }
    },
    defaultClick() {
      console.log("Opening form...");
      this.openForm();
    },
    openForm() {
      console.log("Form modal is now open");
      this.$emit("openFormModal");
    },
  },
};
</script>

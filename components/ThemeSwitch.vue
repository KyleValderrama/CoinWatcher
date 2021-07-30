<template lang="">
  <div class="absolute z-100 top-5 -right-4">
    <button
      @click="toggleTheme"
      class="transition dark:text-gray-300 text-yellow-700 transform hover:-translate-x-3 active:ring-4 active:ring-gray-400 rounded-l-full"
    >
      <i
        class="bx p-3 pr-10 m-0 bx-sm dark:bg-black dark:bg-opacity-30 bg-white bg-opacity-30 rounded-l-full"
        :class="[theme === 'dark' ? 'bx-moon' : 'bx-sun']"
      >
      </i>
    </button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({ theme: "getTheme" })
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch("toggleTheme");
    }
  },
  watch: {
    theme(newTheme, oldTheme) {
      newTheme === "light"
        ? document.querySelector("body").classList.remove("dark")
        : document.querySelector("body").classList.add("dark");
    }
  }
};
</script>
<style lang=""></style>

<template lang="">
  <div class="absolute top-0 bottom-0 right-0 left-0">
    <img
      src="https://wallpaperaccess.com/full/212648.jpg"
      class="z-0 h-full w-full absolute top-0 object-cover bottom-0"
    />
    <div
      class="transition duration-500 bg-white dark:bg-black absolute w-screen h-screen opacity-20"
    ></div>
    <div
      class="absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center z-100 bg-red text-8xl font-bold dark:text-gray-200 dark:text-opacity-70 text-black text-opacity-70"
    >
      {{ time }}
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data: () => ({
    time: ""
  }),
  methods: {
    getTime() {
      setInterval(() => {
        this.time = moment().format("LT");
      }, 1000);
    }
  },
  mounted() {
    this.getTime();
  }
};
</script>
<style lang=""></style>

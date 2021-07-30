<template>
  <div id="app">
    <div class="h-screen w-screen relative overflow-hidden flex justify-center">
      <Background />
      <div class="relative w-3/12"></div>
      <SearchCoin />
      <WatchedCoinList />
      <ThemeSwitch />
    </div>
  </div>
</template>
<script>
import Background from "../components/Background.vue";
import WatchedCoinList from "../components/WatchedCoinList.vue";
import ThemeSwitch from "../components/ThemeSwitch.vue";
import SearchCoin from "../components/SearchCoin.vue";

export default {
  components: {
    Background,
    WatchedCoinList,
    ThemeSwitch,
    SearchCoin
  },
  mounted() {
    this.$store.dispatch("initTheme");
    this.$store.dispatch("initWatch");
    this.$store.dispatch("getCoingeckoTrending");
    this.$store.dispatch("getCoingeckoCoins");
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap");
@import url("https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css");
@import url("https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  outline: none;
  font-family: "Nunito";
}
*::-webkit-scrollbar {
  @apply w-1 absolute left-0;
}
*::-webkit-scrollbar-thumb {
  @apply bg-gray-400 bg-opacity-40 rounded-lg;
}
*::-webkit-scrollbar-track {
  @apply bg-transparent;
}
*::-webkit-scrollbar-button {
  display: none;
}
.container {
  @apply transition rounded-lg backdrop-filter text-gray-700 backdrop-blur-lg bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-30 dark:text-gray-200;
}
.input {
  @apply focus:ring-4 focus:ring-gray-500 focus:ring-opacity-20 dark:focus:ring-gray-300 dark:focus:ring-opacity-20;
}
.hover-ring {
  @apply hover:ring-4 hover:ring-gray-500 hover:ring-opacity-20 dark:hover:ring-gray-300 dark:hover:ring-opacity-20;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 750ms ease-in-out;
}

.flip-list-move {
  transition: 0.7s;
}

.ghost {
  opacity: 0.5;
}

.fade-enter {
  opacity: 0;
}
.fade-leave-from,
.fade-leave-to {
  opacity: 0;
}

.spinner > div {
  background: rgba(255, 255, 255, 0.699) !important;
}
</style>

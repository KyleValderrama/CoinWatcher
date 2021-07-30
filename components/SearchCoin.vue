<template lang="">
  <div class="z-20 relative w-6/12 py-10 ">
    <input
      v-model="search"
      type="text"
      class="container placeholder-gray-500 border-0 px-6 py-4 w-full font-bold input"
      placeholder="Search Coin..."
      @focus="focused = true"
      @blur="focused = false"
    />
    <div v-if="search != '' && focused" class="container mt-4 px-1 py-4">
      <div class="max-h-96 overflow-auto ">
        <div
          v-for="(coin, index) in searchCoins"
          :key="index"
          class="px-4 group pr-2 p-2 hover:bg-white flex items-center hover:bg-opacity-40 rounded-md dark:hover:bg-black dark:hover:bg-opacity-40 mx-3 cursor-pointer"
        >
          <div class="flex truncate mr-5 space-x-2">
            <span class="opacity-50">
              {{ coin.name }}
            </span>
            <span class="font-black">
              {{ coin.symbol.toUpperCase() }}
            </span>
          </div>
          <div class="ml-auto">
            <button
              v-if="watch.filter(c => c === coin.id).length === 0"
              @click="watchCoin(coin.id)"
              class="opacity-0 hover:ring-gray-500 hover:ring-2 transition hover:ring-opacity-20 group-hover:opacity-100 px-3 rounded-md p-2 dark:hover:ring-gray-300 dark:hover:ring-opacity-20 text-xs font-semibold flex items-center gap-x-2"
            >
              Watch
              <i class="bx bxs-show bx-xs" />
            </button>
            <button
              v-else
              class=" hover:ring-gray-500 hover:ring-2 transition hover:ring-opacity-20 group-hover:opacity-100 px-3 rounded-md p-2 dark:hover:ring-gray-300 dark:hover:ring-opacity-20 text-xs font-semibold flex items-center gap-x-2"
            >
              Watched
              <i class="bx bxs-show bx-xs" />
            </button>
          </div>
        </div>
        <div v-if="filterCoins.length === 0" class="text-center font-black">
          No Results Found
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    filterCoins: []
  }),
  computed: {
    ...mapGetters({
      coins: "getCoins",
      watch: "getWatchedCoins"
    }),
    searchCoins() {
      this.filterCoins = this.coins.filter(
        c =>
          c.name.toLowerCase().includes(this.search.toLowerCase()) ||
          c.symbol.toLowerCase().includes(this.search.toLowerCase())
      );
      return this.filterCoins.length > 20
        ? this.filterCoins.slice(0, 19)
        : this.filterCoins;
    }
  },
  methods: {
    watchCoin(id) {
      this.$store.dispatch("watchCoin", id);
    }
  }
};
</script>
<style lang=""></style>

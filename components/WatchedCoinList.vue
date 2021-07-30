<template lang="">
  <div class="relative z-0 w-3/12 py-32 px-10">
    <div class="h-full px-2 overflow-auto relative">
      <div class="absolute -top-10 z-100 block">
        <button class="container w-10 h-10 ">Test</button>
      </div>
      <draggable v-model="watch" v-bind="dragOptions">
        <transition-group tag="div" name="flip-list" class="space-y-4 my-2">
          <div
            v-for="(coins, index) in watch"
            :key="coins"
            class="container px-2 py-3 relative h-20 overflow-hidden hover-ring "
          >
            <transition name="fade">
              <div
                v-if="loading"
                class="flex items-center justify-center my-2 absolute right-0 left-0"
              >
                <Jumper color="#fff"></Jumper>
              </div>
            </transition>
            <transition name="fade">
              <div
                v-if="!loading"
                class="flex items-center space-x-4 group cursor-pointer "
              >
                <button
                  @click="unwatchCoin(index)"
                  class="transition text-xs absolute text-white px-3 py-1 top-2 right-2 opacity-0 hover:bg-red-800 group-hover:opacity-100 bg-black bg-opacity-40 rounded-xl"
                >
                  Unwatch
                </button>
                <img
                  alt=""
                  :src="getWatchCoinData(coins).image.small || null"
                  class="h-5 w-5 rounded-full"
                  :class="{ loading: `hidden` }"
                />
                <div>
                  <span class="">
                    {{ getWatchCoinData(coins).name }}
                    <span class="font-black">{{
                      getWatchCoinData(coins.id).symbol.toUpperCase()
                    }}</span>
                  </span>
                  <div class="font-black text-2xl" v-if="!loading">
                    {{
                      `₱` +
                        getWatchCoinData(coins).market_data.current_price.php
                    }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Jumper } from "vue-loading-spinner";
import draggable from "vuedraggable";

export default {
  data: () => ({
    loading: false,
    watchedCoins: []
  }),
  components: {
    Jumper,
    draggable
  },
  computed: {
    ...mapGetters({
      coins: "getCoins",
      watchedCoin: "getWatchedCoins"
    }),
    watch: {
      get() {
        return this.watchedCoin;
      },
      set(value) {
        this.$store.dispatch("sortCoin", value);
      }
    },
    dragOptions() {
      return {
        animation: 0,
        disabled: false,
        group: "coins",
        ghostClass: "ghost",
        dragClass: "ghost"
      };
    }
  },
  mounted() {
    this.getWatchCoinPrice();
    this.getCoinInfo();
  },
  methods: {
    getCoinInfo() {
      this.loading = true;
      var coins = [];
      this.watch.forEach(c => {
        this.$axios
          .$get(`https://api.coingecko.com/api/v3/coins/${c}`)
          .then(res => {
            setTimeout(() => {
              coins.push({
                id: c,
                data: res,
                price: res.market_data.current_price.php
              });
              this.loading = false;
            }, 1000);
          });
      });
      this.watchedCoins = coins;
    },
    getWatchCoinPrice() {
      setInterval(() => {
        this.watchedCoins.map((c, index) => {
          this.$axios
            .$get(`https://api.coingecko.com/api/v3/coins/${c.id}`)
            .then(res => {
              c.data = res;
            });
        });
      }, 2000);
    },
    getWatchCoinData(coin) {
      var c = this.watchedCoins.filter(c => c.id == coin)[0] || {
        id: "",
        data: {
          symbol: "",
          image: {
            small: ""
          },
          market_data: {
            current_price: {
              php: ""
            }
          }
        },
        price: ""
      };
      return c.data;
    },
    unwatchCoin(index) {
      this.$store.dispatch("unwatchCoin", index);
    }
  },
  watch: {
    watch() {
      this.getCoinInfo();
    }
  }
};
</script>
<style lang=""></style>

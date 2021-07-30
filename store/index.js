import Vue from "vue";
import vuex from "vuex";

const coingeckoApi = "https://api.coingecko.com/api/v3";

Vue.use(vuex);

export default {
  state: {
    theme: {},
    searched: [],
    trending: [],
    coins: [],
    watch: [],
    currencies: []
  },
  getters: {
    getTheme: state => {
      return state.theme;
    },
    getTrending: state => {
      return state.trending;
    },
    getCoins: state => {
      return state.coins;
    },
    getWatchedCoins: state => {
      return state.watch;
    },
    getCurrencies: state => {
      return state.currencies;
    }
  },
  actions: {
    initTheme: ({ commit }) => {
      const cachedTheme = localStorage.theme ? localStorage.theme : false;
      if (cachedTheme) commit("setTheme", cachedTheme);
      else commit("setTheme", "dark");
    },
    initWatch: ({ commit }) => {
      const watchedCoins = localStorage.watch
        ? JSON.parse(localStorage.watch)
        : [];
      commit("setInitWatch", watchedCoins);
    },
    toggleTheme({ commit }) {
      switch (localStorage.theme) {
        case "light":
          commit("setTheme", "dark");
          break;

        default:
          commit("setTheme", "light");
          break;
      }
    },
    async getCoingeckoTrending({ commit }) {
      this.$axios
        .get(`${coingeckoApi}/search/trending`)
        .then(res => {
          commit("setTrending", res.data.coins);
        })
        .catch(e => {
          console.log(e);
        });
    },
    async getCoingeckoCoins({ commit }) {
      this.$axios
        .get(`${coingeckoApi}/coins/list`)
        .then(res => {
          commit("setCoins", res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    watchCoin({ commit, state }, id) {
      commit("setWatch", id);
      localStorage.setItem("watch", JSON.stringify(state.watch));
    },
    unwatchCoin({ commit, state }, index) {
      commit("unwatch", index);
      localStorage.setItem("watch", JSON.stringify(state.watch));
    },
    sortCoin({ commit }, data) {
      commit("setInitWatch", data);
      localStorage.setItem("watch", JSON.stringify(data));
    }
  },
  mutations: {
    setTheme: (state, data) => {
      state.theme = data;
      localStorage.theme = data;
    },
    setTrending: (state, data) => {
      state.trending = data;
    },
    setCoins: (state, data) => {
      state.coins = data;
    },
    setWatch: (state, data) => {
      state.watch.unshift(data);
    },
    unwatch: (state, data) => {
      state.watch.splice(data, 1);
    },
    setInitWatch: (state, data) => {
      state.watch = data;
    },
    setCurrencies: (state, data) => {
      state.currencies = data;
    }
  }
};

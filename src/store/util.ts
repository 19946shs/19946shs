import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import { createStore, Store } from 'vuex'

const util = new Vuex.Store({
  state: {
    preloaderActive: false,
    usermenuActive: false,
    isLoaded: false,
    cartItems: ([] as any)
  },
  mutations: {
    changePreloaderActiveState (state, payload) {
      state.preloaderActive = payload
    },
    changeUserMenuActiveState (state) {
      state.usermenuActive = !state.usermenuActive
    },
    addItemToCart (state, payload) {
      state.cartItems.push(payload)
    },
    toggleIsLoaded (state, payload) {
      state.isLoaded = payload
    }
  },
  actions: {
    changePreloaderActiveState (context, payload) {
      context.commit('changePreloaderActiveState', payload)
    },
    changeUserMenuActiveState (context) {
      context.commit('changeUserMenuActiveState')
    },
    addItemToCart (context, payload) {
      context.commit('addItemToCart', payload)
    },
    toggleIsLoaded (context, payload) {
      context.commit('toggleIsLoaded', payload)
    }
  },
  getters: {
    preloaderActiveState: (state) => {
      return state.preloaderActive
    },
    userMenuActiveState: (state) => {
      return state.usermenuActive
    },
    getIsLoaded: (state) => {
      return state.isLoaded
    },
    getCartItems: (state) => {
      return state.cartItems
    }
  }
})

export default util

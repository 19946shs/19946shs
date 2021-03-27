import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import { createStore, Store } from 'vuex'

const store = new Vuex.Store({
  state: {
    userInformation: null,
    loggingIn: false,
    loggedIn: false,
    popupActive: false,
    temporaryItem: null
  },
  mutations: {
    login (state, payload) {
      state.loggedIn = true
      state.userInformation = payload
    },
    attemptLogin (state) {
      state.loggingIn = true
    },
    finishAttemptLogin (state) {
      state.loggingIn = false
    },
    changePopupState (state) {
        state.popupActive = !state.popupActive
    },
    changeTemporaryItem(state, payload) {
        state.temporaryItem = payload
    } 
  },
  actions: {
      changePopupState (context) {
        context.commit('changePopupState')
      },
      changeTemporaryItem(context, payload) {
          context.commit('changeTemporaryItem', payload)
      }
  },
  getters: {
    loggedIn: (state) => {
      return state.loggedIn
    },
    popupActiveState: (state) => {
      return state.popupActive
    },
    getTemporaryItem: (state) => {
        return state.temporaryItem
    }
  }
})

export default store

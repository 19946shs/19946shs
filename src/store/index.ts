import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import { createStore, Store } from 'vuex'
import router from '@/router'

const store = new Vuex.Store({
  state: {
    userInformation: null,
    loggingIn: false,
    loggedIn: false,
    popupActive: false,
    temporaryItem: null,
  },
  mutations: {
    login (state, payload) {
      state.loggedIn = true
      state.userInformation = payload
    },
    logout (state) {
      state.loggedIn = false
      state.userInformation = null
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
    attemptLoginAction(context) {
      context.commit('attemptLogin')
    },
    finishAttemptLoginAction(context) {
      context.commit('finishAttemptLogin')
    },
    loginAction(context, payload) {
      window.localStorage.setItem('displayName', '')
      window.localStorage.setItem('email', '')
      window.localStorage.setItem('photoURL', '')
      window.localStorage.setItem('uid', '')
      window.localStorage.setItem('token', '')
      context.commit('login', payload)
    },
    logoutAction(context) {
      context.commit('logout')
    },
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
    loggingIn: (state) => {
      return state.loggingIn
    },
    loggedInUser: (state) => {
      return state.userInformation
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

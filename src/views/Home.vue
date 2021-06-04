<template>
  <div :class="`${cssPrefix}__container`">
    <div :class="`${cssPrefix}__title`"><img id="logo_id" src="assets/icon/audaciteelogo.png"/></div>
    <div :class="popupActiveState || loaderActiveState || userMenuActiveState ? `${cssPrefix}__title_blur` : `${cssPrefix}__title_bar`">
      <img :class="`${cssPrefix}__icon`" id="profile_icon" src="assets/ui-buttons/user.svg" @click="toggleMenu"/>
      <img v-if="!isLoaded" :class="`${cssPrefix}__icon`" id="cart_icon" src="assets/ui-buttons/cart.svg" @click="goToCheckout"/>
      <img v-if="isLoaded" :class="`${cssPrefix}__icon`" id="cart_icon" src="assets/ui-buttons/cart_loaded.svg" @click="goToCheckout"/>
    </div>
    <div :class="popupActiveState || loaderActiveState || userMenuActiveState ? `${cssPrefix}__content_container_blur` : `${cssPrefix}__content_container`">
      <slide-up-panel style="height: 500px; border-top-left-radius: 10px; border-top-right-radius: 10px;" @loaded="onLoad"></slide-up-panel>
      <section style="height: 100%; margin-top: 40px">
        <slide-up-panel-secondary :class="`${cssPrefix}__slider_container`" style="height: 100%"></slide-up-panel-secondary>
      </section>
      <section>
        <div :class="`${cssPrefix}__footer`">
          <div class="subtext"></div>
          <div class="subtext"></div>
          <div class="subtext"></div>
          <div class="subtext"></div>
        </div>
      </section>
    </div>
    <popup-component v-if="popupActiveState"></popup-component>
    <preloader-component v-if="loaderActiveState"></preloader-component>
    <user-menu-popup-component v-if="userMenuActiveState" :user="user" :height="400"></user-menu-popup-component>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import store from '@/store'
import util from '@/store/util'
import firebase from 'firebase'
import { defineComponent } from 'vue'
import { firebaseConfig } from '@/variables/variables'
import PopupComponent from '@/components/popup-component.vue'
import SlideUpPanel from './slide-up-panel-view/slide_up_component.vue'
import SlideUpPanelSecondary from './slide-up-panel-view-secondary/slide_up_component_secondary.vue'
import UserMenuPopupComponent from '@/components/usermenupopup-component.vue'
import PreloaderComponent from '@/components/preloader-component.vue'
import { useRoute } from 'vue-router'
import {version} from '../../package.json';

export default defineComponent({
  name: 'Home',
  data() {
      return {
          cssPrefix: 'home_view',
          axios: axios,
          store: store,
          util: util,
          localStorage: localStorage,
          firebaseConfig: firebaseConfig,
          user: {
            uid: '',
            photoURL: '',
            displayName: '',

          }
      }
  },
  components: {
    PopupComponent,
    SlideUpPanel,
    SlideUpPanelSecondary,
    UserMenuPopupComponent,
    PreloaderComponent,
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonToolbar
  },
  computed: {
    popupActiveState: {
      get: () => {
        return store.getters.popupActiveState
      },
      set: () => {
        store.dispatch('changePopupState')
      }
    },

    loaderActiveState: {
      get: () => {
        return util.getters.preloaderActiveState
      },
      set: (payload) => {
        store.dispatch('changePreloaderActiveState', payload)
      }
    },

    userMenuActiveState: {
      get: () => {
        return util.getters.userMenuActiveState
      },
      set: () => {
        store.dispatch('changeUserMenuActiveState')
      }

    },
    isLoaded: {
      get: () => {
        return util.getters.getIsLoaded
      },
      set: (payload) => {
        store.dispatch('toggleIsLoaded', payload)
      }
    },

    cartItemRef: {
      get() {
          return firebase.database().ref(`users/${localStorage.getItem('uid')}/cart_items`)
      },
      set() {
          console.log()
      }
    }
  },
  mounted() {
    if(this.$route.params.openMenu?.toString() === 'yeah') this.toggleMenu()
    this.util.dispatch('changePreloaderActiveState', true)

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        console.warn('Hello ', user.displayName)
      } else {
        this.$router.push('/login')
      }
    })

    console.log('Backstreet Boys :: ', this.$route.query.receipt)

    this.user.uid = this.localStorage.uid
    this.user.photoURL = this.localStorage.photoURL
    this.user.displayName = this.localStorage.displayName

    //check if cart items are empty
    this.cartItemRef.on('value', (snapshot: any) => {
      const addedItems: any[] = []
      snapshot.forEach((value: any) => {
        addedItems.push(value.val().units)
      })
      addedItems.some((item, key) => {
        return item > 0
      }) ? this.util.dispatch('toggleIsLoaded', true) : this.util.dispatch('toggleIsLoaded', false)
    })
    // if(this.$route.params.isNewUser) {
        // this.showTutorialRef.set(true)
    // }

    const route = useRoute()
    window.caches.keys().then(res => {
      console.log('Pearl Jam :: ', res)
    })
    if(this.store.getters.getIsNewUser) {
      firebase.database().ref(`users/${this.user.uid}/isShowTutorial`).set(true)
    }
  },
  methods: {
    toggleMenu() {
      this.checkIfLoggedIn('usermenu')
    },
    goToCheckout() {
      this.checkIfLoggedIn('checkout')
    },
    checkIfLoggedIn(uMenuOrCheckout: string) {
      this.util.dispatch('changePreloaderActiveState', true)
      switch(uMenuOrCheckout) {
        case 'usermenu': {
          this.util.dispatch('changePreloaderActiveState', false)
          this.util.dispatch('changeUserMenuActiveState')
          break
        }
        case 'checkout': {
          this.util.dispatch('changePreloaderActiveState', false)
          this.$router.push('/cart')
        }
      }
    },
    onLoad() {
      this.util.dispatch('changePreloaderActiveState', false)
    }
  }
});
</script>

<style lang="scss">

#logo_id {
  width: 400px;
  height: 100px;
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

.home_view__container {
  background: var(--ion-color-secondary);
  height: 100%;
}

.home_view__container_blur {
  background: var(--ion-color-secondary);
  height: 100%;
  filter: blur(10px);
}

.home_view__title {
  width: 100%;
  height: 100px;
  text-align: center;
  color: var(--ion-color-secondary);
  background: var(--ion-color-primary);
}

.home_view__title_bar {
  width: 100%;
  height: 60px;
  display: flex;
  padding: 10px;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--ion-color-primary);
  background: var(--ion-color-secondary);
  position: sticky;
  justify-content: flex-end;
}

.home_view__title_blur {
  filter: blur(30px);
  background: #000000;
}

.home_view__content_container {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.home_view__content_container_blur {
  width: 100%;
  height: 100%;
  filter: blur(30px);
  background: #000000;
}

.home_view__icon {
  width: var(--ion-icon-size-desktop);
  height: var(--ion-icon-size-desktop);
  margin-right: 10px;
  margin-left: 10px;
}

.blur_effect {
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(10px);
}

.home_view__footer {
  width: 100%;
  height: 250px;
  background: black;
}

@media only screen and (max-width: 800px) { 
  #logo_id {
    width: 400px;
    height: 100px;
  }

  .home_view__title {
    height: 100px;
  }

  .home_view__title_bar {
    justify-content: space-between;
  }
}

@media only screen and (max-width: 399px) { 
  #logo_id {
    width: 200px;
    height: 50px;
  }

  .home_view__title {
    height: 50px;
  }
}

@media only screen and (max-width: 190px) { 
  #logo_id {
    display: none;
  }

  .home_view__title {
    height: 50px;
  }
}
</style>
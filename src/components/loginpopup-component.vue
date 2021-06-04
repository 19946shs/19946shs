<template>
    <!-- <div :class="loaderActiveState ? `${cssPrefix}__content_container_blur` : `${cssPrefix}__container`"> -->
    <ion-app>
        <div :class="`${cssPrefix}__container`">
            <div :class="loaderActiveState ? `${cssPrefix}__login_button_blur` : `${cssPrefix}__login_button`" >
                <aud-button-primary style="margin: auto"  @button-clicked="login" :buttonText="'LOGIN'"></aud-button-primary>
            </div>
<!-- 
            <div :class="`${cssPrefix}__login_button`" @click="login">
                LOGIN
            </div> -->
        </div>
        <generic-popup-component v-if="warningState && isLoginClick" :primaryDisplayText="warningText" :height="'200px'"></generic-popup-component>
        <preloader-component v-if="loaderActiveState"></preloader-component>
    </ion-app>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .loginpopup-component {
        &__container {
            height: 100%;
            width: 100%;
            background: var(--ion-color-secondary);
            display: table-cell;
            position: relative;
            vertical-align: middle;
            margin: auto;
        }
 
        &__login_button {
            top: 50%;
            width: 100px;
            text-align: center;
            position: relative;
            justify-content: center;
            text-align: center;
            margin: auto;
        }

        &__login_button_blur {
            top: 50%;
            width: 100px;
            text-align: center;
            position: relative;
            justify-content: center;
            text-align: center;
            margin: auto;
            filter: blur(30px);
            background: #000000;
        }

        &__slider {
            width: 100%;
            height: 300px;
        }

        &__img {
            height: 350px;
            width: 350px;
            border-radius: 20px;
        }

        &__details {
            color: var(--ion-color-primary);
            margin: 10px;
        }

        &__content_container_blur {
          background: var(--ion-color-secondary);
          height: 100%;
          filter: blur(10px);
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import firebase from 'firebase';
import router from '@/router'
import PreloaderComponent from '@/components/preloader-component.vue'
import { IonApp } from '@ionic/vue';
import { firebaseConfig } from '@/variables/variables'
import AudButtonPrimary from '@/components/ui-components/aud-button-primary.vue'
import GenericPopupComponent from '@/components/genericpopup-component.vue'

require('dotenv/config')

export default defineComponent({
    name: 'LoginPopupComponent',
    components: {
        IonApp,
        PreloaderComponent,
        AudButtonPrimary,
        GenericPopupComponent
    },
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },

    },
    computed: {
        item: {
            get: () => {
              return store.getters.getTemporaryItem
            },
            set: (payload: any) => {
              store.dispatch('changeTemporaryItem', payload)
            }
        },

        loaderActiveState: {
            get: () => {
              return util.getters.preloaderActiveState
            },
            set: (payload: any) => {
              store.dispatch('changePreloaderActiveState', payload)
            }
        },
    },
    data() {
        return {
            cssPrefix: 'loginpopup-component',
            store: store,
            util: util,
            router: router,
            isLoginClick: false,
            warningState: false,
            warningText: ''
        }
    },
    mounted() {
        this.util.dispatch('changePreloaderActiveState', true)
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        firebase.auth()
        .getRedirectResult()
        .then((result: any) => {
            this.warningState = false;

            const credential: firebase.auth.OAuthCredential = result.credential;
            const token = credential.accessToken;
            
            // // The signed-in user info.
            const user: any = result.user;
            this.store.dispatch('finishAttemptLoginAction')
            this.store.dispatch('loginAction', {
                displayName: user.displayName,
                email: user.email

            })

            console.log('Metallica :: ', result.additionalUserInfo.isNewUser)

            // if(result.additionalUserInfo.isNewUser) {
            //     firebase.database().ref(`users/${user.uid}/isShowTutorial`).set(true)
            // }
            this.store.dispatch('changeIsNewUser', result.additionalUserInfo.isNewUser)

            window.localStorage.setItem('displayName', JSON.stringify(user.displayName))
            window.localStorage.setItem('email', JSON.stringify(user.email))
            window.localStorage.setItem('photoURL', JSON.stringify(user.photoURL))
            window.localStorage.setItem('uid', JSON.stringify(user.uid))
            window.localStorage.setItem('token', JSON.stringify(token))
            window.localStorage.setItem('isNewUser', JSON.stringify(result.additionalUserInfo.isNewUser))
            this.util.dispatch('changePreloaderActiveState', false)
            // if (this.$route.params.nextUrl?.toString()) this.$router.push({ path: this.$route.params.nextUrl?.toString() })
            // else if (this.$route.params.openMenu?.toString() === 'yeah') this.$router.push({ path: '/home', params: { openMenu: 'yeah' } })
            // else this.$router.push('/')
            this.$router.push({ path: '/home', params: { isNewUser: result.additionalUserInfo.isNewUser } })
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            this.warningState = false;
            this.warningText = `${errorCode} :: ${errorMessage} :: ${email}`
            this.store.dispatch('finishAttemptLoginAction')
            console.log('Ice Cube:: ', error)
            this.util.dispatch('changePreloaderActiveState', false)
        });
    },
    methods: {
        closePopup() {
            this.item = {}
        },

        login() {
            // this.isLoginClick = true
            this.util.dispatch('changePreloaderActiveState', true)
            if(!this.store.getters.loggingIn) {
                const provider = new firebase.auth.GoogleAuthProvider()
                this.store.dispatch('attemptLoginAction')
                firebase.auth().signInWithRedirect(provider)
                this.util.dispatch('changePreloaderActiveState', false)
            }
        }
    }
})
</script>

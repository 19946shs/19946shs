<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`" @click="closePopup"></div>
        <div :class="`${cssPrefix}__popup`" :style="{height: this.height, width: this.width}">
            <div :class="`${cssPrefix}__menu`">
                <div :class="`${cssPrefix}__menu_item`" @click="goToAccount">{{displayName}}</div>
                <div :class="`${cssPrefix}__menu_item`" @click="ordereditems">Orders</div>
                <div :class="`${cssPrefix}__menu_item`" @click="goToBuyAgain">Buy again</div>
                <div :class="`${cssPrefix}__menu_item`" @click="goToWishlist">Wishlist</div>
                <div :class="`${cssPrefix}__menu_item`" @click="goToEnquiry">Enquiry</div>
                <div :class="`${cssPrefix}__menu_item`" @click="logout">Log out</div>
            </div>
        </div>
        <div class="close_button" @click="closePopup">
            <img src="assets/ui-buttons/close-button.svg"/>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .usermenupopup-component {
        &__container {
            top: 20px;
            height: 100%;
            width: 100%;
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
        }

        &__blur {
            -webkit-filter: blur(10px);
            -moz-filter: blur(10px);
            -ms-filter: blur(10px);
            -o-filter: blur(10px);
            filter: blur(10px);
            position: fixed;
            height: 100%;
            width: 100%;
        }

        &__popup {
            z-index: 98;
            padding: 20px;
            border-radius: 20px;
            text-align: left;
            background: var(--ion-color-secondary);
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
        }

        &__close_button {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }

        &__menu {
            margin: 20px;
            font-size: 24px;
            display: flex;
            flex-direction: column;
            color: var(--ion-color-primary);
        }

        &__menu_item {
            width: 100%;
            margin-bottom: 20px;
        }
        
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import firebase from 'firebase'
import { firebaseConfig } from '@/variables/variables'

export default defineComponent({
    name: 'UserMenuPopupComponent',
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        user: { required: true, default: {
            uid: '',
            photoUrl: '',
            displayName: ''
        } }
    },
    computed: {
        item: {
            get: () => {
              return store.getters.getTemporaryItem
            },
            set: (payload: any) => {
              store.dispatch('changeTemporaryItem', payload)
            }
        }
    },
    data() {
        return {
            cssPrefix: 'usermenupopup-component',
            store: store,
            util: util,
            displayName: '',
            user_: {
                uid: '',
                photoUrl: '',
                displayName: ''
            }
        }
    },
    mounted() {

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        const ref = firebase.database().ref('users/')
        ref.once('value').then((snapshot) => {
          console.log('Motley Crue:: ', this.user_.uid.toString())
        })

        this.displayName = this.user.displayName.replaceAll('"', '')
    },
    methods: {
        closePopup() {
            this.item = {}
            this.util.dispatch('changeUserMenuActiveState')
        },
        goToAccount() {
            console.log('Missy Elliot:: clicked')
        },
        ordereditems() {
            this.$router.push('/ordereditems')
        },
        goToBuyAgain() {
            console.log('Missy Elliot:: clicked')
        },
        goToWishlist() {
            console.log('Missy Elliot:: clicked')
        },
        goToEnquiry() {
            console.log('Missy Elliot:: clicked')
        },
        logout() {
            console.log('Missy Elliot:: ')
            firebase.auth().signOut().then(() => {
                // this.store.dispatch('logoutAction')
                this.closePopup()
            }).catch((error) => {
                this.closePopup()
                console.log(error)
            })
        }
    }
})
</script>

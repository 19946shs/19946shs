<template>
    <div :class="`${cssPrefix}__container` ">
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__title_blur` : `${cssPrefix}__title_bar`">
          <img :class="`${cssPrefix}__icon`" id="previous_icon" src="assets/ui-buttons/previous.svg" @click="goBack"/>
        </div>
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__title_text_blur` : `${cssPrefix}__title_text_bar`">
          <div :class="`${cssPrefix}__title_text`">ORDERS</div>
        </div>
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__content_blur` : `${cssPrefix}__content`">
           <div :class="`${cssPrefix}__cart_item`" v-for="item in orderedItemsList" :key="item.id">
               <div :class="`${cssPrefix}__cart_item_inner`">
                   <div :class="`${cssPrefix}__cart_item_inner__text__container`">
                        <span :class="`${cssPrefix}__cart_item_inner__text`">Receipt ID: {{item.receipt}}</span>
                        <div style="display: flex; flex-direction: row;">
                            <div class="subtext"><p>₹ {{item.price}}</p></div>
                        </div>
                        <!-- <span :class="`${cssPrefix}__cart_item_inner__text`">₹ {{item.price}}</span> -->
                   </div>
               </div>
           </div>
        </div>
        <preloader-component v-if="loaderActiveState"></preloader-component>
        <generic-popup-component v-if="!loaderActiveState && warningState" :warningText="warningText" :height="400"></generic-popup-component>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .orders-list-view {
        &__container {
            height: 100%;
            width: 100%;
            margin: auto;
            overflow: hidden;
            background: var(--ion-color-secondary);
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

        &__content {
            width: 50%;
            margin: auto;
            padding: 20px;
            overflow: auto;
            margin-top: 110px;
            padding-bottom: 150px;
            height: calc(100vh - 50px);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0px 0px 20px 0px #000000 ;
            background: var(--ion-color-secondary);
        }

        &__content_blur {
            width: 50%;
            margin: auto;
            padding: 20px;
            overflow: auto;
            margin-top: 110px;
            filter: blur(30px);
            padding-bottom: 150px;
            height: calc(100vh - 50px);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0px 0px 20px 0px #000000 ;
            background: var(--ion-color-secondary);
        }

        &__popup {
            z-index: 98;
            padding: 20px;
            border-radius: 20px;
            text-align: left;
            background: var(--ion-color-secondary);
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
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

        &__cart_item {
            width: 100%;
            height: 125px;
            display: flex;
            padding-top: 25px;
            padding-bottom: 25px;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            border-bottom: dotted var(--ion-color-primary-shade);
        }

        &__cart_item_inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            &__text__container {
                display: flex;
                flex-direction: column;
            }

            &__text {
            }

            &__counter {
            }
        }

        &__footer {
            width: 50%;
            bottom: 0px;
            height: 75px;
            left: 25%;
            padding: 20px;
            cursor: pointer;
            position: absolute;
            display: table-cell;
            vertical-align: middle;
            color: var(--ion-color-secondary);
            box-shadow: var(--ion-box-shadow);
            background: var(--ion-color-primary);
            border-top-left-radius: var(--ion-border-radius);
            border-top-right-radius: var(--ion-border-radius);
        }

        &__footer_blur {
            width: 50%;
            bottom: 0px;
            height: 75px;
            left: 25%;
            padding: 20px;
            cursor: pointer;
            position: absolute;
            filter: blur(30px);
            display: table-cell;
            background: #000000;
            vertical-align: middle;
            color: var(--ion-color-secondary);
            box-shadow: var(--ion-box-shadow);
            background: var(--ion-color-primary);
            border-top-left-radius: var(--ion-border-radius);
            border-top-right-radius: var(--ion-border-radius);
        }

        &__title_text {
            margin: auto;
            color: var(--ion-color-primary);
            font-size: 36px;
            font-family: 'RobotoMono-Bold', monospace;
            font-weight: bold;
        }

        &__title_bar {
            top: 0px;
            width: 100%;
            height: 80px;
            display: flex;
            padding: 10px;
            position: fixed;
            margin-bottom: 20px;
            padding-top: 20px;
            flex-direction: row;
            padding-bottom: 20px;
            color: var(--ion-color-primary);
            background: var(--ion-color-secondary);
            border-bottom: solid var(--ion-color-primary);
        }

        &__title_text_bar {
            top: 0px;
            width: 100%;
            height: 80px;
            display: flex;
            position: fixed;
            background: none;
            margin-bottom: 20px;
            flex-direction: row;
            pointer-events: none;
            color: var(--ion-color-primary);
        }

        &__title_text_blur {
            top: 0px;
            width: 100%;
            height: 80px;
            display: flex;
            position: fixed;
            filter: blur(30px);
            margin-bottom: 20px;
            flex-direction: row;
            pointer-events: none;
            background: #000000;
        }

        &__title_bar {
            top: 0px;
            width: 100%;
            height: 80px;
            display: flex;
            padding: 10px;
            position: fixed;
            margin-bottom: 20px;
            padding-top: 20px;
            flex-direction: row;
            padding-bottom: 20px;
            color: var(--ion-color-primary);
            background: var(--ion-color-secondary);
            border-bottom: solid var(--ion-color-primary);
        }

        &__title_blur {
            filter: blur(30px);
            background: #000000;
        }

        &__icon {
            width: var(--ion-icon-size-desktop);
            height: var(--ion-icon-size-desktop);
            box-shadow: var(ion-box-shadow);
            margin-right: 10px;
            margin-left: 10px;
        }

        &__icon_checkout {
            width: 24px;
            height: 24px;
            margin: auto;
            margin-left: 10px;
            vertical-align: middle;
            box-shadow: var(ion-box-shadow);
        }

        &__cart_item_inner__checkout_text__container {
            width: 100%;
        }

        &__cart_item_inner__text_checkout{
            font-size: 24px;
            font-weight: bold;
            font-family: 'RobotoMono-Bold', monospace;
        }

        &__cart_item_inner__text_checkout_off{
            font-size: 16px;
            margin: auto;
        }
    }

@media only screen and (max-width: 800px) { 
    .orders-list-view {
        &__container {
            width: 100%;
            background: var(--ion-color-secondary);
        }

        &__content {
            width: 100%;
        }

        &__footer {
            left: 0px;
            margin: auto;
            width: 100%;
        }
    }
}
</style>

<script lang="ts">
import axios from 'axios'
import store from '@/store'
import util from '@/store/util'
import firebase from 'firebase'
import { defineComponent } from 'vue'
import { firebaseConfig } from '@/variables/variables'
import PreloaderComponent from '@/components/preloader-component.vue'
import GenericPopupComponent from '@/components/genericpopup-component.vue'
declare const Razorpay: Function | any

export default defineComponent({
    name: 'OrdersListView',
    data() {
        return {
            cssPrefix: 'orders-list-view',
            util: util,
            store: store,
            itemsInTheCart: [],
            currentlySelectedSizeId: 0,
            orderedItemsList: ([] as any),
            totalPriceInCart: 0,
            totalPriceOff: 0,
            apiURL: 'https://audaciteeapiserver.herokuapp.com/pay',
            user: ('' as string | null),
            email: ('' as string | null),
            uid: ('' as string | null),
            orderState: false,
            warningState: false,
            warningText: 'You have not ordered anything yet'
        }
    },
    components: {
        PreloaderComponent,
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

        cartItemRef: {
            get() {
                return firebase.database().ref(`users/${localStorage.getItem('uid')}/cart_items`)
            },
            set() {
                console.log()
            }
        },

        orderedItemRef: {
            get() {
                return firebase.database().ref(`users/${localStorage.getItem('uid')}/ordered_items`)
            },
            set() {
                console.log()
            }
        },

        itemRef: {
            get() {
                return firebase.database().ref(`items/plaintees`)
            },
            set() {
                console.log()
            }
        }
    },
    mounted() {
        this.util.dispatch('changePreloaderActiveState', true)

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                console.warn('Hello ', user.displayName)
                this.user = user?.displayName
                this.email = user?.email,
                this.uid = user?.uid
            } else {
                this.$router.push('/login')
            }
        })

        this.getCartItemsAndRemoveZeroUnitsFromList()
        
    },
    methods: {
        closePopup() {
            this.item = {}
            store.dispatch('changePopupState')
        },
        goBack() {
            this.$router.go(-1)
        },
        getCartItemsAndRemoveZeroUnitsFromList() {
            this.orderedItemRef.once('value', (snapshot: any) => {
                this.util.dispatch('changePreloaderActiveState', false)
                this.totalPriceInCart = 0
                this.totalPriceOff = 0
                this.orderedItemsList = []
                let index = 0
                snapshot.forEach((item: any) => {
                    this.orderedItemsList.push({
                        receipt: item.key,
                        items: item.val(),
                        price: item.val().price,
                        id: index
                    })
                    index += 1
                    // if(item.val()['units'] > 0) {
                    //     this.itemRef.child(item.key).once('value', (snapshot2: any) => {
                    //         const data: any[any] = []
                    //         snapshot2.forEach((itemInner: any) => {
                    //             data[itemInner.key] = itemInner.val()
                    //         })
                    //         data['unitsincart'] = item.val()['units']
                    //         data['id'] = index
                    //         data['trueid'] = item.key
                    //         this.totalPriceInCart += data['price'] * item.val()['units']
                    //         this.totalPriceOff += data['off'] * item.val()['units']
                    //         this.orderedItemsList.push(data)
                    //         index += 1
                    //     })
                    // } else {
                    //     this.cartItemRef.child(item.key).remove()
                    // }
                    console.log('Lynrd Skynrd :: ', item.key, item.val())
                })

                if (!this.orderedItemsList.length) {
                    this.warningState = true
                }
            })
        }
    }
})
</script>

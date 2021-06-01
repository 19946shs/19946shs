<template>
    <div :class="`${cssPrefix}__container` ">
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__title_blur` : `${cssPrefix}__title_bar`">
          <img :class="`${cssPrefix}__icon`" id="previous_icon" src="assets/ui-buttons/previous.svg" @click="goBack"/>
        </div>
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__title_text_blur` : `${cssPrefix}__title_text_bar`">
          <div :class="`${cssPrefix}__title_text`">CART</div>
        </div>
        <div :class="loaderActiveState || warningState ? `${cssPrefix}__content_blur` : `${cssPrefix}__content`">
           <div :class="`${cssPrefix}__cart_item`" v-for="item in cartItemsList" :key="item.id">
               <div :class="`${cssPrefix}__cart_item_inner`">
                   <div :class="`${cssPrefix}__cart_item_inner__text__container`">
                        <span :class="`${cssPrefix}__cart_item_inner__text`">{{item.name}} ({{item.size}})</span>
                        <div style="display: flex; flex-direction: row;">
                            <div class="subtext"><p>₹ {{item.price}}</p></div>
                            <div class="subtext" v-if="item.off" style="justify-content: flex-end; display: flex; flex-direction; margin-left: 10px"><p>(</p><p style="text-decoration:line-through;">₹ {{item.price + item.off}}</p><p>)</p></div> 
                        </div>
                        <!-- <span :class="`${cssPrefix}__cart_item_inner__text`">₹ {{item.price}}</span> -->
                   </div>
                   <counter-component :class="`${cssPrefix}__cart_item_inner__counter`" :itemAdd="{ id: item.id, count: item.unitsincart }" @cartCount="handleCountChange"></counter-component>
               </div>
           </div>
        </div>
        <div v-if="cartItemsList.length > 0" :class="loaderActiveState || warningState ? `${cssPrefix}__footer_blur` : `${cssPrefix}__footer`" @click="goToNextPage">
            <div :class="`${cssPrefix}__cart_item_inner`">
                <div :class="`${cssPrefix}__cart_item_inner__checkout_text__container`" style="width: 100%">
                    <div style="display: flex; flex-direction: row; width: 100%; justify-content: space-between; vertical-align: middle">
                        <div style="display: flex; flex-direction: row;">
                            <div :class="`${cssPrefix}__cart_item_inner__text_checkout`">₹ {{totalPriceInCart}}</div>
                            <div v-if="totalPriceOff"  style="justify-content: flex-end; display: flex; flex-direction; margin-left: 10px" :class="`${cssPrefix}__cart_item_inner__text_checkout_off`"><div>(</div><div style="text-decoration:line-through;">₹ {{totalPriceInCart + totalPriceOff}}</div><div>)</div></div>
                        </div>
                        <div style="display: flex; flex-direction: row;">
                            <div :class="`${cssPrefix}__cart_item_inner__text_checkout`">CHECKOUT</div>
                            <img :class="`${cssPrefix}__icon_checkout`" id="previous_icon" src="assets/ui-buttons/previous_dark.svg" style="transform: rotate(180deg);"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="cartItemsList.length === 0" :class="loaderActiveState || warningState ? `${cssPrefix}__footer_blur` : `${cssPrefix}__footer`" @click="goToNextPage">
            <div :class="`${cssPrefix}__cart_item_inner`">
                <div :class="`${cssPrefix}__cart_item_inner__checkout_text__container`" style="width: 100%">
                    <div style="display: flex; flex-direction: row; width: 100%; justify-content: space-between; vertical-align: middle">
                        <div style="display: flex; flex-direction: row;">
                            <div :class="`${cssPrefix}__cart_item_inner__text_checkout`">ADD ITEMS</div>
                            <img :class="`${cssPrefix}__icon_checkout`" id="previous_icon" src="assets/ui-buttons/previous_dark.svg" style="transform: rotate(180deg);"/>
                        </div>
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

    .checkout-page-view {
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
    .checkout-page-view {
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
import store from '@/store'
import util from '@/store/util'
import firebase from 'firebase'
import { defineComponent } from 'vue'
import { firebaseConfig } from '@/variables/variables'
import CounterComponent from '@/components/counter-component.vue'
import PreloaderComponent from '@/components/preloader-component.vue'
import GenericPopupComponent from '@/components/genericpopup-component.vue'

export default defineComponent({
    name: 'CheckoutPageView',
    data() {
        return {
            cssPrefix: 'checkout-page-view',
            util: util,
            store: store,
            itemsInTheCart: [],
            currentlySelectedSizeId: 0,
            cartItemsList: ([] as any),
            totalPriceInCart: 0,
            totalPriceOff: 0,
            warningState: false,
            warningText: 'Your cart is empty',
            cartItemsListLoaded: false
        }
    },
    components: {
        CounterComponent,
        PreloaderComponent,
        GenericPopupComponent
    },
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },

    },
    watch: {
        isLoaded(truth) {
            this.warningState = !truth
            console.log('Eminem :: ', truth)
        }
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

        itemRef: {
            get() {
                return firebase.database().ref(`items/plaintees`)
            },
            set() {
                console.log()
            }
        },
        
        isLoaded: {
            get: () => {
                return util.getters.getIsLoaded
            },
            set: (payload: any) => {
                store.dispatch('toggleIsLoaded', payload)
            }
        },
    },
    mounted() {
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

        this.getCartItemsAndRemoveZeroUnitsFromList()
        this.warningState = !this.isLoaded
    },
    methods: {
        closePopup() {
            this.item = {}
            store.dispatch('changePopupState')
        },
        goBack() {
            this.$router.go(-1)
        },
        handleCountChange(countAndId: any) {
            this.util.dispatch('changePreloaderActiveState', true)
            this.cartItemRef.child(`${this.cartItemsList[countAndId.id].trueid}/units`).set(countAndId.count)
            this.getCartItemsAndRemoveZeroUnitsFromList()
            if(countAndId.count === 0) {
                this.cartItemsList = this.cartItemsList.splice(countAndId.id, 1)
            }
        },
        getCartItemsAndRemoveZeroUnitsFromList() {
            this.cartItemRef.once('value', (snapshot: any) => {
                this.util.dispatch('changePreloaderActiveState', false)
                let index = 0
                this.totalPriceInCart = 0
                this.totalPriceOff = 0
                this.cartItemsList = []
                const addedItems: any[] = []
                snapshot.forEach((item: any) => {
                    this.cartItemsListLoaded = true
                    addedItems.push(item.val()['units'])
                    if(item.val()['units'] > 0) {
                        this.itemRef.child(item.key).once('value', (snapshot2: any) => {
                            const data: any[any] = []
                            snapshot2.forEach((itemInner: any) => {
                                data[itemInner.key] = itemInner.val()
                            })
                            data['unitsincart'] = item.val()['units']
                            data['id'] = index
                            data['trueid'] = item.key
                            this.totalPriceInCart += data['price'] * item.val()['units']
                            this.totalPriceOff += data['off'] * item.val()['units']
                            this.cartItemsList.push(data)
                            index += 1
                        })
                    } else {
                        this.cartItemRef.child(item.key).remove()
                    }
                })
                addedItems.some((item, key) => {
                  return item > 0
                }) ? this.util.dispatch('toggleIsLoaded', true) : this.util.dispatch('toggleIsLoaded', false)
            })
        },
        goToNextPage() {
            this.$router.push({name: 'Checkout', params: {cartItems: this.cartItemsList, total: this.totalPriceInCart}})
        }
    }
})
</script>

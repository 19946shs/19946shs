<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`" @click="closePopup"></div>
        <div :class="`${cssPrefix}__popup`" >
            <!-- change this -->
                <img v-if="!isDetails" :class="`${cssPrefix}__img`" :src="`assets/shirts/${item.id}.png`"/>
                <div v-if="isDetails" :class="`${cssPrefix}__item_details`"></div>
                <div :class="`${cssPrefix}__details`">
                    <div style="display: flex; flex-direction: row; justify-content: space-between">
                        <div style="display: flex; flex-direction: row;">
                            <div class="subtext"><p>₹ {{item.price}}</p></div>
                            <div class="subtext" v-if="item.off" style="justify-content: flex-end; display: flex; flex-direction; margin-left: 10px"><p>(</p><p style="text-decoration:line-through;">₹ {{item.price + item.off}}</p><p>)</p></div> 
                        </div>
                        <div @click="toggleDetailsAndImage"><p :class="`${cssPrefix}__details_button`">{{detailsButtonText}}</p></div>
                    </div>
                    <br/>
                    <sizes-component @sizechanged="handleSizeChanged"></sizes-component>
                    <br/>
                </div>
            <!-- <div style="width: 108px; justify-content: center; margin: auto"><counter-component></counter-component></div> -->
        </div>
        <div class="close_button" @click="closePopup">
            <img src="assets/ui-buttons/close-button.svg"/>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .popup-component {
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
            display: flex;
            flex-direction: column;
            z-index: 98;
            padding: 20px;
            height: 625px;
            width: 350px;
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

        &__slider {
            width: 100%;
            height: 300px;
        }

        &__img {
            height: 350px;
            width: 350px;
            border-radius: 20px;
            background: rgb(185, 185, 185);
        }

        &__item_detail {
            height: 350px;
            width: 350px;
            border-radius: 20px;
            border: 1px solid
        }

        &__details {
            color: var(--ion-color-primary);
            margin: 10px;
        }

        &__details_button {
            font-family: 'RobotoMono-Bold', monospace;
            font-weight: bold;
            cursor: pointer;
        }

        &__item_details {
            height: 350px;
            width: 350px;
            border-radius: 20px;
        }
    }

    @media only screen and (max-height: 815px) {
        .popup-component__img {
            height: 270px;
            width: 270px;
        }

        .popup-component__item_details {
            height: 270px;
            width: 270px;
        }

        .popup-component__popup {
            height: 480px;
            width: 270px;
        }
    }

    @media only screen and (max-height: 670px) {
        .popup-component__img {
            height: 180px;
            width: 180px;
        }

        .popup-component__popup {
            height: 480px;
            width: 180px;
        }

        .popup-component__item_details {
            height: 180px;
            width: 180px;
        }
    }

    #subtext_p_element {
        line-height: 0.01 !important;
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import CounterComponent from '@/components/counter-component.vue'
import SizesComponent from '@/components/sizes-component.vue'

export default defineComponent({
    name: 'PopupComponent',
    components: {
        // CounterComponent,
        SizesComponent
    },
    props: {
        height: { required: true, default: screen.height > 720 ? '625px' : '525px' },
        width: { required: true, default: screen.height > 720 ? '350px' : '300px' },

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

        height_: {
            get: () => {
                return screen.height > 720 ? '625px' : '525px'
            },
            set: (height: any) => {
                console.log(height)
            }
        },

        width_: {
            get: () => {
                return screen.height > 720 ? '350px' : '300px'
            },
            set: (width: any) => {
                console.log(width)
            }
        }
    },
    data() {
        return {
            cssPrefix: 'popup-component',
            store: store,
            util: util,
            isDetails: false,
            detailsButtonText: 'Details',
            cartItems: [{
                
            }]
        }
    },
    methods: {
        closePopup() {
            this.item = {}
            this.store.dispatch('changePopupState')
        },
        
        toggleDetailsAndImage() {
            this.isDetails = !this.isDetails
            this.detailsButtonText = this.detailsButtonText === 'Details' ? 'Image' : 'Details'
        },

        handleSizeChanged(sizeId: number) {
            console.log(sizeId)
        },

        handleCountChange() {
            console.log()
        }
    }
})
</script>

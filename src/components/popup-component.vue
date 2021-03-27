<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`" @click="closePopup"></div>
        <div :class="`${cssPrefix}__popup`" :style="{height: this.height, width: this.width}">
            <!-- change this -->
                <img :class="`${cssPrefix}__img`" :src="`assets/shirts/${item.id}.jpg`"/>
                <div :class="`${cssPrefix}__details`">
                    <h2>{{item.color}}</h2>
                    <p>Description here</p>
                    <p>Rs. {{item.price}}</p>
                    <p>More details</p>
                    <br/>
                    <p>Buy buttons and stuff</p>
                </div>
        </div>
    </div>
</template>

<style lang="scss">
    .popup-component {
        &__container {
            top: 0px;
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
            font-family: Roboto, Arial, sans-serif;

            p {
                line-height: 0.2;
                font-family: Roboto, Arial, sans-serif;
            }
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PopupComponent',
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
        }
    },
    data() {
        return {
            cssPrefix: 'popup-component'
        }
    },
    mounted() {
        console.log('Arivu:: ')
    },
    methods: {
        closePopup() {
            this.item = {}
            store.dispatch('changePopupState')
        }
    }
})
</script>

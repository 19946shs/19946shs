<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`"></div>
        <div :class="`${cssPrefix}__preloader`">
            <img src="assets/preloader/tape.svg" style="width: 100vw"/>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .preloader-component {
        &__container {
            top: 0px;
            height: 100%;
            width: 100%;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            min-height: 100vh;
            z-index: 99;
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

        &__preloader {
            z-index: 100;
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
    }
</style>

<script lang="ts">
import store from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PreloaderComponent',
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
            cssPrefix: 'preloader-component'
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

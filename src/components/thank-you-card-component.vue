<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`" @click="closePopup"></div>
        <div :class="`${cssPrefix}__popup`" :style="{height: this.height, width: this.width}">
            <div :class="`${cssPrefix}__thankyou`">
                Thank you for having the Audacitee to buy from us, {{user}}. You're awesome :)
            </div>
            <div :class="`${cssPrefix}__thankyou_smileys`" >
                <div :class="`${cssPrefix}__icon`"><img src="assets/ui-buttons/smile.svg" alt="smile" @click="closePopup(1)"></div>
                <div :class="`${cssPrefix}__icon`"><img src="assets/ui-buttons/sad.svg" alt="smile" @click="closePopup(1)"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .thank-you-card-component {
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

        &__close_button {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }

        &__menu {
            width: 250px;
            margin: 20px;
            font-size: 24px;
            display: flex;
            flex-direction: column;
            color: var(--ion-color-primary);
        }

        &__menu_item {
            margin-bottom: 20px;
        }
        
        &__icon {
            width: var(--ion-icon-size-desktop);
            height: var(--ion-icon-size-desktop);
            margin-right: 10px;
            margin-left: 10px;
        }

        &__thankyou {
        }

        &__thankyou_smileys {
            justify-content: space-between;
            width: 100%;
            margin: auto;
            display: flex;
            flex-direction: row;
            margin-top: 20px;
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ThankYouCardComponent',
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        user: { required: true, default: '' }
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
            cssPrefix: 'thank-you-card-component',
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
    methods: {
        closePopup(rating = -1) {
            this.$router.push('/home')
        },
    }
})
</script>

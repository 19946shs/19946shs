<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__blur`" @click="closePopup"></div>
        <div :class="`${cssPrefix}__popup_default`" v-if="!isAddress && !isTutorial" :style="{height: this.height, width: this.width}">
            <div :class="`${cssPrefix}__generic`">
                {{primaryDisplayText}}
            </div>
            <div :class="`${cssPrefix}__generic_button`">
                <aud-button-primary @button-clicked="closePopup" :width="'180px'" :buttonText="'ALRIGHT'"></aud-button-primary>
            </div>
        </div>
        <div :class="`${cssPrefix}__popup`"  v-if="isAddress" :style="{height: '450px', width: this.width}">
            <genericinnerpopup-component @close="onAddressChange">
                <slot name="address"></slot>
            </genericinnerpopup-component>
        </div>
        <div :class="`${cssPrefix}__popup`"  v-if="isTutorial" :style="{height: '300px', width: this.width}">
            <genericsecondinnerpopup-component @close="onTutorialAlright" :tutorialTexts="tutorialTexts">
                <slot name="tutorial"></slot>
            </genericsecondinnerpopup-component>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .genericpopup-component {
        &__container {
            z-index: 100;
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

        &__popup_default {
            z-index: 100;
            padding: 20px;
            text-align: left;
            display: flex;
            border-radius: 20px;
            flex-direction: column;
            justify-content: space-between;
            background: var(--ion-color-secondary);
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
        }

        &__popup {
            z-index: 100;
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
        
        &__generic_button {
            margin: 20px auto 20px;
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import genericinnerpopupComponent from './genericinnerpopup-component.vue'
import genericsecondinnerpopupComponent from './genericsecondinnerpopup-component.vue'
import AudButtonPrimary from '@/components/ui-components/aud-button-primary.vue'

export default defineComponent({
    name: 'GenericPopupComponent',
    components: {
        genericinnerpopupComponent,
        genericsecondinnerpopupComponent,
        AudButtonPrimary
    },
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        user: { required: true, default: '' },
        primaryDisplayText: { required: true, default: '' },
        isAddress: { required: true, default: false },
        isTutorial: { required: true, default: false },
        tutorialTexts: { required: true, default: ['', ''] }
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
            cssPrefix: 'genericpopup-component',
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
        console.log('Michael Jackson :: ', this.tutorialTexts)
    },
    methods: {
        onAddressChange(params: any) {
            this.$emit('addressChanged', params)
        },
        onTutorialAlright(params: any) {
            this.$emit('tutorialAlright', params)
        },
        closePopup() {
            this.$router.push('/home')
        },
    }
})
</script>

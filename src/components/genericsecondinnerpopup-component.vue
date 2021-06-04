<template v-slot:tutorial>
    <div :class="`${cssPrefix}__tutorial_container`">
        <div style="display: flex; flex-direction: column">
            <div :class="`${cssPrefix}__generic_text`" v-if="tutorial1">
                {{tutorialTexts[0]}}
            </div>
            <br>
            <div :class="`${cssPrefix}__generic_text`" v-if="tutorial1">
                {{tutorialTexts[1]}}
            </div>
            <div :class="`${cssPrefix}__generic_text`" v-if="!tutorial1">
                {{tutorialTexts[2]}}
            </div>
            <br>
            <div :class="`${cssPrefix}__generic_text`" v-if="!tutorial1">
                {{tutorialTexts[3]}}
            </div>
        </div>
        <div :class="`${cssPrefix}__footer_container`" >
            <div :class="`${cssPrefix}__show_tutorial_again_container`">
                <input type="checkbox" v-model="dontShowAgain" style="height: 16px; width: 16px; margin-right: 10px; ">
                <span style="">Don't show the tutorial again</span>
            </div>
            <div :class="`${cssPrefix}__generic_button`">
                <aud-button-primary style="margin: auto" v-if="tutorial1" @button-clicked="tutorial1 = false" :width="'120px'" :buttonText="'NEXT'"></aud-button-primary>
                <aud-button-primary style="margin: auto" v-if="!tutorial1" @button-clicked="closePopup" :width="'180px'" :buttonText="'ALRIGHT'"></aud-button-primary>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .genericsecondinnerpopup-component {
        &__tutorial_container {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__footer_container {
            width: 100%;
            justify-content: center
        }

        &__generic_text {
            font-family: 'RobotoMono-Bold', monospace;
            font-weight: bold;
        }

        &__generic_button {
            width: 100px;
            margin: 20px auto 20px;
        }

        &__show_tutorial_again_container {
            font-size: 14px;
            margin: 0 auto 0;
            display: flex;
            flex-direction: row;

            input:checked {
                background: var(--ion-color-primary)
            }
        }
    }

    .button {
        height: 40px;
        margin: 20px auto 20px;
        position: relative;
        float: bottom;
        bottom: 0px;
        border-radius: var(--ion-border-radius);
        background: var(--ion-color-primary);
    }

    .input-group {
        position: relative;
        margin: 50px 0 20px;
    }

    textarea {
        width: 300px;
        border: none;
        display: block;
        font-size: 18px;
        background: none;
        font-weight: normal;
        font-family: 'RobotoMono', monospace;
        padding: 10px 10px 10px 5px;
        border-bottom: 1px solid #ffffff;
    }

    textarea:focus {
        outline: var(--ion-color-primary);
    }

    input {
        width: 300px;
        border: none;
        display: block;
        font-size: 18px;
        background: none;
        font-weight: normal;
        font-family: 'RobotoMono', monospace;
        padding: 10px 10px 10px 5px;
        border-bottom: 1px solid #ffffff;
    }

    input:focus {
        outline: none;
    }

    label {
        left: 5px;
        top: 10px;
        color: #999;
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
        font-family: 'RobotoMono', monospace;
    }

    .invalidity {
        left: 5px;
        top: 50px;
        color: rgb(212, 0, 0);
        font-size: 14px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
    }

    .textinvalidity {
        left: 5px;
        top: 70px;
        color: rgb(212, 0, 0);
        font-size: 14px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
    }

    input:focus ~ label,
    input:valid ~ label {
        top: -20px;
        font-size: 14px;
        color: var(--ion-color-primary);
    }

    textarea:focus ~ label,
    textarea:valid ~ label {
        top: -20px;
        font-size: 14px;
        color: var(--ion-color-primary);
    }

    .bar {
        position: relative;
        display:block;
        width:315px;
    }

    .bar:before,
    .bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 0px;
        position: absolute;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
        background: var(--ion-color-primary);
    }

    .bar:before {
        left: 50%;
    }

    .bar:after {
        right: 50%;
    }

    input:focus ~ .bar:before,
    input:focus ~ .bar:after {
        width: 50%;
    }

    textarea:focus ~ .bar:before,
    textarea:focus ~ .bar:after {
        width: 50%;
    }


    .highlight {
        position: absolute;
        height: 60%;
        width: 100px;
        top: 25%;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    }

    input:focus ~ .highlight {
        -webkit-animation: inputHighlighter 0.3s ease;
        -moz-animation: inputHighlighter 0.3s ease;
        animation: inputHighlighter 0.3s ease;
    }

    textarea:focus ~ .highlight {
        -webkit-animation: inputHighlighter 0.3s ease;
        -moz-animation: inputHighlighter 0.3s ease;
        animation: inputHighlighter 0.3s ease;
    }

    /* animations */
    @-webkit-keyframes inputHighlighter {
        from { background: var(--ion-color-primary); }
        to   { width: 0; background: transparent; }
    }
    @-moz-keyframes inputHighlighter {
        from { background: var(--ion-color-primary); }
        to   { width: 0; background: transparent; }
    }
    @keyframes inputHighlighter {
        from { background: var(--ion-color-primary); }
        to   { width: 0; background: transparent; }
    }

</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import * as dotenv from 'dotenv';
import AudButtonPrimary from '@/components/ui-components/aud-button-primary.vue'
dotenv.config();

export default defineComponent({
    name: 'GenericSecondInnerPopupComponent',
    components: {
        AudButtonPrimary
    },
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        user: { required: true, default: '' },
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
            cssPrefix: 'genericsecondinnerpopup-component',
            store: store,
            util: util,
            displayName: '',
            tutorial1: true,
            dontShowAgain: false
        }
    },
    mounted() {
        console.log()
    },
    methods: {
        
        closePopup() {
            console.log('System of down :: ')
            this.$emit('close', { isShowAgain: !this.dontShowAgain });
        },
    }
})
</script>

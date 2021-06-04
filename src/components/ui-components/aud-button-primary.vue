<template>
    <div @click="onClick" :id="`${cssPrefix}__button`">{{buttonText}}</div>
</template>

<style lang="scss">
    #aud-button-uicomponent {
        &__button {
            width: 100px;
            height: 40px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            position: relative !important;
            display: table-cell !important;
            vertical-align: middle !important;
            font-family: 'RobotoMono-Bold', monospace;
            border-radius: var(--ion-border-radius);
            background: var(--ion-color-primary);
            color: var(--ion-color-secondary);
        }
    }

</style>

<script lang="ts">
import Vue from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AudButtonPrimary',
    data() {
        return {
            cssPrefix: 'aud-button-uicomponent',
        }
    },
    props: {
        buttonText: { required: true, default: 'BUTTON' },
        width: { required: true, default: '100px' },
        height: { required: true, default: '40px' },
    },
    methods: {
        onClick() {
            this.$emit('button-clicked')
        }
    }
})
</script>

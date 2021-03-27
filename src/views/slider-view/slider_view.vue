<template>
    <div :class="`${cssPrefix}__container`">
    </div>
</template>

<style lang="scss">
    .slider-view {
        &__container {
            width: 100%;
            height: 100% !important;
            margin: 20px;
            background: red;
            display: block;
        }

        &__slider {
            width: 100%;
            height: 300px;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SliderView',
    data() {
        return {
            cssPrefix: 'slider_view'
        }
    },
    mounted() {
        console.log('Arivu:: ')
    }
})
</script>


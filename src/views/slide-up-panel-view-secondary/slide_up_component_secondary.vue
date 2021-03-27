<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__inner_container`">
            <h2>Customize your shirt</h2>
            <p>More customization related stuff</p>
            <p>This panel would slide up</p>
            <p>Add to cart feature</p>
            <p> and many more coming up soon</p>
        </div>
        <!-- <div v-for="item in shirtList" :key="item.id">
            <div :class="`${cssPrefix}__cards`">
                <img :class="`${cssPrefix}__img`" :src="`assets/shirts/${item.id}.jpg`"/>
                <div :class="`${cssPrefix}__details`">
                    <h2>{{item.color}}</h2>
                    <p>Description here</p>
                    <p>Rs. {{item.price}}</p>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style lang="scss">
    .slide_up_panel_secondary {
        @font-face {
            font-family: "roboto";
            src: url('../Roboto-Light.ttf') format('truetype');
        }



        &__container {
            width: 100%;
            height: 100% !important;
            display: block;
        }

        &__slider {
            width: 100%;
            height: 300px;
        }

        &__inner_container {
            height: 100%;
            padding: 20px;
            color: var(--ion-color-primary);
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
            background: var(--ion-color-secondary);
            font-family: "roboto", monospace, Arial, Helvetica, sans-serif;

            p {
                line-height: 0.2;
            }
        }

        &__cards {
            height: 400px;
            width: 250px;
            margin: 20px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            scroll-snap-align: center;
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
            background: var(--ion-color-secondary);
        }

        &__img {
            height: 250px;
            width: 250px;
            border-radius: 20px;
        }
    }
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SlideUpPanelSecondary',
    data() {
        return {
            cssPrefix: 'slide_up_panel_secondary',
            shirtList: [
                { price: 270, color: 'red', id: 1 },
                { price: 270, color: 'turquiose', id: 2 },
                { price: 270, color: 'purple', id: 3 },
                { price: 270, color: 'blue', id: 4 },
                { price: 270, color: 'mint', id: 5 },
                { price: 270, color: 'black', id: 6 }
            ]
        }
    },
    mounted() {
        console.log('Arivu:: ')
    }
})
</script>


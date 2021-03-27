<template>
    <div :class="`${cssPrefix}__container`">
        <!-- <div :class="`${cssPrefix}__inner_container`"></div> -->
        <div v-for="item in shirtList" :key="item.id">
            <div :class="`${cssPrefix}__cards`"  @click="clicked(item)" >
                <img :class="`${cssPrefix}__img`" :src="`assets/shirts/${item.id}.jpg`"/>
                <div :class="`${cssPrefix}__details`">
                    <h2>{{item.color}}</h2>
                    <p>Description here</p>
                    <p>Rs. {{item.price}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .slide_up_panel {
        &__container {
            width: 100%;
            max-height: 450px !important;
            display: flex;
            flex-direction: row;
            scroll-snap-type: x mandatory;
            overflow-x: scroll;
            overflow-y: hidden;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
        }

        &__slider {
            width: 100%;
            height: 300px;
        }

        &__inner_container {
            height: 100%;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            box-shadow: 0px 0px 20px 0px var(--ion-color-primary) ;
            background: var(--ion-color-secondary);
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
    name: 'SlideUpPanel',
    components: {
    },
    data() {
        return {
            cssPrefix: 'slide_up_panel',
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
    },
    methods: {
        clicked(item: any) {
            console.log('Drake:: clicked:: ', item)
            store.dispatch('changePopupState')
            store.dispatch('changeTemporaryItem', item)
        }
    }
})
</script>


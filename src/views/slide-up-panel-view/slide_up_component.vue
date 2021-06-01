<template>
    <div :class="`${cssPrefix}__container`">
        <!-- <div :class="`${cssPrefix}__inner_container`"></div> -->
        <div v-for="item in Object.assign([], shirtList)" :key="Object.assign({}, item).id">
            <div :class="`${cssPrefix}__cards`"  @click="clicked(item)" >
                <img :class="`${cssPrefix}__img`" :src="`assets/shirts/${item.id}.png`"/>
                <div :class="`${cssPrefix}__details`">
                    <h2>{{item.color}}</h2>
                    <p>Description here</p>
                    <div style="display: flex; flex-direction: row;">
                        <div class="subtext"><p>₹ {{item.price}}</p></div>
                        <div class="subtext" v-if="item.off" style="justify-content: flex-end; display: flex; flex-direction; margin-left: 10px"><p>(</p><p style="text-decoration:line-through;">₹ {{item.price + item.off}}</p><p>)</p></div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

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
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        &__container::-webkit-scrollbar {
          display: none;
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
            background: rgb(185, 185, 185);
        }

        &__details {
            color: var(--ion-color-primary);
            margin: 10px;
            // font-family: Roboto, Arial, sans-serif;

            // p {
            //     line-height: 0.2;
            //     font-family: Roboto, Arial, sans-serif;
            // }
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store'
import { defineComponent } from 'vue'
import firebase from 'firebase'
import { ShirtList } from '@/variables/items.variables'
import { firebaseConfig } from '@/variables/variables'

export default defineComponent({
    name: 'SlideUpPanel',
    components: {
    },
    data() {
        return {
            cssPrefix: 'slide_up_panel',
            shirtList: ShirtList
        }
    },
    mounted() {

        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }
        const ref = firebase.database().ref('catalogue')
        const ref2 = firebase.database().ref('items/plaintees')
        ref.once('value').then((snapshot) => {
            const items = snapshot.val()
            ref2.once('value').then((snapshot2) => {
                const shirtListTemp: any = []
                this.shirtList = []
                Object.keys(items).forEach((item: any) => {
                    const shirtItem = snapshot2.child(`${item}01`).val()
                    this.shirtList.push({
                        price: shirtItem.price,
                        color: shirtItem.name,
                        id: item.substring(4) === '00' ? `${item.substring(3, 5)}1`.toString() :  item.substring(4),
                        available: shirtItem.available,
                        off: shirtItem.off,
                        trueID: item
                    })
                })
                this.$emit('loaded')
            })
        })
    },
    methods: {
        clicked(item: any) {
            store.dispatch('changePopupState')
            store.dispatch('changeTemporaryItem', item)
        }
    }
})
</script>



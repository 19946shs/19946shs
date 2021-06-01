<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__inner_container`">
            <div v-for="size in sizes" :key="size.id">
                <div :class="!size.selected? `${cssPrefix}__button` : `${cssPrefix}__button_selected`" @click="selectThisSize(size.id)">{{size.size}}</div>
            </div>
        </div>
        <div style="width: 108px; justify-content: center; margin: auto; margin-bottom: 20px"><counter-component :itemAdd="{ id: currentlySelectedSizeId, count: sizes[this.currentlySelectedSizeId].count }" @count="handleCountChange"></counter-component></div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .size-component {
        &__container {
            display: flex;
            margin: auto;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            height: 150px;
        }

        &__button {
            height: 24px;
            width: 32px;
            font-size: 16px;
            font-weight: bold;
            font-family: 'RobotoMono-Bold', monospace;
            color: var(--ion-color-secondary);
            background-color: var(--ion-color-primary-tint);
        }

        &__button_selected {
            height: 24px;
            width: 32px;
            font-size: 16px;
            font-weight: bold;
            font-family: 'RobotoMono-Bold', monospace;
            color: var(--ion-color-secondary);
            background-color: var(--ion-color-primary);
        }

        &__inner_container {
            height: 24px;
            width: 210px;
            display: flex;
            margin: auto;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: center;
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'
import firebase from 'firebase'
import { firebaseConfig } from '@/variables/variables'
import CounterComponent from '@/components/counter-component.vue'

export default defineComponent({
    name: 'SizesComponent',
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
    },
    components: {
        CounterComponent,
    },
    computed: {
        item: {
            get: () => {
              return store.getters.getTemporaryItem
            },
            set: (payload: any) => {
              store.dispatch('changeTemporaryItem', payload)
            }
        },
        getUserID: {
            get() {
                return `${localStorage.getItem('uid')}`
            },
            set(value: any) {
                this.getUserID = value
            }
        },
        cartItemRef: {
            get() {
                return firebase.database().ref(`users/${localStorage.getItem('uid')}/cart_items`)
            },
            set() {
                console.log()
            }
        }
    },
    data() {
        return {
            cssPrefix: 'size-component',
            store: store,
            util: util,
            count: 0,
            previouslySelectedSizeId: 0,
            currentlySelectedSizeId: 0,
            userid: '',
            sizes: [
                { size: 'S', id: 0 , selected: true, count: 0 },
                { size: 'M', id: 1 , selected: false, count: 0 },
                { size: 'L', id: 2 , selected: false, count: 0 },
                { size: 'XL', id: 3 , selected: false, count: 0 },
                { size: 'XXL', id: 4 , selected: false, count: 0 }
            ]
        }
    },
    mounted() {
        
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged((user) => {
            if(!user) this.$router.push('/login')
        })

        this.userid = `${localStorage.getItem('uid')}`

        const addedItems: any = []
        this.cartItemRef.once('value', (snapshot: any) => {
            snapshot.forEach((val: any) => {
                addedItems[val.key.substring(0, 6)] = []
            })
            snapshot.forEach((val: any) => {
                addedItems[val.key.substring(0, 6)][val.key.substring(6)] = val.val().units
            })
            try {
                if(addedItems[this.item.trueID] !== undefined) {
                    Object.keys(addedItems[this.item.trueID]).forEach((val) => {
                        this.sizes[parseInt(val) - 1].count = addedItems[this.item.trueID][val]
                    })
                }
            } catch(err) {
                console.log(err)
            }
        })
    },
    methods: {
        closePopup() {
            this.item = {}
            this.store.dispatch('changePopupState')
        },
        counter(num: number) {
            window.navigator.vibrate(200)
            this.count = this.count + num >= 0 ? this.count + num : 0 
        },
        selectThisSize(currentlySelectedSizeId: number) {
            this.sizes[this.previouslySelectedSizeId].selected = false
            this.sizes[currentlySelectedSizeId].selected = true
            this.previouslySelectedSizeId = currentlySelectedSizeId
            this.currentlySelectedSizeId = currentlySelectedSizeId
            window.navigator.vibrate(200)
            this.$emit('sizechanged', currentlySelectedSizeId)
        },
        handleCountChange(count: number) {
            this.count = count
            this.sizes[this.currentlySelectedSizeId].count = count
            const fullTrueID = `${this.item.trueID}0${this.currentlySelectedSizeId + 1}`
            this.cartItemRef.child(`${fullTrueID}/units`).set(this.count)
        }
    }
})
</script>

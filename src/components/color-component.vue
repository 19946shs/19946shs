<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="`${cssPrefix}__inner_container`">
            <div v-for="color in colors" :key="color.id">
                <div :class="!color.selected? `${cssPrefix}__button` : `${cssPrefix}__button_selected`" @click="selectThisColor(color.id)">{{color.color}}</div>
            </div>
        </div>
        
        <div style="width: 108px; justify-content: center; margin: auto; margin-bottom: 20px"><counter-component :itemAdd="{ id: currentlySelectedColorId, count: colors[this.currentlySelectedColorId].count }" @count="handleCountChange"></counter-component></div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .color-component {
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
import CounterComponent from '@/components/counter-component.vue'

export default defineComponent({
    name: 'ColorsComponent',
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
    },
    data() {
        return {
            cssPrefix: 'color-component',
            store: store,
            util: util,
            count: 0,
            previouslySelectedColorId: 0,
            currentlySelectedColorId: 0,
            colors: [
                { color: 'S', id: 0 , selected: true, count: 0 },
                { color: 'M', id: 1 , selected: false, count: 0 },
                { color: 'L', id: 2 , selected: false, count: 0 },
                { color: 'XL', id: 3 , selected: false, count: 0 },
                { color: 'XXL', id: 4 , selected: false, count: 0 },
            ]
        }
    },
    mounted() {
        console.log('Arivu:: ')
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
        selectThisColor(currentlySelectedColorId: number) {
            this.colors[this.previouslySelectedColorId].selected = false
            this.colors[currentlySelectedColorId].selected = true
            this.previouslySelectedColorId = currentlySelectedColorId
            this.currentlySelectedColorId = currentlySelectedColorId
            window.navigator.vibrate(200)
            this.$emit('colorchanged', currentlySelectedColorId)
        },
        handleCountChange(count: number) {
            this.count = count
            this.colors[this.currentlySelectedColorId].count = count
            console.log('Martian:: ', this.count)
        }
    }
})
</script>

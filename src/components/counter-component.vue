<template>
    <div :class="`${cssPrefix}__container`">
        <div :class="[`${cssPrefix}__button`, `${cssPrefix}__actual_button`, isDisabled ? `${cssPrefix}__actual_button_minus` : `${cssPrefix}__actual_button_minus_disabled`]" @click="counter(-1)">-</div>
        <div :class="[`${cssPrefix}__button`, `${cssPrefix}__not_actual_button`]">{{count}}</div>
        <div :class="[`${cssPrefix}__button`, `${cssPrefix}__actual_button`, `${cssPrefix}__actual_button_plus`]" @click="counter(1)">+</div>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .counter-component {
        &__container {
            height: 48px;
            width: 108px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 20px;
        }

        &__button {
            width: 36px !important;
            height: 48px;
            margin: auto;
            display: flex;
            cursor: pointer;
            font-weight: bold;
            align-items: center;
            justify-content: center;
            font-family: 'RobotoMono-Bold', monospace;
        }

        &__not_actual_button {
            color: var(--ion-color-primary);
            background: var(--ion-color-secondary);
        }

        &__actual_button {
            color: var(--ion-color-secondary);
            background: var(--ion-color-primary);
        }

        &__actual_button_minus {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
        }

        &__actual_button_plus {
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
        }

        &__actual_button_minus_disabled {
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background: var(--ion-color-primary-tint);
        }
    }
</style>

<script lang="ts">
import store from '@/store'
import util from '@/store/util'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CounterComponent',
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        itemAdd: { required: true, default: {
            id: -1,
            count: 0
        } }
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

        // countT: {
        //     get: () => {
        //         return itemAdd.count
        //     },
        //     set: () => {}
        // }
    },
    data() {
        return {
            cssPrefix: 'counter-component',
            store: store,
            util: util,
            count: 0,
            id: -1,
            isDisabled: false
        }
    },
    watch: {
        itemAdd () {
            this.id = this.itemAdd.id
            this.count = this.itemAdd.count
            this.isDisabled = Boolean(this.count)
        }
    },
    mounted() {
        console.log('Tom M :: ', this.itemAdd)
        setTimeout(() => {
            this.id = this.itemAdd.id
            this.count = this.itemAdd.count
            this.isDisabled = Boolean(this.count)
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
            this.isDisabled = Boolean(this.count)
            this.$emit('count', this.count)
            this.$emit('cartCount', {count: this.count, id: this.id})
        }
    }
})
</script>

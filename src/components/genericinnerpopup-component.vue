<template v-slot:address>
    <div :class="`${cssPrefix}__address_container`">
        <form style="height: 100%; display: flex; flex-direction: column; justify-content: space-between" action="" @submit="checkForm">
            <div>
                <div class="input-group">
                    <input v-model="phone" type="number" required @focus="onPhoneNumberFocus">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label ref="phonenumber_label">{{phoneNumberLabel}}</label>
                    <span class="invalidity" v-if="!isPhoneNumberValid">{{invalidPhoneNumber}}</span>
                </div>

                <div class="input-group">
                    <textarea v-model="address" type="text" maxlength="250" required @focus="onAddressFocus"/>
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>{{addressLabel}}</label>
                    <span class="textinvalidity" v-if="!isAddressValid">{{invalidAddress}}</span>
                </div>

                <div class="input-group">
                    <input v-model="pincode" type="number" required @focus="onPincodeFocus">
                    <span class="highlight"></span>
                    <span class="bar"></span>
                    <label>{{pincodeLabel}}</label>
                    <span class="invalidity" v-if="!isValidPincode">{{invalidPincode}}</span>
                    <span class="invalidity" v-if="!isNotWrongPincode">{{wrongPincode}}</span>
                </div>
            </div>

            <div class="button">
                <aud-button-primary @button-clicked="checkForm" :width="'180px'" :buttonText="'ADD ADDRESS'"></aud-button-primary>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
    @import '@/theme/main.scss';

    .genericinnerpopup-component {
        &__address_container {
            width: 100%;
            height: 100%;
        }
        &__text_group {
            display: flex;
            flex-direction: column;
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
        height: 200px;
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
    name: 'GenericInnerPopupComponent',
    components: {
        AudButtonPrimary
    },
    props: {
        height: { required: true, default: '625px' },
        width: { required: true, default: '350px' },
        user: { required: true, default: '' },
        warningText: { required: true, default: '' }
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
            cssPrefix: 'genericinnerpopup-component',
            store: store,
            util: util,
            displayName: '',
            // phone
            phone: '',
            isPhoneNumberValid: true,
            phoneNumberLabel: 'Phone Number',
            invalidPhoneNumber: 'Invalid phone number',
            // address
            address: '',
            addressLabel: 'Address',
            invalidAddress: 'Invalid address',
            isAddressValid: true,
            // pincode
            pincode: '',
            pincodeLabel: 'Pincode',
            invalidPincode: 'Invalid pincode',
            isValidPincode: true,
            isNotWrongPincode: true,
            wrongPincode: 'Sorry. We don\'t deliver to this pincode yet ',
            user_: {
                uid: '',
                photoUrl: '',
                displayName: ''
            }
        }
    },
    mounted() {
        console.log()
    },
    methods: {
        // phone
        phoneNumberValidate(event: any) {

            if(this.phone.length > 10) event.preventDefault ? event.preventDefault() : (event.returnValue = false)
        },
        onPhoneNumberFocus() {
            this.isPhoneNumberValid = true;
        },

        // address
        onAddressFocus() {
            this.isAddressValid = true
        },

        // pincode
        onPincodeFocus() {
            this.isValidPincode = true;
            this.isNotWrongPincode = true;
        },

        // Form        
        checkForm() {
            if(this.phone.length != 10) {
                this.isPhoneNumberValid = false
            }
            if(this.pincode.length != 6) {
                this.isValidPincode = false
            } else {
                this.pincode.substring(0, 2) === '56' ? this.isNotWrongPincode = true : this.isNotWrongPincode = false
            }
            if(this.address.length < 30) {
                this.isAddressValid = false
            } 

            [this.isPhoneNumberValid, this.isValidPincode, this.isNotWrongPincode, this.isAddressValid].every((val) => {
                return val
            }) ? this.submitForm() : console.log()
        },

        submitForm() {
            this.$emit('close', {
                phoneNumber: this.phone,
                address: this.address,
                pincode: this.pincode
            })
        },
        closePopup() {
            this.$router.push('/home')
        },
    }
})
</script>

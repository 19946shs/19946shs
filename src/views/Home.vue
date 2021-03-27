<template>
  <div :class="`${cssPrefix}__container`">
    <div :class="`${cssPrefix}__title`"><img id="logo_id" src="assets/icon/audaciteelogo.png"/></div>
    <div :class="`${cssPrefix}__title_blur`"></div>
    <div :class="popupActiveState ? `${cssPrefix}__content_container_blur` : `${cssPrefix}__content_container`">
      <slide-up-panel style="height: 500px; border-top-left-radius: 10px; border-top-right-radius: 10px;"></slide-up-panel>
      <section style="height: 100%; margin-top: 40px">
        <slide-up-panel-secondary :class="`${cssPrefix}__slider_container`" style="height: 100%"></slide-up-panel-secondary>
      </section>
    </div>
    <popup-component v-if="popupActiveState"></popup-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store'
import PopupComponent from '@/components/popup-component.vue'
import SlideUpPanel from './slide-up-panel-view/slide_up_component.vue';
import SlideUpPanelSecondary from './slide-up-panel-view-secondary/slide_up_component_secondary.vue'
// import SliderView from './slider-view/slider_view.vue';

export default defineComponent({
  name: 'Home',
  data() {
      return {
          cssPrefix: 'home_view',
      }
  },
  components: {
    // SliderView,
    PopupComponent,
    SlideUpPanel,
    SlideUpPanelSecondary
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonToolbar
  },
  computed: {
    popupActiveState: {
      get: () => {
        return store.getters.popupActiveState
      },
      set: () => {
        store.dispatch('changePopupState')
      }
    }
  },
  mounted() {
    console.log('Jay Rock:: ', store.getters.popupActiveState, this.popupActiveState)
  }
});
</script>

<style lang="scss">
// @import "../theme/variables.css";

#logo_id {
  width: 400px;
  height: 100px;
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

.home_view__container {
  background: var(--ion-color-secondary);
  height: 100%;
}

.home_view__container_blur {
  background: var(--ion-color-secondary);
  height: 100%;
  filter: blur(10px);
}

.home_view__title {
  width: 100%;
  height: 100px;
  text-align: center;
  color: var(--ion-color-secondary);
  background: var(--ion-color-primary);
}

.home_view__title_blur {
  width: 100%;
  height: 30px;
  color: var(--ion-color-primary);
  background: var(--ion-color-secondary);
  position: sticky;
}

.home_view__content_container {
  width: 100%;
  height: 100%;
}

.home_view__content_container_blur {
  width: 100%;
  height: 100%;
  filter: blur(30px);
  background: #000000;
}

.blur_effect {
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(10px);
}

@media only screen and (max-width: 800px) { 
  #logo_id {
    width: 400px;
    height: 100px;
  }

  .home_view__title {
    height: 100px;
  }
}

@media only screen and (max-width: 399px) { 
  #logo_id {
    width: 200px;
    height: 50px;
  }

  .home_view__title {
    height: 50px;
  }
}

@media only screen and (max-width: 190px) { 
  #logo_id {
    display: none;
  }

  .home_view__title {
    height: 50px;
  }
}
</style>
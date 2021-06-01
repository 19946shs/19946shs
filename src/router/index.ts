import store from '@/store'
import axios from 'axios'
import firebase from 'firebase'
import Home from '../views/Home.vue';
import { RouteRecordRaw } from 'vue-router';
import { firebaseConfig } from '@/variables/variables'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginPopupComponent from '@/components/loginpopup-component.vue'
import OrdersListView from '@/views/orders-list-view/orders-list-view.vue'
import CheckoutPageView from '@/views/checkout-page-view/checkout-page-view.vue'
import CheckoutPageFinalView from '@/views/checkout-page-view/checkout-page-final-view.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CheckoutPageView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: CheckoutPageFinalView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ordereditems',
    name: 'OrderedItems',
    component: OrdersListView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPopupComponent,
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    console.warn('Hello ', user.displayName)
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        next()
      } else {
        next({ name: 'Login', params: { nextUrl: to.fullPath } })
      }
    })
    // axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${window.localStorage.getItem('token')}`).then((result: any) => {
    //   if (result.data.error) {
    //     next({ name: 'Login', params: { nextUrl: to.fullPath } })
    //   } else {
    //     // if(to.fullPath === '/login') next({ path: '/home' })
    //     next()
    //   }
    // }).catch((error: any) => {
    //   console.log(error)
    //   next({ name: 'Login', params: { nextUrl: to.fullPath } })
    // })
  } else {
    next() 
  }
})

export default router

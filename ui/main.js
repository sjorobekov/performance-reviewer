// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@babel/polyfill'
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import VeeValidate from 'vee-validate'
import VueMoment from 'vue-moment'
Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VeeValidate)
Vue.use(VueMoment)

Vue.use(Vuetify, {
  theme: {
    primary: '#655272',
    secondary: '#00bcd4',
    accent: '#ff9800',
    error: '#ff5722',
    warning: '#f44336',
    info: '#2196f3',
    success: '#03a9f4',
  }
})

Vue.use(VeeValidate, {
  locale: 'en'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})

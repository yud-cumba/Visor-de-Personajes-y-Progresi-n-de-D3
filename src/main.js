import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// BootstrapVue
import './plugins/bootstrapVue.js'

// Vue Font-Awesome
import './plugins/fontAwesome'

import './assets/css/main.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  methods: {
    // Nuestra función
    init () {
      store.dispatch('oauth/getToken', null, { root: true })
    }
  },
  // Hook created
  created () {
    this.init()
  },
  render: h => h(App)
}).$mount('#app')

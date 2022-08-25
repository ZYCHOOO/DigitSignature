import Vue from 'vue'
import router from '@/router'
import '@/assets/utils/auto-rem.js'
import App from './App.vue'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

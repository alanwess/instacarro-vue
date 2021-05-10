import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import router from '@/routes'
import App from './App.vue'
import '@/plugins/bootstrap-vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

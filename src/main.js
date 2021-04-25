import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@styles/index.scss'
import elementComponents from '@/config/element.config'

Vue.use(elementComponents)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

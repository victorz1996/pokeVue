import Vue from 'vue'
import VueClipboard from 'vue-clipboard2';
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faStar, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faStar, faBars)
Vue.use(VueClipboard);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

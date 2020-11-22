import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUserSecret,
  faSquareFull,
  faEgg,
  faFish,
  faHamburger,
  faCheese,
  faCookie,
  faAppleAlt,
  faPepperHot,
  faBomb,
  faBolt,
  faCrow,
  faFrog,
  faFlask,
  faLeaf,
  faPlay,
  faLaptop,
  faPlug,
  faPlus,
  faLemon} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(
  faUserSecret,
  faSquareFull,
  faEgg,
  faFish,
  faHamburger,
  faCheese,
  faCookie,
  faAppleAlt,
  faPepperHot,
  faBomb,
  faBolt,
  faCrow,
  faFrog,
  faFlask,
  faLeaf,
  faPlay,
  faLaptop,
  faPlug,
  faPlus,
  faLemon
  )
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

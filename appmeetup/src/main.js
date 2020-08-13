import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueHeadful from 'vue-headful'
import Vuelidate from 'vuelidate'
import './icons'
import moment from 'moment'

//Vuelidate - Libreria para validar formularios en Vue'
Vue.use(Vuelidate);
// Vue headful para crear los titulos de las pestañas donde nos encontramos en el proyecto
Vue.component('vue-headful',vueHeadful)
Vue.use(moment)



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

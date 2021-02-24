import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Start from "@/components/Start";
import { MdDialog, MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
const { ipcRenderer } = window.require('electron');

const server = ipcRenderer

const tcpPortUsed =  window.require("electron").remote.require('tcp-port-used');

Vue.prototype.$server = server
Vue.prototype.$tcpPortUsed = tcpPortUsed
Vue.use(VueRouter)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Start },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Start from "@/components/Start";
import Mediator from "@/components/Mediator";
import TextHighlight from 'vue-text-highlight';

Vue.component('text-highlight', TextHighlight);

import {
  MdDialog,
  MdButton,
  MdField,
  MdTable,
  MdCard,
  MdContent,
  MdRipple,
  MdAutocomplete
} from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import store from './store'
const { ipcRenderer, remote } = window.require('electron');
const tcpPortUsed =  remote.require('tcp-port-used');

Vue.prototype.$server = ipcRenderer
Vue.prototype.$tcpPortUsed = tcpPortUsed

Vue.use(VueRouter)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(MdRipple)
Vue.use(MdCard)
Vue.use(MdContent)
Vue.use(MdAutocomplete)
Vue.use(MdTable)

Vue.config.productionTip = false

const routes = [
  { name: 'home', path: '/', component: Start },
  { name: 'mediator', path: '/mediator', component: Mediator },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

ipcRenderer.on('newMessageIntercepted', (event, data) => {
  let messageParsed = {...data, date: Date.parse(data.date)}
  store.commit("newMessageIntercepted", messageParsed)
  store.commit("insertSuspectWordsIfDoesntExists", messageParsed.suspectWords)
})

import {createApp, defineCustomElement} from 'vue'
import App from './App.vue'
import store from './store'

customElements.define('weather-widget', defineCustomElement(App))
createApp(App).use(store).mount('#app')


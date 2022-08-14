import { defineCustomElement } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
customElements.define('weather-widget', defineCustomElement(App))

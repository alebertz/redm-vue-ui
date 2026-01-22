import { createApp } from 'vue'
import App from './App.vue'
import RedmVueUI from '../../src/index.js'

const app = createApp(App)
app.use(RedmVueUI)
app.mount('#app')

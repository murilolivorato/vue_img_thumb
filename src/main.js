import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons'
library.add(faSearch)
config.autoAddCss = true


const app = createApp(App)

app.use(createPinia())
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
import 'bulma'

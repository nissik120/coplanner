import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {auth} from './firebase/init.js'

let app = ''

auth.onAuthStateChanged(user=>{
    if(!app){
        app = createApp(App)
        app.use(router)
        app.use(store)

        app.mount('#app')
    }
})

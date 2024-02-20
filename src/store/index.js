import {createStore } from 'vuex'
import authModule from './modules/authModule/index.js'
import counterModule from './modules/counterModule/index.js'


const store = createStore({
    modules: {
        guestCounterModule: counterModule,
        authModule: authModule
    }
})

export default store
import {createStore } from 'vuex'


const store = createStore({
    state(){
        return {
            guestCount: 0
        }
    },
    mutations:{    
        increment(state, payload){
            state.guestCount = state.guestCount+payload
        }
    },
    getters:{
        getCounter(state){
            return state.guestCount
        }
    }
})

export default store
const counterModule = {

    namespaced: true,

    state(){
        return {
            count: 0
        }
    },
    mutations:{    
        increment(state, payload){
            state.count = state.count+payload
        }
    },
    getters:{
        getCounter(state){
            return state.count
        }
    },
    actions:{
        increment(context, payload){
            context.commit('increment',payload)
        }        
    }

}

export default counterModule
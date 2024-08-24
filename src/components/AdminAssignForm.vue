<template>

    <form @submit.prevent="executeAdminElevate">

        <h1>Elevate User</h1>
        <div class="form-group">
            <label for="email">Candidate Email</label>
            <input type="email" name="email" id="email" required v-model="email">
        </div>
        <button type="submit">Process Request</button>    
    
    </form>

</template>

<script>

import { getFunctions, httpsCallable } from "firebase/functions"

export default {
    data(){
        return{
            email: ''
        }
    },
    methods:{
        executeAdminElevate(){
            //const adminEmail = this.email
            //console.log(typeof(adminEmail))

            const functions = getFunctions();
            const addAdminRole = httpsCallable(functions, 'addAdminRole')
            addAdminRole({ email: this.email }).then(res=>{
                console.log(res)
            })
        }
    }
}
</script>

<style lang="css" scoped>

</style>
<template>

    <form @submit.prevent="executeAdminElevate">

        <h1>Elevate User</h1>
        <div class="form-group">
            <label for="admin-email">Candidate Email</label>
            <input type="text" name="admin-email" id="admin-email" v-model="admin_email">
        </div>
        <button type="submit">Process Request</button>    
    
    </form>

</template>

<script>

import functions from "../firebase/init.js"
import httpsCallable from "firebase/functions"

export default {
    data(){
        return{
            admin_email: ""
        }
    },
    methods:{
        executeAdminElevate(){
            const adminEmail = this.admin_email
            const addAdminRole = httpsCallable(functions, 'addAdminRole')
            addAdminRole({ email: adminEmail }).then(res=>{
                console.log(res)
            })


        }
    }
}
</script>

<style lang="css" scoped>

</style>
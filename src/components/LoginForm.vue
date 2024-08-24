<template>
    <form @submit.prevent="handleLogIn">
    <h2>Log in</h2>

        <div class="form-group">      
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="off" placeholder="E.g. abc@xyz.com" required v-model="email">
        </div>

        <div class="form-group">      
            <label for="password">Password</label>
            <input id="password" name="password" type="password" placeholder="At least 6 chars" required v-model="password">
        </div>

        <button type="submit">Log in</button>

    </form>
</template>
  
<script>
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  
  export default {
    emits: ['loggedIn'],
    data() {
      return {
        email:    '',
        password: ''
      }
    },
    setup(){
      return {
        ...mapActions('authModule', ['logIn']),
      }
    },
    methods: {
      
      handleLogIn(){
        let currentEmail = this.email
        let currentPassword = this.password

        this.logIn({currentEmail, currentPassword})
        .then(()=>{
          // emit event for member area
          console.log("Success")
          this.$emit('loggedIn')          
        })

      }
/*       logIn() {s
        // login user
        signInWithEmailAndPassword(auth,this.email,this.password)
        .then(() => {
          // emit event for member area
          console.log("Success")
          this.$emit('loggedIn')
        })
      } */

    }
  }
</script>
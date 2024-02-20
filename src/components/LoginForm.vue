<template>
    <form @submit.prevent="logIn">
    <h2>Log in</h2>

        <div class="form-group">      
            <label for="email">Email</label>
            <input type="email" placeholder="E.g. abc@xyz.com" required v-model="email">
        </div>

        <div class="form-group">      
            <label for="password">Password</label>
            <input type="password" placeholder="At least 6 chars" required v-model="password">
        </div>

        <button type="submit">Log in</button>

    </form>
  </template>
  
  <script>
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  
  export default {
    emits: ['loggedIn'],
    data() {
      return {
        email:    '',
        password: ''
      }
    },
    methods: {
      logIn() {
        // login user
        signInWithEmailAndPassword(auth,this.email,this.password)
        .then(() => {
          // emit event for member area
          console.log("Success")
          this.$emit('loggedIn')
        })


      }

    }
  }
  </script>
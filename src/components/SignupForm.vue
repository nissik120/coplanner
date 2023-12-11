<template>
    <form @submit.prevent="signUp">
        <h2>Sign Up</h2>
        <div class="form-group">      
            <label for="username">Username</label>
            <input type="text" placeholder="Username" required v-model="username">
        </div>
      
        <div class="form-group">      
            <label for="email">Email</label>
            <input type="email" placeholder="E.g. abc@xyz.com" required v-model="email">
        </div>

        <div class="form-group">      
            <label for="password">Password</label>
            <input type="password" placeholder="At least 6 chars" required v-model="password">
        </div>
        <button>Sign Up</button>
    </form>
  </template>
  
  <script>
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
  import { auth } from '../firebase/init.js'
  
  export default {
    // register event to emit
    emits: ['loggedIn'],
    data() {
      return {
        username: '',
        email:    '',
        password: ''
      }
    },
    methods: {
      signUp() {
        // register and login user
        createUserWithEmailAndPassword(auth,this.email,this.password)
        .then(() => {
  
          // update 'displayName'
          updateProfile(auth.currentUser, {
            displayName: this.username
          })
          .then(() => {
            // emit event
            this.$emit('loggedIn')
          })
  
        })
      }
    }
  }
  </script>
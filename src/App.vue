<script>
import { RouterLink, RouterView } from 'vue-router'
import DashboardView from './views/DashboardView.vue';
import SignupForm from './components/SignupForm.vue'
import LoginForm from './components/LoginForm.vue'
import { auth } from './firebase/init.js'
import {signOut} from 'firebase/auth';

export default {
  components: { SignupForm, LoginForm, DashboardView },
  data() {
    return {
      isLoggedIn: false,
      showLogin: true,
      isAdmin: false
    }
  },
  beforeUpdate() {
    if (auth.currentUser) {
    }
  },
  methods:{
    signOut(){
      signOut(auth).then(()=>{
        this.isLoggedIn = false
      })
    }
  }
}

</script>

<template>
  <div v-if="!isLoggedIn">

    <div class="header-brand">
      <img alt="Vue logo" class="logo" src="@/assets/logo-collabora.svg" width="125" height="125" />
      <!-- <img alt="CollaboraPlan Logo" class="logo" src="/assets/logo-collabora.svg" width="125" height="125"> -->
      <h1>Promoting Synchronized Educational Spaces</h1>
    </div>
    <!-- login -->
    <template v-if="showLogin">
      <LoginForm @loggedIn="isLoggedIn = true"/>
      <p>No account yet? <span @click="showLogin=false">Sign up</span> instead.</p>
    </template>
    <!-- or register -->
    <template v-else>
      <!-- listen for event -->
      <SignupForm @loggedIn="isLoggedIn = true"/>
      <p>Already registered? <span @click="showLogin=true">Login</span> instead.</p>
    </template>
  </div>
  <!-- is logged in -->
  <div v-else>
    <DashboardView/>
  </div>
  
  <hr class="footer">
  
  <div class="footer">
    <p>&copy; 2023 nVision Digital | CollaboraPlan</p>
    <button v-if="isLoggedIn" @click="signOut">Logout</button>

  </div>
</template>
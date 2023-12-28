<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'

export default {
  methods:{
    increment(){
      this.$store.commit('increment', 2)
    }
  }
}

</script>

<template>
  <RouterView/>
  
  <hr class="footer">
  <div class="footer">
    <p>&copy; 2023 nVision Digital | <RouterLink to="/">CollaboraPlan</RouterLink> </p>
    <p><RouterLink to="/about">About Us</RouterLink> - <RouterLink to="/legal">Legal</RouterLink></p>
  </div>

  <p>Guest Count: {{ $store.state.guestCount }}</p>
  <button @click="increment">Add Guest</button>

</template>

<style>

.router-link-exact-active{
  color: var(--link-hover-color);
}

</style>
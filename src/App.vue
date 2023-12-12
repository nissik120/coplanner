<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'

export default {

}

</script>

<template>
  <RouterView/>
  
  <hr class="footer">
  <div class="footer">
    <p>&copy; 2023 nVision Digital | <RouterLink to="/">CollaboraPlan</RouterLink> </p>
    <p><RouterLink to="/about">About Us</RouterLink></p>
  </div>

</template>

<style>

.router-link-exact-active{
  color: var(--link-hover-color);
}

</style>
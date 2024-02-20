<script>
import { RouterLink, RouterView } from 'vue-router'
import HomeView from './views/HomeView.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  methods:{
    ...mapActions('guestCounterModule', ['increment'])
  },
  computed:{
    ...mapGetters('guestCounterModule', ['getCounter'])
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

  <p>Guest Count: {{ getCounter }}</p>
  <button @click.prevent="increment(1)">Add Guest</button>

</template>

<style>

.router-link-exact-active{
  color: var(--link-hover-color);
}

</style>
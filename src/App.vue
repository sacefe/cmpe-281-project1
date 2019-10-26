<template>
  <div id="app">
    <div id="nav">
        <navbar />
    </div>
    <router-view />
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
// import {  } from 'aws-amplify-vue'
import { components } from 'aws-amplify-vue'
export default {
  components: {
    Navbar,
    ...components
  }
}
</script>


<style lang="scss">
@import '@/scss/app.scss';
</style>

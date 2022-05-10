<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
    <nuxt />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TheHeader from '@/components/navigation/TheHeader'
import TheSidenav from '@/components/navigation/TheSidenav'

export default {
  components: {
    TheHeader,
    TheSidenav,
  },
  middleware: 'load-auth',
  data() {
    return {
      displaySidenav: false,
    }
  },
  methods: {
    ...mapActions(['loadAuth']),
  },
  created() {
    this.loadAuth()
  },
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin: 0;
}
</style>

<template>
  <div id="app">
    <router-view />
    <Player />
  </div>
</template>

<script>
import Player from '@/components/Player'
export default {
  name: 'App',
  components: {
    Player
  }
}
</script>

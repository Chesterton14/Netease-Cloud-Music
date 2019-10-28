<template>
  <div class="Layout">
    <div class="main">
      <router-view />
    </div>
    <div class="nav-bar-main">
      <TabBar />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar/index.vue'

export default {
  components: {
    TabBar
  }
}
</script>

<style lang="scss">
.Layout{
  width: 100%;
  height: 100%;
  .main{
    width: 100%;
    height: 100%;
  }
  .nav-bar-main{
    position: fixed;
    width: 100%;
    height: 5.5rem;
    left:0;
    bottom:0;
  }
}

</style>

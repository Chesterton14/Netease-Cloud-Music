<template>
  <div class="tab-bar">
    <div
      v-for="item in list"
      :key="item.title"
      class="tab-bar-item"
      @click="onClick(item)"
    >
      <router-link :to="item.url">
        <div class="tab-bar-item-icon">
          <svg-icon
            v-show="!item.isActive"
            :icon-class="item.icon"
            :class="{active:item.isActive}"
          />
          <svg-icon
            v-show="item.isActive"
            :icon-class="item.selectIcon"
            :class="{active:item.isActive}"
          />
        </div>
        <div
          class="tab-bar-item-title"
          :class="{active:item.isActive}"
        >
          {{ item.title }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      list: [
        {
          icon: 'discover',
          selectIcon: 'discover-red',
          title: '发现',
          url: '/discover',
          isActive: true
        },
        {
          icon: 'video',
          selectIcon: 'video-red',
          title: '视频',
          url: '/video',
          isActive: false
        },
        {
          icon: 'music',
          selectIcon: 'music-red',
          title: '我的',
          url: '/music',
          isActive: false
        },
        {
          icon: 'team',
          selectIcon: 'team-red',
          title: '云村',
          url: '/team',
          isActive: false
        },
        {
          icon: 'user',
          selectIcon: 'user-red',
          title: '账号',
          url: '/user',
          isActive: false
        }
      ]
    }
  },
  watch: {
    $route() {
      console.log(this.$route)
    }
  },
  methods: {
    onClick(e) {
      this.list.forEach(item => { item.isActive = false })
      e.isActive = true
    }
  }
}
</script>

<style lang='scss'>
.tab-bar{
  width: 100%;
  height: 5.5rem;
  background-color: #fafafa;
  .tab-bar-item{
    display: inline-block;
    width: 20%;
    height: 100%;
    text-align: center;
    color: #909399;
    cursor: pointer;
    .active{
      color: #d81e06 !important;
    }
    .tab-bar-item-icon{
      width: 100%;
      height: 60%;
      font-size: 2.4rem;
      margin-top: 0.5rem;
    }
    .tab-bar-item-title{
      width: 100%;
      height: 40%;
      font-size: 0.9rem;
    }
  }
}
</style>

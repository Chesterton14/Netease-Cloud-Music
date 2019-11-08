<template>
  <div class="detail-container">
    <div class="detail-nav">
      <div class="nav-top">
        <div class="nav-left">
          <svg-icon icon-class="back" />
        </div>
        <div class="nav-title">歌单</div>
      </div>
      <div class="detail-bg">
        <div class="bg-img">
          <img v-lazy="coverImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/playlist'
export default {
  data() {
    return {
      detailData: [],
      coverImg: ''
    }
  },
  watch: {
    $route() {
      getPlaylistDetail({ id: this.$route.params.id }).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    getPlaylistDetail({ id: this.$route.params.id }).then(res => {
      console.log(res)
      this.coverImg = res.playlist.coverImgUrl
    })
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.detail-container{
  .detail-nav{
    background-image: radial-gradient(#d2d2d2, #a7a7a7, #6e6e6e);
    .nav-top{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .nav-left{
      font-size: 2.5rem;
      padding: 1rem;
    }
    .nav-title{
      color: #fff;
      font-size: 1.5rem;
    }
    .detail-bg{
    padding: 1rem;
    .bg-img{
      img{
        width:35%;
        border-radius: 0.5rem;
      }
    }
  }
  }

}
</style>

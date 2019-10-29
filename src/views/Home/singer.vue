<template>
  <div class="singer-container">
    <div class="singer-nav">
      <div @click="goBack"><svg-icon icon-class="back" /></div>
      <div class="nav-title">歌手分类</div>
      <div @click="goBack"><svg-icon icon-class="rank" />></div>
    </div>
    <div style="width:100%;height:5.5rem" />
    <div class="singer-category">
      <div class="singer-country">
        <div class="country-item">华语</div>
        <div class="country-item">欧美</div>
        <div class="country-item">日本</div>
        <div class="country-item">韩国</div>
        <div class="country-item">其他</div>
      </div>
      <div class="singer-sex">
        <div class="sex-item">男</div>
        <div class="sex-item">女</div>
        <div class="sex-item">乐队/组合</div>
      </div>
    </div>
    <div class="singer-title">热门歌手</div>
    <div class="singer-main">
      <div v-for="singer in topSingerList" :key="singer.id" class="singer-item">
        <div class="singer-pic">
          <img :src="singer.picUrl">
        </div>
        <div class="singer-name">
          {{ singer.name }}
          <span v-if="singer.alias.length>0">({{ singer.alias[0] }})</span>
          <svg-icon v-if="singer.accountId" icon-class="account" style="font-size:1.3rem" />
        </div>
      </div>
    </div>
    <div class="load-more" @click="loadMore">加载更多</div>
    <div style="width:100%;height:5.5rem" />
  </div>
</template>

<script>
import { getTopArtists } from '@/api/discover'
export default {
  data() {
    return {
      params: {
        offset: 0,
        limit: 20
      },
      topSingerList: []
    }
  },
  created() {
    this.params.offset = 0
    getTopArtists(this.params).then(res => {
      this.topSingerList = res.artists
    })
  },
  methods: {
    initData() {
    },
    loadMore() {
      this.params.offset = this.params.offset + this.params.limit
      getTopArtists(this.params).then(res => {
        console.log(res)
        res.artists.map(item => {
          this.topSingerList.push(item)
        })
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.singer-container{
  width: 100%;
  position: relative;
  .singer-nav{
    position:fixed;
    top:0;
    left:0;
    width: 100%;
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:$neteaseRed;
    .nav-title{
      flex:2;
      font-size: 1.5rem;
      text-align: center;
      color: #ffffff;
    }
    .svg-icon {
      font-size: 2.5rem;
      padding: 0 1rem;
    }
  }
  .singer-category{
    width:100%;
    padding: 1rem 0;
    .singer-country{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .country-item{
        color:#272727;
        padding: 1rem;
        font-size:1.3rem;
      }
    }
    .singer-sex{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .sex-item{
        color:#272727;
        padding: 1rem 2.4rem 1rem 1rem;
        font-size:1.3rem;
      }
    }
  }
  .singer-title{
    background-color:#fafafa;
    padding: 1rem 1rem;
    color:#272727;
    font-size:1.2rem;
  }
  .singer-main{
    .singer-item{
      display: flex;
      align-items: center;
      padding: 1rem;
      .singer-pic{
        img{
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
        }
      }
      .singer-name{
        text-align: center;
        font-size: 1.3rem;
        padding: 0 1rem;
      }
    }
  }
  .load-more{
    width:100%;
    box-sizing: border-box;
    padding: 2rem;
    text-align: center;
    font-size: 1.5rem;
    color:#646464;
  }
}
</style>

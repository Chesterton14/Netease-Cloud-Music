<template>
  <div class="discovey-container">
    <div class="discovery-nav">
      <svg-icon icon-class="mike" class="left-icon " />
      <input v-model="keyword" type="text" :placeholder="showKeyword">
      <svg-icon icon-class="rank" class="right-icon " />
    </div>
    <div class="swiper-container">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
          <img class="swiper-img" :src="slide.pic">
        </swiper-slide>
        <div slot="pagination" class="swiper-pagination" />
      </swiper>
    </div>
    <div class="button-container">
      <div class="button-item">
        <div class="item-icon"><svg-icon icon-class="recommend" /></div>
        <span class="item-title">每日推荐</span>
      </div>
      <div class="button-item">
        <div class="item-icon"><svg-icon icon-class="songList" /></div>
        <span class="item-title">歌单</span>
      </div>
      <div class="button-item">
        <div class="item-icon"><svg-icon icon-class="rankList" /></div>
        <span class="item-title">排行榜</span>
      </div>
      <div class="button-item">
        <div class="item-icon"><svg-icon icon-class="radio" /></div>
        <span class="item-title">电台</span>
      </div>
      <div class="button-item">
        <div class="item-icon"><svg-icon icon-class="FM" /></div>
        <span class="item-title">私人FM</span>
      </div>
    </div>
    <div class="songList-nav">
      <div class="nav-title">推荐歌单</div>
      <div class="nav-button">歌单广场</div>
    </div>
    <div class="songList-square">
      <div v-for="songList in songListArray" :key="songList.id" class="songList-item">
        <div class="item-img">
          <img :src="songList.picUrl" alt="">
        </div>
        <span class="item-title">{{ songList.name }}</span>
      </div>
    </div>
    <div class="newest-nav">
      <div class="nav-title">新碟</div>
      <div class="nav-button">更多新碟</div>
    </div>
    <div class="newest-container">
      <div v-for=" alnum in newestAlbumList" :key="alnum.id" class="newest-item">
        <div class="item-img">
          <img :src="alnum.picUrl">
        </div>
        <span class="item-title">{{ alnum.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { searchDefault, getBanner, getSongList, getNewestAlbum } from '@/api/discover'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      keyword: '',
      showKeyword: '',
      swiperOption: {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet'
        }
      },
      swiperSlides: [],
      songListArray: [],
      newestAlbumList: []
    }
  },
  mounted() {
    this.getBannerImg()
  },
  created() {
    this.getSearchDefault()
    this.getRecSongList()
    this.getNewestAlbumList()
  },
  methods: {
    getSearchDefault() {
      searchDefault().then(res => {
        const { data } = res
        this.showKeyword = data.showKeyword
      })
    },
    getBannerImg() {
      getBanner().then(res => {
        this.swiperSlides = res.banners
      })
    },
    getRecSongList() {
      getSongList().then(res => {
        this.songListArray = res.result
      })
    },
    getNewestAlbumList() {
      getNewestAlbum().then(res => {
        this.newestAlbumList = res.albums.slice(0, 3)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed:#d81e06;
.discovey-container{
  margin-top: 5.5rem;
  margin-bottom: 6.5rem;
  .discovery-nav{
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height: 5.5rem;
    line-height:5.5rem;
    z-index:1000;
    background-color: $neteaseRed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input{
      flex:2;
      height: 2.5rem;
      padding: 0.5rem 2rem;
      border-radius: 1.5rem;
      border: none;
      outline:none;
      background-color: #e35454;
      text-align: center;
      color:#ffffff;
      font-size:1.2rem;
    }
    input::placeholder{
      color:#ffffff;
    }
    .svg-icon{
      font-size: 2.5rem;
      padding: 0 1rem;
    }
  }
  .swiper-container{
    .swiper-img{
      width: 100%;
    }
  }
  .button-container{
    width:100%;
    display: flex;
    margin-top:1.5rem;
    justify-content: space-around;
    .button-item{
      text-align: center;
      color:#555555;
      .item-icon{
        width: 4rem;
        height: 4rem;
        margin-bottom: 1rem;
        border-radius: 50%;
        background-color: $neteaseRed;
        .svg-icon{
          font-size: 2.5rem;
          margin-top: 0.75rem;
        }
      }
      .item-title{
        font-size:1rem;
      }
    }
  }
  .songList-nav{
    widows: 100%;
    height:2rem;
    margin-top: 1rem;
    padding: 1rem;
    border-top: 1px solid #dfdfdf;
    display: flex;
    justify-content:space-between;
    align-items:center;
    .nav-title{
      margin-top: 1rem;
      font-size: 1.7rem;
      font-weight: 500;
    }
    .nav-button{
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      padding: 0.5rem 1rem;
    }
  }
  .songList-square{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    .songList-item{
      box-sizing: border-box;
      width:33.33%;
      padding: 1rem;
      .item-img{
        img{
          width: 100%;
        }
      }
    }
    .item-title{
      display: inline-block;
      width:100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      padding-bottom:0;
      margin-bottom:0.3rem;
    }
  }
  .newest-nav{
    widows: 100%;
    height:2rem;
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    justify-content:space-between;
    align-items:center;
    .nav-title{
      margin-top: 1rem;
      font-size: 1.7rem;
      font-weight: 500;
    }
    .nav-button{
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      padding: 0.5rem 1rem;
    }
  }
  .newest-container{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    .newest-item{
      box-sizing: border-box;
      width:33.33%;
      padding: 1rem;
      .item-img{
        img{
          width: 100%;
        }
      }
      .item-title{
        display: inline-block;
        width:100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        padding-bottom:0;
        margin-bottom:0.3rem;
      }
    }
  }
}
</style>

<style>
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 2px;
}
.swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 100%;
    background: #000;
}
.swiper-pagination-bullet-active{
  background-color: #d81e06;
}
</style>

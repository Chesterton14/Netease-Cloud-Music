<template>
  <div class="discovey-container">
    <!-- 顶部导航 -->
    <div class="discovery-nav">
      <svg-icon v-if="!isSearch" icon-class="mike" />
      <div v-if="isSearch" class="left-icon" @click="backToMain">
        <svg-icon icon-class="back" />
      </div>
      <input v-model="keyword" type="text" :placeholder="showKeyword" @focus="onFocus">
      <svg-icon v-if="!isSearch" icon-class="rank" class="right-icon" />
      <div v-if="isSearch" class="left-icon" @click="toSingerPage">
        <svg-icon icon-class="singer" />
      </div>
    </div>
    <!-- 发现页主页 -->
    <div v-show="!isSearch" ref="wrapper" class="wrapper">
      <div class="content">
        <div style="width:100%;height:5.5rem;background:#d81e06" />
        <div class="pull-container" />
        <div class="swiper-container">
          <swiper v-if="swiperSlides.length" :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
              <img class="swiper-img" :src="slide.pic">
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination" />
          </swiper>
        </div>
        <div class="button-container">
          <div class="button-item">
            <div class="item-icon" @click="$router.push('/dailysong')">
              <svg-icon icon-class="recommend" />
            </div>
            <span class="item-title">每日推荐</span>
          </div>
          <div class="button-item" @click="toSongListPage">
            <div class="item-icon">
              <svg-icon icon-class="songList" />
            </div>
            <span class="item-title">歌单</span>
          </div>
          <div class="button-item" @click="toRankListPage">
            <div class="item-icon">
              <svg-icon icon-class="rankList" />
            </div>
            <span class="item-title">排行榜</span>
          </div>
          <div class="button-item" @click="toRadioPage">
            <div class="item-icon">
              <svg-icon icon-class="radio" />
            </div>
            <span class="item-title">电台</span>
          </div>
          <div class="button-item">
            <div class="item-icon">
              <svg-icon icon-class="FM" />
            </div>
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
              <img :src="songList.picUrl" alt>
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
        <div class="bottom-content" />
      </div>
    </div>
    <!-- 搜索建议 -->
    <div v-show="isSearch" ref="searchWrapper" class="search-container">
      <div class="search-content">
        <div style="width:100%;height:5.5rem;" />
        <div class="search-title">热搜榜</div>
        <div class="search-list">
          <div v-for="(search,index) in hotSearchList" :key="search.score" class="search-item">
            <div class="item-left">
              <div class="item-rank" :class="{top3:index < 3}">{{ index + 1 }}</div>
              <div class="item-main">
                <div class="main-search-word" :class="{searchTop3:index < 3}">
                  {{ search.searchWord }}
                  <img v-if="search.iconUrl" :src="search.iconUrl">
                </div>
                <div class="main-search-content">{{ search.content }}</div>
              </div>
            </div>
            <div class="item-right">
              <div class="item-score">{{ search.score }}</div>
            </div>
          </div>
        </div>
        <div style="width:100%;height:5.5rem" />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {
  searchDefault,
  getBanner,
  getSongList,
  getNewestAlbum,
  getHotSearch
} from '@/api/discover'
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
        effect: 'fade',
        autoplay: true,
        loop: true,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          bulletClass: 'swiper-pagination-bullet'
        }
      },
      swiperSlides: [],
      songListArray: [],
      newestAlbumList: [],
      isSearch: false,
      hotSearchList: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const searchDefaultData = await searchDefault()
      const bannerImg = await getBanner()
      const songList = await getSongList()
      const newestAlbum = await getNewestAlbum()
      this.showKeyword = searchDefaultData.data.showKeyword
      this.swiperSlides = bannerImg.banners
      this.songListArray = songList.result
      this.newestAlbumList = newestAlbum.albums.slice(0, 3)
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true })
      })
    },
    onFocus() {
      this.isSearch = true
      getHotSearch().then(res => {
        this.hotSearchList = res.data
        this.$nextTick(() => {
          this.searchScroll = new BScroll(this.$refs.searchWrapper, { click: true })
        })
      })
    },
    backToMain() {
      this.isSearch = false
    },
    toSingerPage() {
      this.$router.push('singer')
    },
    toSongListPage() {},
    toRankListPage() {},
    toRadioPage() {}
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.discovey-container {
  position: fiex;
  width: 100%;
  height: 100%;
  background: #fff;
  .wrapper {
    width: 100%;
    height: 100%;
  }
  .discovery-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.5rem;
    line-height: 5.5rem;
    z-index: 1000;
    background-color: $neteaseRed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      flex: 2;
      height: 2.5rem;
      padding: 0.5rem 2rem;
      border-radius: 1.5rem;
      border: none;
      outline: none;
      background-color: #e35454;
      text-align: center;
      color: #ffffff;
      font-size: 1.2rem;
    }
    input::placeholder {
      color: #ffffff;
    }
    .svg-icon {
      font-size: 2.5rem;
      padding: 0 1rem;
    }
    .left-icon {
      margin-top: 1rem;
    }
  }
  .pull-container {
    position: absolute;
    top: -30vh;
    z-index: -10;
    background: #d81e06;
    width: 100%;
    height: 50vh;
    vertical-align: inherit;
  }
  .swiper-container {
    text-align: center;
    .swiper-img {
      width: 90%;
      border-radius: 5px;
      border: none;
    }
  }
  .button-container {
    width: 100%;
    display: flex;
    margin-top: 1.5rem;
    justify-content: space-around;
    .button-item {
      text-align: center;
      color: #555555;
      .item-icon {
        width: 4rem;
        height: 4rem;
        margin-bottom: 1rem;
        border-radius: 50%;
        background-color: $neteaseRed;
        .svg-icon {
          font-size: 2.5rem;
          margin-top: 0.75rem;
        }
      }
      .item-title {
        font-size: 1rem;
      }
    }
  }
  .songList-nav {
    widows: 100%;
    height: 2rem;
    margin-top: 1rem;
    padding: 1rem;
    border-top: 1px solid #dfdfdf;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .nav-title {
      margin-top: 1rem;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .nav-button {
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      font-size: 1.2rem;
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
  .songList-square {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .songList-item {
      box-sizing: border-box;
      width: 33.33%;
      padding: 1rem;
      .item-img {
        img {
          width: 100%;
        }
      }
    }
    .item-title {
      display: inline-block;
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      padding-bottom: 0;
      margin-bottom: 0.3rem;
    }
  }
  .newest-nav {
    widows: 100%;
    height: 2rem;
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    .nav-title {
      margin-top: 1rem;
      font-size: 1.5rem;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .nav-button {
      border: 1px solid #dfdfdf;
      border-radius: 10px;
      font-size: 1.2rem;
      margin-top: 0.5rem;
      padding: 0.5rem 1rem;
    }
  }
  .newest-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
    .newest-item {
      box-sizing: border-box;
      width: 33.33%;
      padding: 1rem;
      .item-img {
        img {
          width: 100%;
        }
      }
      .item-title {
        display: inline-block;
        width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        padding-bottom: 0;
        margin-bottom: 0.3rem;
      }
    }
  }
  .bottom-content {
    width: 100%;
    height: 5rem;
  }
  .search-container {
    position: fixed;
    width: 100%;
    height: 100%;
    .search-title {
      padding: 2rem 2rem 1rem 2rem;
      font-size: 1.3rem;
    }
    .search-list {
      width: 100%;
      .search-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        .item-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .item-rank {
            text-align: center;
            font-size: 1.5rem;
            width: 2rem;
            padding-right: 1.5rem;
            color: #868686;
          }
          .top3 {
            color: $neteaseRed;
          }
          .item-main {
            .main-search-word {
              font-size: 1.4rem;
              font-weight: 500;
              letter-spacing: 1px;
              padding-bottom: 0.5rem;
              img {
                height: 1.2rem;
              }
            }
            .searchTop3 {
              font-weight: 550;
            }
            .main-search-content {
              font-size: 1.2rem;
              color: #868686;
            }
          }
        }
        .item-right {
          .item-score {
            text-align: center;
            font-size: 1.2rem;
            color: #868686;
          }
        }
      }
    }
  }
}
</style>

<style>
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 2px;
}
.swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
}
.swiper-pagination-bullet-active {
  background-color: #d81e06;
}
</style>

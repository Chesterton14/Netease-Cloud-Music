<template>
  <div class="discovey-container">
    <!-- 顶部导航 -->
    <div class="discovery-nav">
      <svg-icon v-if="!isSearch && !isResult" icon-class="mike" />
      <div v-if="isSearch || isResult" class="left-icon" @click="goBack()">
        <svg-icon icon-class="back" />
      </div>
      <input v-model="keyword" type="text" :placeholder="showKeyword" @focus="onFocus">
      <div @click="$store.commit('SET_SONGSHOW')">
        <svg-icon v-if="!isSearch" icon-class="rank" class="right-icon" />
      </div>
      <div v-if="isSearch" class="left-icon" @click="$router.push('singer')">
        <svg-icon icon-class="singer" />
      </div>
    </div>
    <!-- 发现页主页 -->
    <div v-show="!isSearch" ref="wrapper" class="wrapper">
      <div class="content">
        <div style="width:100%;height:5.5rem;background:#d81e06" />
        <div class="pull-container" />
        <div class="swiper-container" :style="bgStyle">
          <swiper v-if="swiperSlides.length" :options="swiperOption">
            <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
              <img v-lazy="slide.pic" class="swiper-img">
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
          <div class="button-item" @click="$router.push('/songlist')">
            <div class="item-icon">
              <svg-icon icon-class="songList" />
            </div>
            <span class="item-title">歌单</span>
          </div>
          <div class="button-item" @click="$router.push('/toplist')">
            <div class="item-icon">
              <svg-icon icon-class="rankList" />
            </div>
            <span class="item-title">排行榜</span>
          </div>
          <div class="button-item">
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
          <div class="nav-button" @click="$router.push('/songlist')">歌单广场</div>
        </div>
        <div class="songList-square">
          <div v-for="songList in songListArray" :key="songList.id" class="songList-item">
            <div class="item-img">
              <img v-lazy="songList.picUrl">
              <div class="play-times">
                <svg-icon icon-class="playTimes" />
                <span v-if="songList.playCount.toString().length >5">
                  {{ songList.playCount.toString().slice(0,songList.playCount.toString().length-4) }}
                  万
                </span>
                <span v-else>
                  {{ songList.playCount }}
                </span>
              </div>
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
              <img v-lazy="alnum.picUrl">
            </div>
            <span class="item-title">{{ alnum.name }}</span>
          </div>
        </div>
        <div class="bottom-content" />
      </div>
    </div>
    <!-- 热搜列表 -->
    <div v-show="isSearch" ref="searchWrapper" class="search-container">
      <div class="search-content">
        <div style="width:100%;height:5.5rem;" />
        <div class="search-title">热搜榜</div>
        <div class="search-list">
          <div v-for="(search,index) in hotSearchList" :key="search.score" class="search-item" @click="hotToSearch(search)">
            <div class="item-left">
              <div class="item-rank" :class="{top3:index < 3}">{{ index + 1 }}</div>
              <div class="item-main">
                <div class="main-search-word" :class="{searchTop3:index < 3}">
                  {{ search.searchWord }}
                  <img v-if="search.iconUrl" v-lazy="search.iconUrl">
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
    <!-- 搜索建议页 -->
    <div v-if="showSuggest" class="suggest-container">
      <div class="suggest-default" @click="toSearchResult()">搜索"{{ keyword }}"</div>
      <div v-for="item in searchResult" :key="item.keyword" class="suggest-item" @click="toSearchResult(item)">
        <svg-icon icon-class="searchIcon" />
        {{ item.keyword }}
      </div>
    </div>
    <SearchResult v-if="isResult" :keywords="keyword" />
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
import { searchSuggest } from '@/api/search'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import SearchResult from './searchResult'

export default {
  name: 'Home',
  components: {
    swiper,
    swiperSlide,
    SearchResult
  },
  data() {
    return {
      keyword: '',
      keywordProps: '',
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
      hotSearchList: [],
      bgStyle: {
        backgroundImage: 'url(' + require('../../assets/redbg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 5rem'
      },
      searchResult: [],
      isResult: false,
      showSuggest: false
    }
  },
  watch: {
    keyword() {
      if (!this.keyword) return
      this.showSuggest = true
      const params = {
        keywords: this.keyword,
        type: 'mobile'
      }
      searchSuggest(params).then(res => {
        this.searchResult = res.result.allMatch
      })
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
      this.newestAlbumList = newestAlbum.albums.slice(0, 6)
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true })
      })
    },
    onFocus() {
      if (this.keyword !== '') {
        this.showSuggest = true
      }
      this.isSearch = true
      getHotSearch().then(res => {
        this.hotSearchList = res.data
        this.$nextTick(() => {
          this.searchScroll = new BScroll(this.$refs.searchWrapper, { click: true })
        })
      })
    },
    goBack() {
      if (this.isSearch) {
        this.isResult = false
        this.isSearch = false
      }
      if (this.isResult) {
        this.isResult = false
        this.isSearch = true
        this.keyword = ''
      }
    },
    toSearchResult(item) {
      this.isSearch = false
      this.isResult = true
      this.showSuggest = false
      if (item) {
        this.keyword = item.keyword
        this.keywordProps = item.keyword
      } else {
        this.keywordProps = this.keyword
      }
    },
    hotToSearch(item) {
      console.log(item)
      this.keyword = item.searchWord
      this.keywordProps = item.searchWord
      this.isSearch = false
      this.isResult = true
      setTimeout(() => {
        this.showSuggest = false
      })
    }
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
    .right-icon{
      margin-top: 1rem;
    }
  }
  .pull-container {
    position: absolute;
    top: -20rem;
    z-index: -10;
    background: #d81e06;
    width: 100%;
    height: 30rem;
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
      position: relative;
      .item-img {
        img {
          width: 100%;
          border-radius: 0.5rem;
        }
        .play-times{
          position: absolute;
          top:1.3rem;
          right:1.5rem;
          font-size: 1rem;
          color: #fff;
          .svg-icon{
            font-size:1.2rem;
          }
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
  .play-times{
      position: absolute;
      top:1.3rem;
      right:1.5rem;
      font-size: 1rem;
      color: #fff;
      .svg-icon{
        font-size:1.2rem;
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
          border-radius: 0.5rem;
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
  .suggest-container{
    position:fixed;
    top: 5.5rem;
    left: 1.5rem;
    right: 1.5rem;
    z-index: 10000;
    background-color: #fff;
    border-top: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .suggest-item{
      padding: 1.5rem 1rem;
      font-size: 1.3rem;
      color: #707070;
      border-bottom: 1px solid #f5f5f5;
    }
    div:last-child{
      border-bottom: none;
    }
    .svg-icon{
      padding-right: 1rem;
    }
    .suggest-default{
      padding: 1.5rem 1rem;
      font-size: 1.3rem;
      color: #3b70b3;
      border-bottom: 1px solid #f5f5f5;
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

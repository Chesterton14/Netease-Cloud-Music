<template>
  <div class="songlist-container">
    <div class="songlist-nav">
      <div class="nav-left" @click="$router.push('/')"><svg-icon icon-class="back-b" /></div>
      <div class="nav-title">歌单广场</div>
      <div class="nav-right" @click="$store.commit('SET_SONGSHOW')"><svg-icon icon-class="rank-b" /></div>
    </div>
    <div ref="songlistCat" class="songlist-cat">
      <div class="songlist-content">
        <div
          v-for="item in songListCatData"
          :key="item.id"
          class="cat-item"
          :class="{active: item.isActive}"
          @click="catClick(item)"
        >{{ item.name }}</div>
      </div>
    </div>
    <div ref="songlistMain" class="songlist-main">
      <div class="main-content">
        <div v-if="!clickCat" class="swiper-container">
          <swiper v-if="swiperSlides.length" :options="swiperOption">
            <swiper-slide
              v-for="(slide, index) in swiperSlides"
              :key="index"
              style="border: 1px solid #f1f1f1;background-color: #fff"
            >
              <img v-lazy="slide.coverImgUrl" class="swiper-img">
              <div class="play-times">
                <svg-icon icon-class="playTimes" />
                <span v-if="slide.playCount.toString().length >5">
                  {{ slide.playCount.toString().slice(0,slide.playCount.toString().length-4) }}
                  万
                </span>
                <span v-else>
                  {{ slide.playCount }}
                </span>
              </div>
              <div class="songlist-name">
                {{ slide.name }}
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          v-for="songlist in songListData"
          :key="songlist.id"
          class="songlist-item"
          @click="toDetail(songlist)"
        >
          <img v-lazy="songlist.coverImgUrl">
          <div class="play-times">
            <svg-icon icon-class="playTimes" />
            <span v-if="songlist.playCount.toString().length >5">
              {{ songlist.playCount.toString().slice(0,songlist.playCount.toString().length-4) }}
              万
            </span>
            <span v-else>
              {{ songlist.playCount }}
            </span>
          </div>
          <div class="songlist-name">
            {{ songlist.name }}
          </div>
        </div>
        <div v-show="loading" class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
        <div style="width:100%;height:20rem" />
      </div>
    </div>
    <Loading :loading="fullLoading" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getHotSongListCat, getHotSongList } from '@/api/discover'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { debounce } from '@/utils/index'
import Loading from '@/components/Loading'

export default {
  components: {
    swiper,
    swiperSlide,
    Loading
  },
  data() {
    return {
      songListCatData: [],
      songListData: [],
      updateTime: undefined,
      loading: false,
      fullLoading: false,
      options: {
        limit: 15,
        before: undefined
      },
      clickCat: false,
      swiperOption: {
        effect: 'coverflow',
        mousewheel: true,
        slidesPerView: 3,
        centeredSlides: true,
        initialSlide: 1,
        coverflowEffect: {
          rotate: 10,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: false
        }
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'bullets',
        //   bulletClass: 'swiper-pagination-bullet'
        // }
      },
      swiperSlides: []
    }
  },
  created() {
    this.fullLoading = true
    getHotSongListCat().then(res => {
      this.songListCatData = res.tags
      this.songListCatData.map(item => { item.isActive = false })
      this.$nextTick(() => {
        this.songlistCatScroll = new BScroll(this.$refs.songlistCat, {
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: 'vertical'
        })
      })
    })
    getHotSongList({ limit: 15 }).then(res => {
      this.loading = true
      const { playlists } = res
      this.songListData = playlists.slice(3)
      this.loading = false
      this.fullLoading = false
      this.updateTime = playlists[playlists.length - 1].updateTime
      this.swiperSlides = playlists.slice(0, 3)
      this.$nextTick(() => {
        this.songlistScroll = new BScroll(this.$refs.songlistMain, {
          click: true,
          pullUpLoad: {
            threshold: 30
          }
        })
        this.songlistScroll.on('pullingUp', debounce(this.loadMore, 2000))
      })
    })
  },
  methods: {
    loadMore() {
      this.loading = true
      this.options.before = this.updateTime
      getHotSongList(this.options).then(res => {
        const { playlists } = res
        this.updateTime = playlists[playlists.length - 1].updateTime
        playlists.map(item => { this.songListData.push(item) })
        this.loading = false
        this.songlistScroll.finishPullUp()
      }).catch(err => {
        console.log(err)
        this.loadMore(this.options)
      })
    },
    catClick(cat) {
      this.clickCat = true
      this.loading = true
      this.songListData = null
      this.songListCatData.map(item => { item.isActive = false })
      cat.isActive = true
      getHotSongList({ cat: cat.name }).then(res => {
        const { playlists } = res
        this.songListData = playlists
        this.loading = false
        this.songlistScroll.off('pullingUp', this.loadMore)
      })
    },
    toDetail(item) {
      console.log(item)
      this.$router.push(`/playlistdetail/${item.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.songlist-container{
  width:100%;
  height: 100%;
  .songlist-nav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.5rem;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1000;
    .svg-icon{
      font-size: 2.5rem;
      padding: 0 1rem;
    }
    .nav-title{
      font-size: 1.5rem;
    }
  }
  .songlist-cat{
    position: fixed;
    top: 5.5rem;
    left: 0;
    width: 100%;
    overflow: hidden;
    background-color: #fafafa;
    border-bottom: 1px solid #f1f1f1;
    z-index: 1000;
    .songlist-content{
      width: 100rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      .cat-item{
        width:10rem;
        font-size:1.3rem;
        padding: 1rem;
        margin: 0 1rem;
        margin-top: 0.5rem;
      }
      .active{
        color:#d81e06;
        border-bottom: 1.5px solid #d81e06;
      }
    }
  }
  .songlist-main{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 10rem;
    left:0;
    z-index:10;
    .main-content{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      z-index:10;
      .swiper-container{
        img{
          width:100%;
          position: relative;
        }
        .play-times{
          position: absolute;
          top:0.5rem;
          right:0rem;
          font-size: 1rem;
          color: #fff;
          .svg-icon{
            font-size:1.2rem;
          }
        }
        .songlist-name{
          padding: 0.5rem 1rem;
        }
      }
      .songlist-item{
        width: 33.33%;
        box-sizing:border-box;
        padding: 1rem;
        position: relative;
        img{
          width: 100%;
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
        .songlist-name{
          width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
<style scoped>
.spinner {
  margin: 2rem auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 1rem;
  height: 1rem;
  background-color: #d81e06;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>

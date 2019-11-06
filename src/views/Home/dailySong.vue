<template>
  <div ref="wrapper" class="daily-song-container">
    <div class="content">
      <div class="daily-nav">
        <div @click="$router.push('/')"><svg-icon icon-class="back" /></div>
        <svg-icon icon-class="rank" />
      </div>
      <div class="date-container">
        <span style="font-size:4rem">{{ date }}</span>
        <span>/{{ month }}</span>
      </div>
      <div class="daily-main">
        <div class="main-nav">
          <div class="nav-container">
            <svg-icon icon-class="play" />
            <span>播放全部</span>
          </div>
        </div>
        <div v-for="item in songList" :key="item.id" class="main-item">
          <div class="item-container">
            <div class="item-img">
              <img v-lazy="item.song.album.picUrl">
            </div>
            <div class="item-info" @click="toPlayer(item)">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-detail">
                <span v-for="(artist, index) in item.song.artists" :key="artist.id">
                  {{ artist.name }}
                  <span v-if="index != item.song.artists.length - 1">/</span>
                </span>
                <span>- {{ item.song.album.name }}</span>
              </div>
            </div>
          </div>
          <div class="item-video">
            <svg-icon icon-class="video" />
          </div>
        </div>
      </div>
      <div style="width:100%;height:5.5rem" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getDailySong } from '@/api/discover'
export default {
  data() {
    return {
      songList: [],
      date: undefined,
      month: undefined
    }
  },
  created() {
    this.date = new Date().getDate().toString().length > 1 ? new Date().getDate() : '0' + new Date().getDate().toString()
    this.month = new Date().getMonth() + 1
    getDailySong().then(res => {
      this.songList = res.result
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, { click: true })
      })
    }).catch(error => { console.log(error) })
  },
  methods: {
    toPlayer(item) {
      const data = {
        img: item.song.album.picUrl,
        name: item.name,
        artists: []
      }
      item.song.artists.map(item => { data.artists.push(item.name) })
      this.$store.dispatch('getSongUrlX', { id: item.id }).then(res => {
        this.$store.dispatch('getSong', data).then(res => {
          this.$router.push('/player')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.daily-song-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin-bottom: 5.5rem;
  box-sizing: border-box;
  .daily-nav {
    width: 100%;
    height: 5.5rem;
    background-color: $neteaseRed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .svg-icon {
      font-size: 2.5rem;
      padding: 0 1rem;
    }
  }
  .date-container {
    height: 7.5rem;
    line-height: 5.5rem;
    background-color: $neteaseRed;
    padding-left:1rem;
    span {
      display: inline-block;
      font-size: 2.5rem;
      color: #ffffff;
    }
  }
  .daily-main{
    .main-nav{
      width:100%;
      background-color: $neteaseRed;
      .nav-container{
        padding: 1rem;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        background-color: #fff;
        .svg-icon{
          font-size:1.7rem;
        }
        span{
          font-size:1.4rem;
          padding-left:1rem;
        }
      }
    }
    .main-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:1.5rem 1rem;
      .item-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .item-img{
          img{
            width:4rem;
            border-radius: 5px;
          }
        }
        .item-info{
          width:22rem;
          padding-left:1rem;
          .item-name{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size:1.2rem;
            padding-bottom:1rem;
          }
          .item-detail{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size:1rem;
            color:#272727;
          }
        }
      }
      .item-video{
        .svg-icon{
          font-size:2rem;
        }
      }
    }
  }
}
</style>

<template>
  <div class="player-container" :class="{isShow: !songShow}">
    <div class="player-nav">
      <div class="nav-left" @click="$store.commit('SET_SONGSHOW')">
        <svg-icon icon-class="back" />
      </div>
      <div class="nav-title">
        <div style="font-size:1.5rem;padding-top:1rem;">{{ songName }}</div>
        <div style="font-size: 1rem;padding-top: 0.5rem;color: #bababa;">
          <span v-for="(art, index) in songArtists" :key="index">
            {{ art }}
            <span v-if="index != songArtists.length - 1">/</span>
          </span>
        </div>
      </div>
      <div class="nav-right">
        <svg-icon icon-class="share" />
      </div>
    </div>
    <audio id="MyAudio" ref="MyAudio" />
    <div class="song-img" :class="{active: isActive}">
      <img v-lazy="songImg" alt="">
    </div>
    <div class="button-container">
      <div class="player-button">
        <div>
          <svg-icon icon-class="like" />
        </div>
        <div>
          <svg-icon icon-class="download" />
        </div>
        <div>
          <svg-icon icon-class="said" />
        </div>
        <div>
          <svg-icon icon-class="more" />
        </div>
      </div>
      <div class="process-container">
        <div class="player-process">
          <div class="process-left">{{ currentTimeText }}</div>
          <div ref="load" class="load" />
          <div ref="point" class="process-point" />
          <div class="process-right">{{ duration }}</div>
        </div>
      </div>
      <div class="player-contronl">
        <div>
          <svg-icon icon-class="prev" />
        </div>
        <div @click="tapButton">
          <svg-icon v-if="!isPlay" class="start-icon" icon-class="start" />
          <svg-icon v-else class="pause-icon" icon-class="pause" />
        </div>
        <div>
          <svg-icon icon-class="next" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isActive: false,
      isPlay: false,
      duration: '00:00',
      durationTime: undefined,
      currentTime: undefined,
      currentTimeText: '00:00',
      timer: undefined,
      over: false,
      count: 0,
      m: '00',
      loadWidth: undefined
    }
  },
  computed: {
    ...mapGetters([
      'songUrl',
      'songImg',
      'songName',
      'songArtists',
      'songShow'
    ])
  },
  watch: {
    songUrl() {
      this.$refs.MyAudio.src = this.$store.state.songUrl
      this.count = 0
      this.over = false
      this.duration = '00:00'
      this.$refs.MyAudio.addEventListener('loadeddata', () => {
        this.$refs.MyAudio.play()
        this.isPlay = true
        this.isActive = true
      })
    },
    currentTime() {
      // console.log('currentTime', this.currentTime)
      let s = '00'
      let cloneCurrentTime = this.currentTime
      if (this.over) {
        cloneCurrentTime = cloneCurrentTime - (this.count * 60)
        s = '00'
      }
      // console.log('cloneCurrentTime', cloneCurrentTime)
      if (cloneCurrentTime < 10) {
        s = `0${(cloneCurrentTime.toString()).split('')[0]}`
      } else if (cloneCurrentTime < 60) {
        s = `${(cloneCurrentTime.toString()).split('')[0]}${(cloneCurrentTime.toString()).split('')[1]}`
      } else if (cloneCurrentTime > 60) {
        this.over = true
      }
      // console.log('s', s)
      // eslint-disable-next-line eqeqeq
      if (s == '59') {
        setTimeout(() => {
          this.count = this.count + 1
          this.m = `0${this.count}`
        }, 100)
      }
      this.currentTimeText = `${this.m}:${s}`
      this.$refs.load.style.width = `${(this.currentTime / this.durationTime) * 100}%`
      this.loadWidth = this.$refs.load.style.width
      this.$refs.point.style.left = `${(this.currentTime / this.durationTime) * 100}%`
      if (this.$refs.MyAudio.paused) {
        this.isPlay = false
        this.isActive = false
      }
    },
    loadWidth() {
      // eslint-disable-next-line eqeqeq
      if (this.loadWidth == '100%') {
        clearInterval(this.timer)
      }
    }
  },
  mounted() {
    // duration       audio的总长度
    // currentTime    当前播放的长度
    // paused         音乐是否暂停
    // play           音乐是否播放
    // .play()        控制音乐播放
    // .paused()      控制音乐暂停
    // 更多audio DOM 属性方法 https://www.w3school.com.cn/jsref/dom_obj_audio.asp
    this.$refs.MyAudio.src = this.$store.state.songUrl
    this.$refs.MyAudio.addEventListener('loadeddata', () => {
      this.$refs.MyAudio.play()
      this.durationTime = this.$refs.MyAudio.duration
      this.isPlay = true
      this.isActive = true
      const durationArray = (this.$refs.MyAudio.duration / 60).toString().split('')
      const ss = ((durationArray[2] + durationArray[3]) / 100 * 60).toString().split('')
      if (ss.length === 2 && ss.indexOf('.') !== -1) {
        this.duration = `0${durationArray[0]}:0${ss[0]}`
      } else if (ss.length === 1) {
        this.duration = `0${durationArray[0]}:0${ss[0]}`
      } else if (ss.indexOf('.') !== -1) {
        this.duration = `0${durationArray[0]}:0${ss[0]}`
      } else {
        this.duration = `0${durationArray[0]}:${ss[0]}${ss[1]}`
      }
      this.timer = setInterval(() => {
        this.currentTime = this.$refs.MyAudio.currentTime
      }, 1000)
    })
  },
  created() {
    // console.log(songUrl)
    // console.log(songImg)
    // this.imgSrc = songImg
  },
  methods: {
    tapButton() {
      if (this.$refs.MyAudio.paused) {
        this.$refs.MyAudio.play()
        this.isPlay = true
        this.isActive = true
      } else {
        this.$refs.MyAudio.pause()
        this.isPlay = false
        this.isActive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.isShow{
  display: none
}
.player-container{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(#bababa, #767676, #232323);
  transition: 0.3s all;
  z-index: 10000;
  .player-nav{
    width: 100%;
    height: 5.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center
  }
  .nav-title{
    flex: 2;
    font-size:1.5rem;
    color:#fff;
  }
  .svg-icon{
    font-size:2rem;
    padding:1rem 2rem;
  }
  .song-img{
    width: 22rem;
    height: 22rem;
    border-radius: 50%;
    background-color: #fff;
    position: fixed;
    top: 50%;
    left:50%;
    margin-top: -15rem;
    margin-left: -11rem;

    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .button-container{
    position: fixed;
    bottom:1rem;
    left:0;
    width:100%;
  }
  .player-button{
    display: flex;
    justify-content: center;
    .svg-icon{
      font-size: 2.2rem;
      padding: 1rem 2rem;
    }
  }
  .player-contronl{
    display: flex;
    justify-content: center;
    align-items: center;
    .svg-icon{
      font-size: 2.2rem;
      padding: 1rem 2rem;
    }
    .start-icon{
       font-size: 5rem;
    }
    .pause-icon{
      font-size: 5rem;
    }
  }
  .active{
      animation: rotate 30s linear infinite;
  }
  @keyframes rotate{
    from{
      transform: rotate(0deg)
    }
    to{
      transform: rotate(359deg)
    }
  }
  .process-container{
    padding: 1rem 0;
    .player-process{
      margin: 0 6rem;
      height: 0.2rem;
      border-radius: 1rem;
      background-color: #929292;
      z-index:1000000;
      position:relative;
      .load{
        height:100%;
        width:0;
        background-color:#fff;
      }
      .process-point{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        top: -0.3rem;
        left: 0;
      }
      .process-left{
        position: absolute;
        top: -0.4rem;
        left:-4rem;
        font-size:1rem;
        color: #929292;
      }
      .process-right{
        position: absolute;
        top: -0.4rem;
        right:-4rem;
        font-size:1rem;
        color: #929292;
      }
    }
  }
}
</style>

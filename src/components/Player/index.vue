<template>
  <div class="player-container">
    <div class="player-nav">
      <div class="nav-left" @click="hidePlayer">
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
      <img :src="songImg" alt="">
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
      isActive: true,
      isPlay: true,
      isHide: false
    }
  },
  computed: {
    ...mapGetters([
      'songUrl',
      'songImg',
      'songName',
      'songArtists'
    ])
  },
  mounted() {
    // const MyAudio = document.getElementById('MyAudio')
    // MyAudio.src = this.$store.state.songUrl
    // MyAudio.play()
    this.$refs.MyAudio.src = this.$store.state.songUrl
    this.$refs.MyAudio.play()
  },
  created() {
    // console.log(songUrl)
    // console.log(songImg)
    // this.imgSrc = songImg
  },
  methods: {
    tapButton() {
      this.isPlay = !this.isPlay
      this.isActive = !this.isActive
      if (this.$refs.MyAudio.paused) {
        this.$refs.MyAudio.play()
      } else {
        this.$refs.MyAudio.pause()
      }
    },
    hidePlayer() {
      console.log('click')
      this.isHide = true
    }
  }
}
</script>

<style lang="scss" scoped>
.player-container{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: radial-gradient(#bababa, #767676, #232323);
  transition: 0.3s all;
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
    margin-top: -12rem;
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
}
</style>

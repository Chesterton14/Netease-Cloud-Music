<template>
  <div class="detail-container">
    <div class="detail-nav">
      <div class="nav-top">
        <div class="nav-left" @click="$router.go(-1)">
          <svg-icon icon-class="back" />
        </div>
        <div class="nav-title">歌单</div>
        <div @click="$store.commit('SET_SONGSHOW')"><svg-icon icon-class="rank" /></div>
      </div>
      <div class="detail-bg">
        <div class="bg-img">
          <img v-lazy="coverImg">
          <div class="playlist-info">
            <div class="playlist-name">
              {{ playlistName }}
            </div>
            <div class="playlist-creator">
              <img v-lazy="playlistCreatorAvatar">
              {{ playlistCreator }}
            </div>
            <div class="playlist-description">
              {{ playlistDescription }}
            </div>
          </div>
        </div>
        <div class="bg-button">
          <div class="icon-item">
            <svg-icon icon-class="more" />
            <div>{{ commentCount }}</div>
          </div>
          <div class="icon-item">
            <svg-icon icon-class="share" />
            <div>{{ shareCount }}</div>
          </div>
          <div class="icon-item">
            <svg-icon icon-class="download" />
            <div>下载</div>
          </div>
          <div class="icon-item">
            <svg-icon icon-class="select" />
            <div>多选</div>
          </div>
        </div>
      </div>
      <div class="songlist-nav">
        <svg-icon icon-class="play" />
        <div class="play-text">
          播放全部
          <span>(共{{ tracksLength }}首)</span>
        </div>
      </div>
    </div>
    <div class="songlist">
      <div v-for="(item, index ) in tracks" :key="item.id" class="song-container" @click="toPlayer(item)">
        <div class="song-order">{{ index + 1 }}</div>
        <div class="song-info">
          <div class="song-name">{{ item.name }}</div>
          <div class="song-artist">
            <span v-for="(art, artindex) in item.ar" :key="art.name">
              {{ art.name }}
              <span v-if="!(artindex == item.ar.length - 1)">/</span>
            </span>
            <span> - {{ item.al.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;height:5.5rem;" />
    <Loading :loading="loading" />
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/playlist'
import Loading from '@/components/Loading'
export default {
  components: {
    Loading
  },
  data() {
    return {
      detailData: [],
      coverImg: '',
      playlistName: '',
      playlistCreator: '',
      playlistCreatorAvatar: '',
      playlistDescription: '',
      tracks: '',
      tracksLength: undefined,
      loading: false,
      commentCount: undefined,
      shareCount: undefined
    }
  },
  watch: {
    $route() {
      this.reset()
      getPlaylistDetail({ id: this.$route.params.id }).then(res => {
        this.coverImg = res.playlist.coverImgUrl
        this.playlistName = res.playlist.name
        this.playlistCreator = res.playlist.creator.nickname
        this.playlistCreatorAvatar = res.playlist.creator.avatarUrl
        this.playlistDescription = res.playlist.description
        this.tracksLength = res.playlist.tracks.length
        this.tracks = res.playlist.tracks
        this.commentCount = res.playlist.commentCount
        this.shareCount = res.playlist.shareCount
      })
    }
  },
  created() {
    getPlaylistDetail({ id: this.$route.params.id }).then(res => {
      this.coverImg = res.playlist.coverImgUrl
      this.playlistName = res.playlist.name
      this.playlistCreator = res.playlist.creator.nickname
      this.playlistCreatorAvatar = res.playlist.creator.avatarUrl
      this.playlistDescription = res.playlist.description
      this.tracksLength = res.playlist.tracks.length
      this.tracks = res.playlist.tracks
      this.commentCount = res.playlist.commentCount
      this.shareCount = res.playlist.shareCount
    })
  },
  methods: {
    reset() {
      this.coverImg = ''
      this.playlistName = ''
      this.playlistCreator = ''
      this.playlistCreatorAvatar = ''
      this.playlistDescription = ''
      this.tracksLength = undefined
      this.tracks = ''
    },
    toPlayer(item) {
      console.log(item)
      this.loading = true
      const data = {
        img: item.al.picUrl,
        name: item.name,
        artists: []
      }
      item.ar.map(item => { data.artists.push(item.name) })
      this.$store.dispatch('getSongUrlX', { id: item.id, br: 320000 }).then(res => {
        this.$store.dispatch('getSong', data).then(res => {
          this.$store.commit('SET_SONGSHOW')
          this.loading = false
        })
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.detail-container{
  .detail-nav{
    background-color: #767676;
    .nav-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .svg-icon{
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
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        img{
          width:35%;
          border-radius: 0.5rem;
          margin: 0.5rem;
        }
        .playlist-info{
          margin: 1rem;
          color: #fff;
          .playlist-name{
            font-size: 1.4rem;
            font-weight: 600;
          }
          .playlist-creator{
            margin-top:1rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #ccc;
            img{
              width:2.2rem;
              border-radius: 50%;
            }
          }
          .playlist-description{
            color: #ccc;
            margin-top: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }

      }
      .bg-button{
        display: flex;
        justify-content: space-around;
        align-items: center;
        .svg-icon{
          font-size:2.5rem;
          padding: 1rem;
        }
        .icon-item{
          text-align: center;
          color: #fff;
        }
      }
    }
    .songlist-nav{
      border-top-left-radius: 2rem;
      border-top-right-radius: 2rem;
      background-color: #fff;
      font-size:1.5rem;
      padding:1rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .svg-icon{
        font-size: 2rem;
      }
      .play-text{
        padding-left: 1rem;
        span{
          font-size:1.2rem;
          color: #878787;
        }
      }
    }
  }
  .song-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding:1rem;
    font-size: 1.4rem;
    .song-order{
      width: 2rem;
      padding: 1rem;
      text-align: center;
    }
    .song-info{
      padding-left: 1rem;
      .song-artist{
        font-size: 0.8rem;
        padding-top: 1rem;
        color: #797979;
      }
    }
  }
}
</style>

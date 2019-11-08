<template>
  <div ref="resultwraper" class="result-container">
    <div class="result-content">
      <div style="width:100%;height:2rem;" />
      <div v-for="item in searchData" :key="item.id" class="result-item" @click="toPlayer(item)">
        <div class="item-title">
          <div class="tltle1">
            {{ item.name }}
            <span v-if="item.alias.length > 0">({{ item.alias[0] }})</span>
          </div>
          <div class="tltle2">
            {{ item.artists[0].name }} - {{ item.album.name }}
          </div>
          <div v-if="item.alias" class="tltle3">{{ item.alias[0] }}</div>
        </div>
      </div>
      <div style="width:100%;height:12rem;" />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { searchBykey, getAlbum } from '@/api/search'
export default {
  props: {
    keywords: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      searchData: []
    }
  },
  watch: {
    keywords() {
      if (this.keywords) {
        searchBykey({ keywords: this.keywords }).then(res => {
          console.log(res)
          this.searchData = res.result.songs
        })
      }
    }
  },
  created() {
    searchBykey({ keywords: this.keywords }).then(res => {
      this.searchData = res.result.songs
      this.resultScroll = new BScroll(this.$refs.resultwraper, {
        click: true
      })
    })
  },
  methods: {
    toPlayer(item) {
      getAlbum({ id: item.album.id }).then(res => {
        const data = {
          img: res.album.picUrl,
          name: item.name,
          artists: []
        }
        item.artists.map(item => { data.artists.push(item.name) })
        this.$store.dispatch('getSongUrlX', { id: item.id, br: 320000 }).then(res => {
          this.$store.dispatch('getSong', data).then(res => {
            this.$store.commit('SET_SONGSHOW')
            this.loading = false
          })
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.result-container{
  position: fixed;
  top: 5.5rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 100;
  .result-content{
    .result-item{
      padding:0.7rem 1rem;
      .tltle1{
        font-size:1.3rem;
        padding: 0.3rem;
        span{
          color:#949494;
        }
      }
      .tltle2{
        padding: 0.3rem;
        color:#949494;
      }
      .tltle3{
        padding: 0.3rem;
        color:#949494;
      }
    }
  }
}
</style>

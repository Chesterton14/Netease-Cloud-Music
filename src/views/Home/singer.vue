<template>
  <div class="singer-container">
    <div class="singer-nav">
      <div @click="goBack"><svg-icon icon-class="back" /></div>
      <div class="nav-title">歌手分类</div>
      <div @click="goBack"><svg-icon icon-class="rank" /></div>
    </div>
    <div style="width:100%;height:5.5rem" />
    <div class="singer-category">
      <div class="singer-country">
        <div
          v-for="country in countryList"
          :key="country.code"
          class="country-item"
          :class="{active: country.isActive}"
          @click="selectCountry(country)"
        >{{ country.name }}</div>
      </div>
      <div class="singer-sex">
        <div
          v-for="sex in sexList"
          :key="sex.code"
          class="sex-item"
          :class="{active: sex.isActive}"
          @click="selectSex(sex)"
        >{{ sex.name }}</div>
      </div>
    </div>
    <div class="singer-title">热门歌手</div>
    <div class="singer-main">
      <transition-group name="fade-transform" mode="out-in">
        <div v-for="singer in topSingerList" :key="singer.id" class="singer-item">
          <div class="singer-pic">
            <img :src="singer.picUrl">
          </div>
          <div class="singer-name">
            {{ singer.name }}
            <span v-if="singer.alias.length > 0 && !singer.trans">({{ singer.alias[0] }})</span>
            <span v-if="singer.trans">({{ singer.trans }})</span>
            <svg-icon v-if="singer.accountId" icon-class="account" style="font-size:1.3rem" />
          </div>
        </div>
      </transition-group>
    </div>
    <div v-show="!loading" class="load-more" @click="loadMore(loadMoreOption)">加载更多</div>
    <div v-show="loading" class="sk-chase">
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
      <div class="sk-chase-dot" />
    </div>
    <div style="width:100%;height:6.5rem" />
  </div>
</template>

<script>
import { getTopArtists, getArtistsList } from '@/api/discover'
export default {
  data() {
    return {
      params: {
        offset: 0,
        limit: 20
      },
      loading: false,
      topSingerList: [],
      countryList: [
        { name: '华语', code: 1000, isActive: false },
        { name: '欧美', code: 2000, isActive: false },
        { name: '日本', code: 6000, isActive: false },
        { name: '韩国', code: 7000, isActive: false },
        { name: '其他', code: 4000, isActive: false }
      ],
      sexList: [
        { name: '男', code: 1, isActive: false },
        { name: '女', code: 2, isActive: false },
        { name: '乐队/组合', code: 3, isActive: false }
      ],
      countrySelected: undefined,
      sexSelected: undefined,
      loadMoreOption: {
        params: {
          offset: 0,
          limit: 20
        },
        fn: getTopArtists,
        data: undefined
      }
    }
  },
  created() {
    this.params.offset = 0
    getTopArtists(this.params).then(res => {
      this.topSingerList = res.artists
      this.loadMoreOption.data = res.artists
    })
  },
  methods: {
    initData() {
    },
    loadMore(option) {
      this.loading = true
      option.params.offset = option.params.offset + option.params.limit
      option.fn(option.params).then(res => {
        res.artists.map(item => {
          option.data.push(item)
        })
        this.loading = false
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    selectCountry(country) {
      this.countryList.map(item => { item.isActive = false })
      country.isActive = true
      this.countrySelected = country.code
      getArtistsList({ cat: country.code + 1, limit: 20 }).then(res => {
        this.topSingerList = res.artists
        this.sexList.map(item => { item.isActive = false })
        this.sexList[0].isActive = true
        this.loadMoreOption = null
        this.loadMoreOption = {
          params: {
            offset: 0,
            limit: 20,
            cat: country.code + 1
          },
          fn: getArtistsList,
          data: this.topSingerList
        }
      })
    },
    selectSex(sex) {
      this.sexList.map(item => { item.isActive = false })
      sex.isActive = true
      this.sexSelected = sex.code
      getArtistsList({ cat: this.countrySelected + sex.code, limit: 20 }).then(res => {
        this.topSingerList = res.artists
        this.loadMoreOption = null
        this.loadMoreOption = {
          params: {
            offset: 0,
            limit: 20,
            cat: this.countrySelected + sex.code
          },
          fn: getArtistsList,
          data: this.topSingerList
        }
      })
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
    .active{
      color: $neteaseRed !important;
    }
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

<style>
.sk-chase {
  width: 35px;
  height: 35px;
  margin: 0 auto;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2.0s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: #d81e06;
  border-radius: 100%;
  animation: sk-chase-dot-before 2.0s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2) { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3) { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4) { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5) { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6) { animation-delay: -0.6s; }
.sk-chase-dot:nth-child(1):before { animation-delay: -1.1s; }
.sk-chase-dot:nth-child(2):before { animation-delay: -1.0s; }
.sk-chase-dot:nth-child(3):before { animation-delay: -0.9s; }
.sk-chase-dot:nth-child(4):before { animation-delay: -0.8s; }
.sk-chase-dot:nth-child(5):before { animation-delay: -0.7s; }
.sk-chase-dot:nth-child(6):before { animation-delay: -0.6s; }

@keyframes sk-chase {
  100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot {
  80%, 100% { transform: rotate(360deg); }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  } 100%, 0% {
    transform: scale(1.0);
  }
}
</style>

<template>
  <div class="search-container">
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
</template>

<script>
import { getHotSearch } from '@/api/discover'
export default {
  data() {
    return {
      hotSearchList: []
    }
  },
  created() {
    getHotSearch().then(res => {
      this.hotSearchList = res.data
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
  .search-container {
    width: 100%;
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
</style>

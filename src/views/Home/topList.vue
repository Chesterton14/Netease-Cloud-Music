<template>
  <div class="toplist-container">
    <div class="toplist-nav">
      <div class="nav-icon" @click="$router.go(-1)"><svg-icon icon-class="back" /></div>
      <div class="nav-title">排行榜</div>
      <svg-icon icon-class="rank" />
    </div>
    <div ref="toplist" class="toplist-wrapper">
      <div class="toplist-content">
        <div style="width:100%;height:5.5rem;" />
        <div class="artist-top">
          <div class="artist-title">{{ artistToplist.name }}</div>
          <div class="artist-main">
            <div class="artist-img">
              <img v-lazy="artistToplist.coverUrl" :alt="artistToplist.name">
              <div class="upateFrequency">{{ artistToplist.upateFrequency }}</div>
            </div>
            <div class="artist-top3">
              <div v-for="(item, index) in artistToplist.artists" :key="item.third" class="top3-item">
                {{ index + 1 }}.{{ item.first }}
              </div>
            </div>
          </div>
        </div>
        <div class="toplist-office">
          <div class="office-title">官方榜</div>
          <div v-for="office in officeListData" :key="office.id" class="office-main">
            <div class="office-img">
              <img v-lazy="office.coverImgUrl" :alt="office.name">
              <div class="upateFrequency">{{ office.updateFrequency }}</div>
            </div>
            <div class="office-top3">
              <div v-for="(item, index) in office.tracks" :key="item.third" class="top3-item">
                {{ index + 1 }}.{{ item.first }} - {{ item.second }}
              </div>
            </div>
          </div>
        </div>
        <div class="toplist-rec">
          <div class="rec-title">推荐榜</div>
          <div class="rec-main">
            <div v-for="item in recListData" :key="item.id" class="rec-item">
              <div class="rec-img">
                <img v-lazy="item.coverImgUrl" :alt="item.name">
                <div class="upateFrequency">{{ item.updateFrequency }}</div>
              </div>
              <div class="rec-title">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="toplist-global">
          <div class="global-title">全球榜</div>
          <div class="global-main">
            <div v-for="item in globalListData" :key="item.id" class="global-item">
              <div class="global-img">
                <img v-lazy="item.coverImgUrl" :alt="item.name">
                <div class="upateFrequency">{{ item.updateFrequency }}</div>
              </div>
              <div class="global-title">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="toplist-other">
          <div class="other-title">更多榜单</div>
          <div class="other-main">
            <div v-for="item in otherListData" :key="item.id" class="other-item">
              <div class="other-img">
                <img v-lazy="item.coverImgUrl" :alt="item.name">
                <div class="upateFrequency">{{ item.updateFrequency }}</div>
              </div>
              <div class="other-title">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div style="width:100%;height:5.5rem;" />
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { getHotList } from '@/api/discover'
export default {
  data() {
    return {
      artistToplist: {},
      topListData: [],
      officeListData: [],
      recListData: [],
      globalListData: [],
      otherListData: []
    }
  },
  created() {
    getHotList().then(res => {
      console.log(res)
      this.artistToplist = res.artistToplist
      this.officeListData = res.list.slice(0, 4)
      this.recListData = res.list.slice(4, 10)
      this.globalListData = res.list.slice(10, 16)
      this.otherListData = res.list.slice(16)
      this.$nextTick(() => {
        this.toplistScroll = new BScroll(this.$refs.toplist, {
          click: true
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
$neteaseRed: #d81e06;
.toplist-container{
  width:100%;
  .toplist-nav{
    position:fixed;
    top: 0;
    left: 0;
    z-index:1000;
    width: 100%;
    height: 5.5rem;
    background-color: $neteaseRed;
    text-align: center;
    display:flex;
    justify-content: space-around;
    align-items: center;
    .svg-icon {
      font-size: 2.5rem;
      padding: 0 1rem;
    }
    .nav-title{
      flex:2;
      font-size: 1.5rem;
      text-align: center;
      color: #ffffff;
    }
  }
  .toplist-wrapper{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    height:100%;
    z-index:100;
  }
  .artist-top{
    padding: 1.5rem;
    .artist-title{
      font-size:1.6rem;
      font-weight: 600;
    }
    .artist-main{
      margin-top: 1.5rem;
      display:flex;
      .artist-img{
        position: relative;
        width:10rem;
        img{
          border-radius: 0.5rem;
          width: 100%;
        }
        .upateFrequency{
          position: absolute;
          left: 0.5rem;
          bottom: 0.7rem;
          font-size: 1rem;
          color:#ffffff;
        }
      }
      .artist-top3{
        .top3-item{
          padding: 1rem 1rem;
          font-size:1.2rem;
          color:#6a6a6a;
        }
      }
    }
  }
  .toplist-office{
    padding: 1.5rem;
    .office-title{
      font-size:1.6rem;
      font-weight: 600;
    }
    .office-main{
      margin-top: 1.5rem;
      display:flex;
      .office-img{
        position: relative;
        width:10rem;
        img{
          border-radius: 0.5rem;
          width: 100%;
        }
        .upateFrequency{
          position: absolute;
          left: 0.5rem;
          bottom: 0.7rem;
          font-size: 1rem;
          color:#ffffff;
        }
      }
      .office-top3{
        .top3-item{
          padding: 1rem 1rem;
          font-size:1.2rem;
          color:#6a6a6a;
        }
      }
    }
  }
  .toplist-rec{
    padding: 1.5rem 1rem;
    .rec-title{
      font-size:1.6rem;
      font-weight: 600;
      padding:0.5rem;
    }
    .rec-main{
      width: 100%;
      .rec-item{
        width:33.33%;
        display: inline-block;
        box-sizing: border-box;
        padding: 0.5rem;
        .rec-img{
          position: relative;
          img{
            width:100%;
            border-radius: 0.5rem;
          }
          .upateFrequency{
            position: absolute;
            left: 0.5rem;
            bottom: 0.7rem;
            font-size: 1rem;
            color:#ffffff;
          }
        }
        .rec-title{
          padding:0.5rem 0;
          font-size:1rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .toplist-global{
    padding: 1.5rem 1rem;
    .global-title{
      font-size:1.6rem;
      font-weight: 600;
      padding:0.5rem;
    }
    .global-main{
      width: 100%;
      .global-item{
        width:33.33%;
        display: inline-block;
        box-sizing: border-box;
        padding: 0.5rem;
        .global-img{
          position: relative;
          img{
            width:100%;
            border-radius: 0.5rem;
          }
          .upateFrequency{
            position: absolute;
            left: 0.5rem;
            bottom: 0.7rem;
            font-size: 1rem;
            color:#ffffff;
          }
        }
        .global-title{
          padding:0.5rem 0;
          font-size:1rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .toplist-other{
    padding: 1.5rem 1rem;
    .other-title{
      font-size:1.6rem;
      font-weight: 600;
      padding:0.5rem;
    }
    .other-main{
      width: 100%;
      .other-item{
        width:33.33%;
        display: inline-block;
        box-sizing: border-box;
        padding: 0.5rem;
        .other-img{
          position: relative;
          img{
            width:100%;
            border-radius: 0.5rem;
          }
          .upateFrequency{
            position: absolute;
            left: 0.5rem;
            bottom: 0.7rem;
            font-size: 1rem;
            color:#ffffff;
          }
        }
        .other-title{
          padding:0.5rem 0;
          font-size:1rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

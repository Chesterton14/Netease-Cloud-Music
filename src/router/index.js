import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/Layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/discover',
    children: [
      {
        path: 'discover',
        name: '发现',
        component: () => import('@/views/Home'),
        meta: {
          title: '主页'
        }
      },
      {
        path: 'singer',
        name: '歌手页',
        component: () => import('@/views/Home/singer.vue'),
        meta: {
          title: '歌手页'
        }
      },
      {
        path: 'dailysong',
        name: '每日推荐',
        component: () => import('@/views/Home/dailySong.vue'),
        meta: {
          title: '每日推荐'
        }
      },
      {
        path: 'songlist',
        name: '歌单广场',
        component: () => import('@/views/Home/songList.vue')
      },
      {
        path: 'toplist',
        name: '排行榜',
        component: () => import('@/views/Home/topList.vue')
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    children: [
      {
        path: 'index',
        name: '视频',
        component: () => import('@/views/Video.vue'),
        meta: {
          title: '视频'
        }
      }
    ]
  },
  {
    path: '/music',
    component: Layout,
    redirect: '/music/index',
    children: [
      {
        path: 'index',
        name: '我的',
        component: () => import('@/views/Music.vue'),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/team',
    component: Layout,
    redirect: '/team/index',
    children: [
      {
        path: 'index',
        name: '云村',
        component: () => import('@/views/Team.vue'),
        meta: {
          title: '云村'
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: 'index',
        name: '账号',
        component: () => import('@/views/User.vue'),
        meta: {
          title: '账号'
        }
      }
    ]
  },
  {
    path: '/player',
    name: '播放器',
    component: () => import('@/components/Player')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

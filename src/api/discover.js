import request from '@/utils/request'

// 获取默认搜索词
export function searchDefault() {
  return request({
    url: '/search/default',
    method: 'get'
  })
}

// 获取轮播图 type=(0:PC,1:Android,2:iPhone,3:iPad)
export function getBanner() {
  return request({
    url: '/banner?type=2',
    method: 'get'
  })
}

// 获取推荐歌单(未登录)
export function getSongList() {
  return request({
    url: '/personalized?limit=6',
    method: 'get'
  })
}

// 获取新碟
export function getNewestAlbum() {
  return request({
    url: '/album/newest',
    method: 'get'
  })
}

// 获取热搜列表（详细）
export function getHotSearch() {
  return request({
    url: '/search/hot/detail',
    method: 'get'
  })
}

// 获取热门歌手
export function getTopArtists(params) {
  return request({
    url: '/top/artists',
    method: 'get',
    params
  })
}

// 获取歌手分类列表
export function getArtistsList(params) {
  return request({
    url: '/artist/list',
    method: 'get',
    params
  })
}

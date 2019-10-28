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

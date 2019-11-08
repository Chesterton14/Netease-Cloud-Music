import request from '@/utils/request'

export function searchBykey(params) {
  return request({
    url: '/search',
    params
  })
}

export function searchSuggest(params) {
  return request({
    url: '/search/suggest',
    params
  })
}

// 获取专辑内容
export function getAlbum(params) {
  return request({
    url: '/album',
    params
  })
}

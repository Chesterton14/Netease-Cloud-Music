import request from '@/utils/request'

export function getSongUrl(params) {
  return request({
    url: '/song/url',
    params
  })
}

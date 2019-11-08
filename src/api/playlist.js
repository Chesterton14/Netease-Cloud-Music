import request from '@/utils/request'

// 获取歌单详情
export function getPlaylistDetail(params) {
  return request({
    url: '/playlist/detail',
    params
  })
}

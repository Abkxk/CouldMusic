import service from '..'
// 获取首页轮播图的数据
export function getBanner() {
  return service({
    method: 'GET',
    url: 'banner?type=2'

  })
}
// 获取发现好歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'

  })
}
// 精品推荐
export function getPlayList() {
  return service({
    method: 'GET',
    url: '/top/playlist/highquality'

  })
}
// 搜索
export function getSearchMusic(name) {
  return service({
    method: 'GET',
    url: `/cloudsearch?keywords=${name}`

  })
}
// 登录
export function getUserLogin() {
  return service({
    method: 'GET',
    // 由于接口的原因使用的是游客登录
    url: '/register/anonimous'

  })
}

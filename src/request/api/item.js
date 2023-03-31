import service from '..'
// 获取歌单详情页数据
export function getMusicItemList(id) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`

  })
}
// 获取歌单所有歌曲
export function getSongsItemList(data) {
  return service({
    method: 'GET',
    // url: `/playlist/detail/tracks?id=${id}&limit=${id.limit}&offset=${id.offset}`
    url: `/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`
  })
}
// 获取歌词
export function getMusicLyric(id) {
  return service({
    method: 'GET',
    // url: `/playlist/detail/tracks?id=${id}&limit=${id.limit}&offset=${id.offset}`
    url: `/lyric?id=${id}`
  })
}

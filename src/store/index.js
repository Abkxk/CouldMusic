import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item.js'
import { getUserLogin } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{ // 给默认值
      al: {
        id: 1679018,
        pic: 6668538022990724,
        picUrl: 'https://p1.music.126.net/tI9jDTy1LDzMt_RoykAELA==/6668538022990724.jpg',
        pic_str: '17801093254121637'
      },
      name: "Love's Silhouette",
      id: 18289411
    }], // 播放列表
    playListIndex: 0, // 默认下标为0
    isbtnChange: true, // 播放/暂停按钮的切换，默认是播放按钮
    detailShow: false, // 详情页展示，默认false
    lyricList: {}, // 歌词
    currentTime: 0, // 歌词当前时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 是否登录
    isFooterMusicShow: true, // 是否显示底部组件
    token: ''// 保存接口里的登录token信息到本地
  },
  getters: {
  },
  mutations: {
    updateIsBtnChange: function(state, value) { // 播放/暂停按钮的切换
      state.isbtnChange = value
    },
    updatePlayList: function(state, value) {
      // 更新歌曲列表
      state.playList = value
      // console.log(state.playList)
    },
    pushPlayList: function(state, value) {
      // 添加歌曲到播放列表
      state.playList.push(value)
    },
    updatePlayListIndex: function(state, value) {
      // 歌曲下标
      state.playListIndex = value
    },
    updateDetailShow: function(state) {
      // 歌单详情
      state.detailShow = !state.detailShow
    },
    updateLyricList: function(state, value) {
      // 歌词
      state.lyricList = value
    },
    updateCurrentTime: function(state, value) {
      // 歌曲时间轴
      // console.log(state.currentTime)
      state.currentTime = value
    },
    updateDuration: function(state, value) {
      // 歌曲时长
      state.duration = value
    },
    updateIsLogin: function(state, value) {
      // 是否登录
      state.isLogin = true
    },
    updateToken: function(state, value) {
      // 本地保存登录信息
      state.token = value
      localStorage.setItem('token', state.token)
    }
  },
  // 异步请求 全局
  actions: {
    getLyric: async function(context, value) {
      const res = await getMusicLyric(value)
      // console.log(res)
      context.commit('updateLyricList', res.data.lrc)
    },
    getLogin: async function(context, value) {
      const res = await getUserLogin(value)
      // console.log(res)
      return res
    }
  },
  modules: {
  }
})

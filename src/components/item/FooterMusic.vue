<template>
  <div class="FooterMusic" @click="showPopup()" :v-show="isShowPopup">
    <div class="footerLeft" @click="updateDetailShow()">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="middle">
        <!-- <p>{{ playList[playListIndex].al.name }}</p>
        <span>横滑可以切换上下首</span> -->
        <div class="title">{{ playList[playListIndex].name }}</div>
        <div class="toggle">横滑可以切换上下首</div>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnChange">
        <use xlink:href="#icon-bofang3"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic2"></use>
      </svg>
    </div>

    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <!-- 弹出层 -->
    <van-popup v-model:show="detailShow" position="bottom" :style="{ width: '100%', height: '100%' }"> <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnChange="isbtnChange" :addDuration="addDuration" /></van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'

export default {
  data() {
    return {
      interVal: 0,
      isShowPopup: false
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnChange', 'detailShow', 'musicList'])
  },
  mounted() {
    // console.log(this.$refs)
    // console.log(this.playList)
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.updateTime()
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        // this.$ref.audio.paused默认true
        this.$refs.audio.play()
        this.updateIsBtnChange(false)
        this.updateTime() // 播放调用函数传值
      } else {
        // 停止播放
        this.$refs.audio.pause()
        this.updateIsBtnChange(true)
        clearInterval(this.interVal) // 暂停清楚定时器
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime() {
      // 设置个定时器
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    showPopup() {
      // const vanpop = document.querySelector('van-popup')
      // vanpop.style.display = 'block'
      this.isShowPopup = !this.isShowPopup
    },
    ...mapMutations(['updateIsBtnChange', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
  },
  watch: {
    playListIndex() {
      // 如果下标发生了（歌曲改变）改变就自动播放音乐
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        // 暂停状态就改变图标
        this.updateIsBtnChange(false)
      }
      this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    },
    playList() {
      if (this.isbtnChange) {
        // 暂停状态就改变图标
        this.$refs.audio.autoplay = true
        this.updateIsBtnChange(false)
      }
    }
  },
  components: {
    MusicDetail,
    [Popup.name]: Popup
  }
}
</script>

<style scoped lang="less">
// .FooterMusic {
//   position: fixed;
//   width: 100%;
//   height: 1.4rem;
//   background-color: white;
//   border-top: 0.02rem solid #999;
//   z-index: 3;
//   bottom: 0;
//   left: 0;
//   display: flex;
//   padding: 0.2rem;
//   justify-content: space-between;
//   .footerLeft {
//     width: 5.5rem;
//     height: 1.2rem;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     img {
//       width: 1rem;
//       height: 1rem;
//       border-radius: 50%;
//     }
//     .middle {
//       justify-content: center;
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       margin-left: 0.1rem;
//       height: 1.2rem;
//       text-align: center;
//       .title {
//         font-size: 0.27rem;
//         width: 5.5rem;
//         overflow: hidden;
//         white-space: nowrap;
//         text-overflow: ellipsis;
//       }
//       .toggle {
//         margin-top: 3px;
//         color: rgb(161, 160, 160);
//         font-size: 0.23rem;
//       }
//     }
//   }
//   .footerRight {
//     width: 25%;
//     height: 100%;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     .icon {
//       width: 0.7rem;
//       height: 0.7rem;
//     }
//   }
// }
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  position: fixed;
  z-index: 99;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #999;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  .footerLeft {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      //指定动画循环
      animation: rotation 8s linear infinite;
      //暂停动画
      animation-play-state: paused;
    }
    img.active {
      //运行动画
      animation-play-state: running;
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .title {
      width: 5.5rem;
      font-size: 0.27rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .toggle {
      margin-top: 3px;
      color: #999;
      font-size: 0.24rem;
    }
  }
  .footerRight {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.7rem;
      height: 0.7rem;
    }
  }
  audio {
    position: absolute;
    z-index: 99;
  }
  van-popup {
    display: none;
  }
}
</style>

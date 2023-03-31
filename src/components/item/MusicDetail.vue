<template>
  <div class="detailTop">
    <img :src="musicList.al.picUrl" class="bgImg" />
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="updateDetailShow">
        <use xlink:href="#icon-xiangzuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: #fff">{{ musicList.name }}</Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="@/assets/needle-ab.png" class="imgNeedle" :class="{ imgNeedle_active: !isbtnChange }" />
    <!-- 3种都可以 -->
    <!-- imgAlPic_active: !isbtnChange, imgAlPic_paused: isbtnChange  -->
    <!-- isbtnChange ? 'imgAlPic_paused' : 'imgAlPic_active' 没有{}-->
    <!-- imgAlPic_active: !isbtnChange  需要给图片默认暂停-->
    <img src="@/assets/cd.png" class="imgCd" />
    <img :src="musicList.al.picUrl" @click="isLyricShow = true" class="imgAlPic" :class="{ imgAlPic_active: !isbtnChange, imgAlPic_paused: isbtnChange }" />
  </div>
  <div class="MusicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
    <p v-for="item in lyric" :key="item" :class="{ active: currentTime * 1000 >= item.time && currentTime * 1000 < item.after }">
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jushoucang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai-copy"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" step="0.05" v-model="currentTime" />
      <!-- <van-slider v-model="currentTime" :min="0" :max="duration" step="0.05" button-size="0.35rem" bar-height="0.07rem" active-color="#8e8e8e" inactive-color="e5e5e5" /> -->
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <div class="bofang">
        <svg class="icon" aria-hidden="true" v-if="isbtnChange" @click="play">
          <use xlink:href="#icon-bofang3"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
      </div>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic2"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['musicList', 'play', 'isbtnChange', 'addDuration'],
  data() {
    return {
      isLyricShow: false
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playList', 'playListIndex', 'duration']),
    // 歌词效果
    lyric: function () {
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // slice包头不包尾巴
          const min = item.slice(item.indexOf('[') + 1, item.indexOf(':'))
          const sec = item.slice(item.indexOf(':') + 1, item.indexOf('.'))
          const mill = item.slice(item.indexOf('.') + 1, item.indexOf(']'))
          const lrc = item.slice(item.indexOf(']') + 1, item.length).trim()
          const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          // console.log(min, sec, mill, lrc)
          return { min, sec, mill, lrc, time }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.after = 10000000000
          } else {
            item.after = arr[i + 1].time
          }
        })
      }
      return arr
    }
  },
  mounted() {
    // console.log(this.musicList)
    // console.log(this.playList)
    this.addDuration()
  },

  components: {
    Vue3Marquee
  },
  methods: {
    ...mapMutations(['updateDetailShow', 'updatePlayListIndex']),
    // 歌曲切换
    goPlay(num) {
      const index = this.playListIndex + num
      if (index < 0) {
        // 当播放第一首歌时点击上一首，歌曲变为列表最后一首歌
        index = this.playList.length - 1
      } else if (index === this.playList.length) {
        // 播放最后一首时点击下一首，歌曲变为列表第一首歌
        index = 0
      }
      // 传回去
      this.updatePlayListIndex(index)
      this.play()
    }
  },
  watch: {
    // 改变歌词的位置
    currentTime(newValue) {
      const p = document.querySelector('p.active')
      // 加[]才能看到一些引用信息
      // console.log([p])
      if (p) {
        if (p.offsetTop > this.$refs.musicLyric.clientHeight / 2) {
          // console.log([this.$refs.musicLyric])
          this.$refs.musicLyric.scrollTop = p.offsetTop - this.$refs.musicLyric.clientHeight / 2
        }
      }
      if (newValue === this.duration) {
        // 方法1
        if (this.playListIndex === this.playList.length - 1) {
          // 播放到最后一首时播放完跳转到第一首
          this.updatePlayListIndex(0)
          this.play()
        } else {
          this.updatePlayListIndex(this.playListIndex + 1)
        }
        // 方法2
        // if (this.playListIndex === this.playList.length - 1) {
        //   // 播放到最后一首时播放完跳转到第一首
        //   this.updatePlayListIndex(0)
        // this.play()
        // } else {
        //   this.goPlay(1)
        // }
      }
    }
  }
}
</script>

<style scoped lang="less">
.bgImg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(60px);
  fill: #fff;
}
.detailTop {
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;

  .detailTopLeft {
    width: 5rem;
    display: flex;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    .leftMarquee {
      width: 70%;
      height: 100%;
      margin-left: 0.4rem;
      font-size: 0.36rem;
      // Vue3Marquee {
      //   width: 100%;
      //   position: fixed;
      // }
      span {
        font-size: 0.28rem;
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .detailTopRight {
    width: 2rem;
    display: flex;
    justify-content: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .imgNeedle {
    width: 3rem;
    height: 4.5rem;
    position: absolute;
    // 置旋转元素的基点位置
    transform-origin: 0 0;
    //旋转-10度
    transform: rotate(-18deg);
    //先过渡2s再旋转
    transform: all 2s;
  }
  .imgNeedle_active {
    width: 3rem;
    height: 4.5rem;
    position: absolute;
    // 置旋转元素的基点位置
    transform-origin: 0 0;
    //旋转-10度
    transform: rotate(-10deg);
    //先过渡2s再旋转
    transform: all 2s;
  }
  .imgCd {
    width: 7.5rem;
    height: 7.5rem;
    position: absolute;
    bottom: -1rem;
    z-index: -1;
  }
  .imgAlPic {
    width: 4.9rem;
    height: 4.9rem;
    border-radius: 50%;
    position: absolute;
    bottom: 0.33rem;
    animation: rotation 10s linear infinite;
    animation-play-state: paused;
  }
  .imgAlPic_active {
    animation-play-state: running;
  }
  .imgAlPic_paused {
    animation-play-state: paused;
  }
  @keyframes rotation {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
}
.MusicLyric {
  width: 100%;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  // 溢出滚动
  overflow: scroll;
  p {
    font-size: 0.4rem;
    color: #999;
    margin-bottom: 0.4rem;
  }
  .active {
    font-size: 0.5rem;
    font-weight: 700;
    color: #fff;
  }
}
.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .footerContent {
    .range {
      -webkit-appearance: none;
      appearance: none;
      background: linear-gradient(90deg, #81868e 0%, #a6b1c6 100%);
      border-radius: 12px;
      box-shadow: 0px 0px 8px 0px rgb(197, 203, 220);
      width: 100%;
      height: 0.06rem;
      margin-bottom: 0.5rem;
    }
    // .range::-ms-fill-lower {
    //   -webkit-appearance: none;
    //   background: #f00;
    // }
    /*滑动条操作按钮样式*/
    .range::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 0.2rem;
      height: 0.4rem;
      background: #c5cbdb;
      box-shadow: 0px 0px 6px 0px rgb(168, 180, 213);
    }
  }

  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.75rem;
      height: 0.75rem;
      fill: #8e8e8e;
    }
    .bofang {
      .icon {
        width: 1.2rem;
        height: 1.2rem;
        fill: #8e8e8e;
      }
    }
  }
}
</style>

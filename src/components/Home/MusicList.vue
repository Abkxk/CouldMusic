<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="titile">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :show-indicators="false" :loop="false" :width="150" class="myswiper">
        <van-swipe-item v-for="item in state.musicList" :key="item">
          <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang2"></use>
              </svg>
              <span>{{ changeCount(item.playCount) }}</span>
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  // vue2写法
  // data() {
  //   return {
  //     musicList: []
  //   }
  // },
  // methods: {
  //   async getGeDan() {
  //     const res = await getMusicList()
  //     console.log(res)
  //   }
  // },
  // mounted() {
  //   this.getGeDan()
  // }
  setup() {
    const state = reactive({
      musicList: []
    })
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    onMounted(async () => {
      const res = await getMusicList()
      state.musicList = res.data.result
      // console.log(res)
    })
    return { state, changeCount }
  }
}
</script>

<style scoped lang="less">
.musicList {
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  padding: 0.1rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .titile {
      font-size: 0.5rem;
      font-weight: 900;
    }
    .more {
      font-size: 0.35rem;
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 5rem;

    .myswiper {
      height: 100%;
      img {
        width: 100%;
        height: 4rem;
        padding: 0.1rem;
      }
    }
    .playCount {
      position: absolute;
      top: 0.2rem;
      right: 0.2rem;
      font-size: 0.1rem;
      color: aliceblue;
    }
    .name {
      display: block;
      width: 100%;
      height: 1rem;
      font-size: 0.2rem;
      text-align: left;
    }
  }
}
</style>

<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="#f26522" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
// import axios from 'axios'
import { getBanner } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      images: ['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg']
    })
    onMounted(async () => {
      const res = await getBanner()
      state.images = res.data.banners
      // console.log(res)
    })
    return { state }
  }
}
</script>

<style scoped lang="less">
.van-swipe {
  width: 100%;
  height: 4rem;
  .van-swipe__track {
    padding: 0 10px;
    .van-swipe-item {
      img {
        width: 100%;
        height: 4 rem;
        border-radius: 10px;
      }
    }
  }
}
</style>

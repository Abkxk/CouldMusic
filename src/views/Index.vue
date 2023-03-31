<template>
  <div>
    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <MusicListVue></MusicListVue>
    <HighqualityList></HighqualityList>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue'
import SwiperTop from '@/components/Home/SwiperTop.vue'
import IconList from '@/components/Home/IconList.vue'
import MusicListVue from '@/components/Home/MusicList.vue'
import HighqualityList from '@/components/Home/HighqualityList.vue'
export default {
  name: 'Index',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicListVue,
    HighqualityList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<template>
  <div>
    <router-view></router-view>
    <FooterMusic v-show="$store.state.isFooterMusicShow"></FooterMusic>
  </div>
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue'
export default {
  components: {
    FooterMusic
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.4rem;
  height: 0.4rem;
}
a {
  color: black;
}
FooterMusic {
  position: fixed;
  z-index: 99;
}
</style>

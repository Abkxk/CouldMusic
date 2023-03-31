<template>
  <div class="itemMusicView">
    <ItemMusicTop :playList="state.playList"></ItemMusicTop>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playList.subscribedCount"></ItemMusicList>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { reactive, onMounted } from 'vue'
import { getMusicItemList, getSongsItemList } from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
  setup() {
    const state = reactive({
      playList: {}, // 歌单的详情页数据
      itemList: [] // 歌单的歌曲信息
    })
    onMounted(async () => {
      // 获取歌单详情
      const id = useRoute().query.id
      const res = await getMusicItemList(id)
      // console.log(res)
      state.playList = res.data.playlist
      // 防止页面刷新，数据丢失，将数据保存到sessiStorage
      // sessionStorage.setItem('itemDetail', JSON.stringify(state))
      // 获取歌单歌曲列表
      const result = await getSongsItemList({ id, limit: 20, offset: 0 })
      // const result = await getSongsItemList(id)
      // console.log(result)
      state.itemList = result.data.songs
      // console.log(result.data.songs)
    })
    return { state }
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.itemMusicView {
  min-width: 5.6rem;
}
</style>

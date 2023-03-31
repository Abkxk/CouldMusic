<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <van-cell-group inset>
      <van-field v-model="searchKey" placeholder="the Weeknd" input-align="left" :center="true" @keydown.enter="enterKey" />
    </van-cell-group>
  </div>
  <div class="seachHistory">
    <span class="searchSpan">历史</span>
    <div class="deleteShow">
      <span v-for="item in keyWorldList" :key="item" class="spanKey" @click="spanHistory(item)">{{ item }}</span>
    </div>
    <van-icon name="delete-o" size="0.6rem" class="vanicon" @click="delHistory" />
  </div>
  <div class="itemList" v-for="(item, i) in searchMusicList" :key="i">
    <!--updateIndex(item)传值，要用到item  -->
    <div class="listLeft" @click="updateIndex(item)">
      <span class="index">{{ i + 1 }}</span>
      <div class="content">
        <div class="name">{{ item.name }}</div>
        <span v-for="(ar, index) in item.ar" :key="index" class="author">{{ ar.name }}&nbsp;</span>
      </div>
    </div>
    <div class="listRight">
      <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
        <use xlink:href="#icon-a-262_imv"></use>
      </svg>
      <svg class="icon liebiao" aria-hidden="true">
        <use xlink:href="#icon-liebiao-copy"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { getSearchMusic } from '@/request/api/home.js'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      keyWorldList: [],
      searchKey: '',
      searchMusicList: []
    }
  },
  computed: { ...mapState(['playList']) },
  mounted() {
    // 本地存储
    this.keyWorldList = JSON.parse(localStorage.getItem('keyWorldList')) || []
  },
  methods: {
    ...mapMutations(['pushPlayList', 'updatePlayListIndex']),
    // 搜索功能
    async enterKey() {
      if (this.searchKey !== '') {
        // 在数组前面添加
        this.keyWorldList.unshift(this.searchKey)
        // 去重
        if (this.keyWorldList.length > 10) {
          // 1.
          // this.keyWorldList.splice(this.keyWorldList.length - 1, 1)
          // 2.
          this.keyWorldList.pop()
        }
        this.keyWorldList = [...new Set(this.keyWorldList)]
        // 本地存储
        localStorage.setItem('keyWorldList', JSON.stringify(this.keyWorldList))
        // 搜索功能
        const res = await getSearchMusic(this.searchKey)
        // console.log(res)
        this.searchMusicList = res.data.result.songs

        // 清空输入框
        this.searchKey = ''
      }
    },
    // 删除历史搜索
    delHistory() {
      localStorage.removeItem('keyWorldList')
      this.keyWorldList = []
    },
    // 点击搜索历史搜索
    async spanHistory(item) {
      const res = await getSearchMusic(item)
      // console.log(res)
      this.searchMusicList = res.data.result.songs
    },
    // 点击歌曲添加到播放列表
    updateIndex(item) {
      this.pushPlayList(item)
      this.updatePlayListIndex(this.playList.length - 1)
    }
  }
}
</script>

<style scoped lang="less">
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  .icon {
    width: 0.8rem;
    height: 0.8rem;
  }
}
.seachHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-size: 0.4rem;
    font-weight: 700;
  }
  .deleteShow {
    width: 100%;
    .spanKey {
      font-size: 0.4rem;
      padding: 0.1rem 0.2rem;
      background-color: rgb(182, 177, 177);
      border-radius: 0.4rem;
      margin: 0.1rem 0.2rem;
      display: inline-block;
    }
  }

  .vanicon {
    position: absolute;
    top: 0.4rem;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  height: 1.4rem;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .listLeft {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    .index {
      font-size: 0.5rem;
      width: 0.2rem;
      display: inline-block;
      text-align: center;
    }
    .content {
      padding-left: 0.2rem;
      .name {
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.4rem;
        font-weight: 700;
      }
      .author {
        font-weight: 400;
        font-size: 0.24rem;
        color: #999;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      margin-left: 0.3rem;
    }
  }
  .listRight {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    background-color: #fff;
    .icon {
      position: absolute;
      z-index: 2;
      fill: #999;
    }
    .liebiao {
      position: absolute;
      right: 0;
    }
  }
}
</style>

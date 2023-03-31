<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true" @click="playMusic(0)">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span
          >播放全部<span>(共{{ itemList.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jiahao1"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemListContent">
      <div class="itemList" v-for="(item, i) in itemList" :key="i" @click="playMusic(i)">
        <div class="listLeft">
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
      <div class="block"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  setup(props) {
    // console.log(props)
  },
  methods: {
    // 'updatePlayAll'
    ...mapMutations(['updatePlayList', 'updatePlayListIndex']),
    playMusic(i) {
      this.updatePlayList(this.itemList)
      this.updatePlayListIndex(i)
      // this.updatePlayAll()
    }
  },
  props: ['itemList', 'subscribedCount']
}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background: #fff;
  border-radius: 0.4rem 0.4rem 0 0;
  .itemListTop {
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    padding-top: 0.2rem;
    .listLeft {
      width: 5rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        width: 0.55rem;
        height: 0.55rem;
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        font-size: 0.5rem;
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .listRight {
      width: 3.5rem;
      height: 100%;
      display: flex;
      align-items: center;
      background: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      span {
        display: block;
        font-size: 0.38rem;
        justify-content: space-between;
      }
      .icon {
        width: 0.55rem;
        height: 0.55rem;
        margin-right: 0.1rem;
      }
    }
  }
  .itemListContent {
    width: 100%;
    background: #fff;
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
    .itemList:hover {
      background: #ddd;
    }
  }
  .block {
    width: 100%;
    height: 1.4rem;
  }
}
</style>

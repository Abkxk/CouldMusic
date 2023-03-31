<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-meirituijian"></use>
        <span>每日推荐</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhibo"></use>
        <span>私人FM</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlegedan-01"></use>
        <span>歌单</span>
      </svg>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
        <span>排行榜</span>
      </svg>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.iconList {
  width: 100%;
  height: 2rem;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .iconItem {
    width: 25%;
    height: 100%;
    font-size: 0.35rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>

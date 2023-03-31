<template>
  <div class="topNav">
    <div class="topLeft">
      <van-icon name="orders-o" size=".7rem" />
    </div>
    <div class="topContent">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <van-icon name="search" size=".7rem" @click="$router.push('/search')" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.topNav {
  width: 100%;
  margin-top: 0.2rem;
  padding: 0;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topContent {
    width: 65%;
    height: 100%;
    font-size: 0.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .active {
      font-weight: 900;
    }
  }
}
</style>

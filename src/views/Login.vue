<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input type="text" name="phone" class="phone" v-model="phone" placeholder="请输入手机号" />
      <input type="text" name="password" class="password" v-model="password" placeholder="请输入密码" />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/request/api/home.js'
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async Login() {
      // 调取store里的getLogin方法，从而传值
      const res = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })
      // console.log(res)
      if (res.data.code === 200) {
        // 调用updateIsLogin并传值
        this.$store.commit('updateIsLogin', true)
        // 调用updateToken并传值 原本应该是data.token 接口问题导致没有，故换成userId
        this.$store.commit('updateToken', res.data.userId)
        // code等于200=>登录成功，跳转到首页
        this.$router.push('/')
      } else {
        alert('账号/密码错误')
        this.password = ''
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 17.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(235, 206, 206);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: aliceblue;
  }
  .loginContent {
    width: 100%;
    height: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .password {
      width: 5rem;
      height: 1rem;
      font-size: 0.45rem;
      border: 0.02rem solid #999;
    }
    .btn {
      width: 2rem;
      height: 1rem;
      font-size: 0.6rem;
      color: black;
      border: 0.02rem solid #999;
    }
  }
}
</style>

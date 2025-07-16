<template>
  <view v-if="show" class="login-modal-mask">
    <view class="login-modal-content">
      <view class="login-modal-bar"></view>
      <image class="login-modal-close" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a2b6f9bbd0-3e0222b3-3317-477c-a245-d814805c29cc.svg" @click="close" />
      <image class="login-modal-avatar-img" src="https://miaoduo.fbcontent.cn/private/resource/image/197bf76b14a4530-bde7d7a2-af0b-495d-9fd3-9c413b525ac4.png" mode="aspectFill" />
      <view class="login-modal-title">授权登录/注册</view>
      <view class="login-modal-protocol-row" @click="checkboxChange">
        <view class="login-modal-checkbox">
          <image class="login-modal-checkbox-img" :src="checked ? '../static/check.svg' : '../static/uncheck.svg'" />
        </view>
        <text class="login-modal-protocol-text">登录即表示同意</text>
        <text class="login-modal-protocol-link" @click.stop="onUserAgreement">《用户协议》</text>
        <text class="login-modal-protocol-text">和</text>
        <text class="login-modal-protocol-link" @click.stop="onPrivacy">《隐私政策》</text>
      </view>
      <button
        class="login-modal-btn"
        :class="{ 'login-modal-btn-disabled': !checked }"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
        :disabled="loading || !checked"
      >
        {{ loading ? '登录中...' : '手机号一键登录/注册' }}
      </button>
      <view class="login-modal-cancel" @click="close">暂不登录</view>
    </view>
  </view>
</template>

<script>
import {get ,post} from '../utils/request'

export default {
  name: 'LoginRegisterModal',
  props: {
    show: Boolean
  },
  data() {
    return {
      loading: false,
      checked: false // 是否同意协议
    }
  },

  mounted() {
  console.log('LoginRegisterModal this.$store:', this.$store)
},
  methods: {
    checkboxChange() {
      this.checked = !this.checked
    },
    loginErr() {
      uni.showToast({
        title: '请先同意用户协议和隐私协议',
        icon: 'none'
      })
    },
    // 微信小程序一键登录
    async onGetPhoneNumber(e) {
      if (!this.checked) {
        this.loginErr()
        return
      }
      this.loading = true
      wx.login({
        success: async (res) => {
          if (res.code) {
            const code = res.code
            const encryptedData = e.detail.encryptedData
            const iv = e.detail.iv
            try {
              // 你自己的 post 封装，或用 uni.request
              const resdata = await post('/api/v2/auth/mini-program-login', {
                code,
                encryptedData,
                iv
              })
              wx.setStorageSync('token', resdata.token)
              wx.setStorageSync('userInfo', resdata.userInfo)
              this.$store.commit('setToken', resdata.token)
              this.$store.commit('setUserInfo', resdata.userInfo)
              uni.showToast({ title: '登录成功', icon: 'success' })
            } catch (e) {
              uni.showToast({ title: '登录失败，请重试', icon: 'none' })
            } finally {
              this.loading = false
            }
          } else {
            this.loading = false
            uni.showToast({ title: '微信登录失败', icon: 'none' })
          }
        },
        fail: () => {
          this.loading = false
          uni.showToast({ title: '微信登录失败', icon: 'none' })
        }
      })
    }
  }
}
</script>

<style scoped>
.login-modal-mask {
  position: fixed;
  left: 0; right: 0; bottom: 0; top: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.login-modal-content {
  width: 100vw;
  background: #fff;
  border-top-left-radius: 48rpx;
  border-top-right-radius: 48rpx;
  box-shadow: 0px 10rpx 30rpx 0 rgba(0,0,0,0.10);
  padding-bottom: 40rpx;
  animation: slideUp 0.3s cubic-bezier(.25,.8,.25,1);
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  padding-left: 64rpx;
  padding-right: 64rpx;
  padding-top: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.login-modal-bar {
  width: 80rpx;
  height: 8rpx;
  background: #D1D5DB;
  border-radius: 8rpx;
  margin: 16rpx auto 0 auto;
}
.login-modal-close {
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  right: 32rpx;
  top: 24rpx;
  z-index: 2;
}
.login-modal-avatar-img {
  display: block;
  margin: 42rpx auto 0 auto;
  width: 128rpx;
  height: 128rpx;
  object-fit: cover;
}
.login-modal-title {
  color: #000;
  font-size: 36rpx;
  font-weight: 600;
  line-height: 56rpx;
  text-align: center;
  margin: 32rpx auto 0 auto;
}
.login-modal-protocol-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 44rpx;
  margin-bottom: 0;
}
.login-modal-checkbox {
  background: #fff;
  border-radius: 9999rpx;
  width: 32rpx;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8rpx;
}
.login-modal-checkbox-img {
  width: 32rpx;
  height: 32rpx;
}
.login-modal-protocol-text {
  color: #6B7280;
  font-size: 24rpx;
  line-height: 32rpx;
  margin: 0 4rpx;
}
.login-modal-protocol-link {
  color: #00BD97;
  font-size: 24rpx;
  line-height: 32rpx;
  margin: 0 2rpx;
}
.login-modal-btn {
  background: linear-gradient(90deg, #00BD97 0%, #00A583 100%);
  border-radius: 24rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  text-align: center;
  margin: 32rpx auto 0 auto;
  padding: 0rpx 0;
  width: 550rpx;
  border: 0;
}
.login-modal-btn-disabled {
  background: #B2F1E2;
  color: #fff;
}
.login-modal-cancel {
  color: #6B7280;
  font-size: 28rpx;
  line-height: 48rpx;
  text-align: center;
  margin: 24rpx auto 0 auto;
  width: 150rpx;
}
</style> 
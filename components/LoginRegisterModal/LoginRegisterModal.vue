<template>
  <view class="login-modal-content">
    <image class="login-modal-avatar-img" src="../../static/logo.png" mode="aspectFill" />
    <view class="login-modal-title">授权登录/注册</view>
    <view class="login-modal-protocol-row" @click="checkboxChange">
      <view class="login-modal-checkbox">
        <image class="login-modal-checkbox-img"
          :src="checked ? '../../static/check.svg' : '../../static/uncheck.svg'" />
      </view>
      <text class="login-modal-protocol-text">登录即表示同意</text>
      <text class="login-modal-protocol-link" @click.stop="onUserAgreement">《用户协议》</text>
      <text class="login-modal-protocol-text">和</text>
      <text class="login-modal-protocol-link" @click.stop="onPrivacy">《隐私政策》</text>
    </view>
    <button class="login-modal-btn" :class="{ 'login-modal-btn-disabled': !checked }" open-type="getPhoneNumber"
      @getphonenumber="onGetPhoneNumber" :disabled="loading || !checked">
      {{ loading ? '登录中...' : '手机号一键登录/注册' }}
    </button>
    <view class="login-modal-cancel" @click="close">暂不登录</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { post } from '@/utils/request'
import { useUserStore } from '@/store/user'

const props = defineProps({
  show: Boolean
})
const emit = defineEmits(['close'])

const loading = ref(false)
const checked = ref(false)
const userStore = useUserStore()

function close() {
  emit('close')
}

function checkboxChange() {
  checked.value = !checked.value
}

function loginErr() {
  uni.showToast({
    title: '请先同意用户协议和隐私协议',
    icon: 'none'
  })
}

// 微信小程序一键登录
async function onGetPhoneNumber(e) {
  if (!checked.value) {
    loginErr()
    return
  }
  loading.value = true
  wx.login({
    success: async (res) => {
      if (res.code) {
        const code = res.code
        const encryptedData = e.detail.encryptedData
        const iv = e.detail.iv
        try {
          const resdata = await post('/api/v2/auth/mini-program-login', {
            code,
            encryptedData,
            iv
          })
          wx.setStorageSync('token', resdata.token)
          wx.setStorageSync('userInfo', resdata.userInfo)
          userStore.setUserInfo(resdata.userInfo)
          userStore.setToken(resdata.token)
          uni.showToast({ title: '登录成功', icon: 'success' })
          close()
        } catch (e) {
          uni.showToast({ title: '登录失败，请重试', icon: 'none' })
        } finally {
          loading.value = false
        }
      } else {
        loading.value = false
        uni.showToast({ title: '微信登录失败', icon: 'none' })
      }
    },
    fail: () => {
      loading.value = false
      uni.showToast({ title: '微信登录失败', icon: 'none' })
    }
  })
}

function onUserAgreement() {
  // 跳转到用户协议页面
}
function onPrivacy() {
  // 跳转到隐私政策页面
}
</script>

<style scoped>
.login-modal-mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.login-modal-content {
  width: 100%;
  /* 去掉弹窗圆角、背景、动画、padding、position、overflow-y 等 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* 可选：去掉左右内边距，保留顶部间距 */
  padding-top: 24rpx;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
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
}

.login-modal-btn::after {
  border: none;
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
<template>
  <view class="mine-wrapper">
    <StatusBarGap title="我的" />
    <!-- 顶部标题 -->
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="user-card-bar"></view>
      <template v-if="userInfo">
        <view class="user-info-row">
          <view class="avatar-border">
            <image
              class="user-avatar"
              :src="userInfo.avatarUrl || '../../static/logo.png'"
              mode="aspectFill"
            />
          </view>
          <view class="user-info">
            <view class="user-info-top">
              <text class="user-name">{{ userInfo.nickname }}</text>
              <view class="user-tag" v-if="userInfo.referrer"><text>推客</text></view>
            </view>
            <text class="user-phone">{{ userInfo.phone }}</text>
            <text class="user-id">ID: {{ userInfo.id }}</text>
          </view>
        </view>
      </template>
      <template v-else>
        <view class="mine-unlogin-wrapper">
          <text class="mine-unlogin-title">您尚未登录</text>
          <text class="mine-unlogin-desc">登录后可查看个人信息和享受更多功能</text>
          <button class="mine-unlogin-btn" @click="goLogin">立即登录/注册</button>
        </view>
      </template>
    </view>

    <!-- 钱包卡片 -->
    <view class="wallet-card">
      <view class="wallet-row">
        <text class="wallet-title">我的钱包</text>
        <text class="wallet-action" @click="goWallet">去提现 &gt;</text>
      </view>
      <view class="wallet-amount-row">
        <text class="wallet-amount">¥{{ userInfo ? '1,280' : '0' }}</text>
        <text class="wallet-amount">¥{{ userInfo ? '520' : '0' }}</text>
      </view>
      <view class="wallet-label-row">
        <text class="wallet-label">账户余额</text>
        <text class="wallet-label">已提现金额</text>
      </view>
    </view>

    <!-- 常用功能 -->
    <view class="feature-card">
      <view class="feature-title">常用功能</view>
      <view class="feature-grid">
        <view class="feature-item" @click="goWallet">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://img.xinchebangmai.cn/61ce78ef-3a76-4a7f-bf52-fe600f56b380.png" mode="aspectFill" />
          </view>
          <text class="feature-label">我的钱包</text>
        </view>
        <view class="feature-item" @click="goFavorite">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://img.xinchebangmai.cn/7fe2a67a-1d34-4fde-adc5-f690819102ac.png" mode="aspectFill" />
          </view>
          <text class="feature-label">我的收藏</text>
        </view>
        <view class="feature-item" @click="goSetting">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://img.xinchebangmai.cn/fcd0d69f-3e38-4c9e-b5b2-7271336417e7.png" mode="aspectFill" />
          </view>
          <text class="feature-label">设置</text>
        </view>
        <!-- <view class="feature-item" @click="goMessage">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197e8e0b2583c62-689978da-df39-408a-8950-9d4f865f6232.svg" mode="aspectFill" />
          </view>
          <text class="feature-label">消息中心</text>
        </view> -->
        <view class="feature-item" @click="goService">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://img.xinchebangmai.cn/6ba279b4-e803-4d97-be8c-cf5eb74065ad.png" mode="aspectFill" />
          </view>
          <text class="feature-label">联系客服</text>
        </view>
        <view class="feature-item" @click="goData">
          <view class="feature-icon-bg">
            <image class="feature-icon" src="https://img.xinchebangmai.cn/07fa84ee-b194-4915-b49a-ca561d02bca9.png" mode="aspectFill" />
          </view>
          <text class="feature-label">数据</text>
        </view>
      </view>
    </view>

    <BaseModal v-model="baseModalShow"  @close="closeBaseModal">
    <LoginRegisterModal  @close="closeBaseModal"/>
    </BaseModal>

    <u-tabbar :value="active" @change="onChange" :fixed="true" :safeAreaInsetBottom="true" :activeColor="'#00BD97'" :inactiveColor="'#6B7280'">
    <u-tabbar-item icon="/static/a.png" text="首页" name="index" />
    <u-tabbar-item icon="/static/b.png"  text="进度" name="progress" />
    <u-tabbar-item v-if="userInfo && userInfo.referrer == 1" icon="/static/c.png"  text="推客" name="referrer" />
    <u-tabbar-item icon="/static/dd.png"  text="我的" name="mine" />
  </u-tabbar>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import StatusBarGap from '@/components/StatusBarGap/StatusBarGap.vue'
import LoginRegisterModal from '@/components/LoginRegisterModal/LoginRegisterModal.vue'
import BaseModal from '@/components/BaseModal/BaseModal.vue'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const baseModalShow = ref(false)
const active = ref('mine')

function onChange(name) {
  
  const map = {
    index: '/pages/index/index',
    progress: '/pages/progress/index',
    referrer: '/pages/referrer/index',
    mine: '/pages/mine/index'
  }
  uni.switchTab({ url: map[name] })
}

function goWallet() {
  uni.navigateTo({ url: '/pages/mine/wallet/index' })
}
function goFavorite() {
  uni.navigateTo({ url: '/pages/mine/favorite/index' })
}
function goMessage() {
  uni.navigateTo({ url: '/pages/mine/message/index' })
}
function goService() {
  uni.navigateTo({ url: '/pages/mine/service/index' })
}
function goSetting() {
  uni.navigateTo({ url: '/pages/mine/settings/index' })
}
function goData() {
  uni.navigateTo({ url: '/pages/mine/data/index' })
}
function goLogin() {
  baseModalShow.value = true
}
function closeBaseModal() {
  console.log('关闭弹框');
  
  baseModalShow.value = false
}
</script>

<style scoped>
.mine-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 28rpx;
  font-weight: 400;
  padding-bottom: 120rpx;
  box-sizing: border-box;
}
.mine-header {
  background: #fff;
  display: flex;
  align-items: center;
  padding-left: 40rpx;
  padding-top: 32rpx;
  padding-bottom: 32rpx;
}
.mine-title {
  color: #00BD97;
  font-size: 40rpx;
  font-weight: 600;
  line-height: 56rpx;
}
.user-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 64rpx;
  overflow: hidden;
  padding-bottom: 64rpx;
}
.user-card-bar {
  background: rgba(0,189,151,0.20);
  width: 100%;
  height: 16rpx;
}
.user-info-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32rpx;
  padding: 0 40rpx;
}
.avatar-border {
  border: 4rpx solid rgba(0,189,151,0.30);
  border-radius: 9999rpx;
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 160rpx;
  height: 160rpx;
}
.user-avatar {
  width: 152rpx;
  height: 152rpx;
  border-radius: 9999rpx;
  background-size: cover;
  display: block;
}
.user-info {
  margin-top: 4rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.user-info-top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.user-name {
  color: #000;
  font-size: 32rpx;
  line-height: 48rpx;
  font-weight: 500;
}
.user-tag {
  background: rgba(0,189,151,0.10);
  border-radius: 9999rpx;
  padding: 3rpx 12rpx;
  display: flex;
  align-items: center;
  color: #00BD97;
  font-size: 20rpx;
  font-weight: 300;
  line-height: 32rpx;
}
.user-phone {
  color: #6B7280;
  line-height: 40rpx;
  font-size: 28rpx;
}
.user-id {
  color: #6B7280;
  font-size: 24rpx;
  line-height: 32rpx;
  margin-right: 26rpx;
}
.wallet-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.wallet-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.wallet-title {
  color: #000;
  font-size: 36rpx;
  line-height: 56rpx;
}
.wallet-action {
  color: #6B7280;
  line-height: 40rpx;
  font-size: 28rpx;
  margin-top: 8rpx;
}
.wallet-amount-row {
  margin-top: 24rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 14rpx;
}
.wallet-amount {
  color: #00BD97;
  font-size: 48rpx;
  line-height: 64rpx;
}
.wallet-label-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 27rpx;
  padding-right: 2rpx;
}
.wallet-label {
  color: #6B7280;
  line-height: 40rpx;
  font-size: 28rpx;
}
.feature-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  padding: 40rpx 40rpx 40rpx 40rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.feature-title {
  color: #000;
  font-size: 36rpx;
  line-height: 56rpx;
  margin-bottom: 16rpx;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-bottom: 0;
}
.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex: 1; */
  gap: 16rpx;
  padding-top: 24rpx;
  padding-bottom: 24rpx;
}
.feature-icon-bg {
  background: rgba(0,189,151,0.10);
  border-radius: 9999rpx;
  padding: 24rpx;
  display: flex;
  width: 64rpx;
  height: 64rpx;
  justify-content: center;
  align-items: center;
}
.feature-icon {
  width: 48rpx;
  height: 48rpx;
  background-size: cover;
}
.feature-label {
  color: #374151;
  line-height: 40rpx;
  font-size: 28rpx;
  text-align: center;
}
.mine-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 112rpx;
  box-shadow: 0 -2rpx 8rpx 0 rgba(0,0,0,0.04);
  z-index: 100;
}
.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  color: #6B7280;
  font-size: 24rpx;
}
.tabbar-item.active {
  color: #00BD97;
}
.tabbar-icon {
  width: 48rpx;
  height: 48rpx;
}
.mine-tabbar-bar {
  background: #000;
  border-radius: 9999rpx;
  width: 268rpx;
  height: 10rpx;
  margin: 29rpx auto 0 auto;
}
.login-btn {
  margin-top: 8rpx;
  background: #00BD97;
  color: #fff;
  border: none;
  border-radius: 9999rpx;
  padding: 12rpx 40rpx;
  font-size: 28rpx;
  font-weight: 500;
}
.mine-unlogin-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-top: 24rpx;
  padding: 0 0 24rpx 0;
}
.mine-unlogin-title {
  color: #374151;
  font-size: 36rpx;
  font-weight: 500;
  line-height: 56rpx;
  text-align: center;
  margin-bottom: 4rpx;
}
.mine-unlogin-desc {
  color: #6B7280;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 40rpx;
  text-align: center;
  margin-bottom: 16rpx;
}
.mine-unlogin-btn {
  background: linear-gradient(135deg, #00BD97 15%, #00A583 85%);
  box-shadow: 0 2rpx 4rpx 0 rgba(0,189,151,0.20);
  border-radius: 16rpx;
  color: #fff;
  margin-top: 30rpx;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 48rpx;
  padding: 24rpx 0;
  width: 480rpx;
  text-align: center;
  border: none;
  margin: 0 auto;
}
</style>

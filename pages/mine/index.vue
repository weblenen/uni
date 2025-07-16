<template>
  <view class="mine-content">
    <text>我的页面</text>
    <u-button @click="goWallet" style="margin-top: 20rpx;">我的钱包</u-button>
    <u-button @click="goFavorite" style="margin-top: 20rpx;">我的收藏</u-button>
    <u-button @click="goMessage" style="margin-top: 20rpx;">消息中心</u-button>
    <u-button @click="goService" style="margin-top: 20rpx;">联系客服</u-button>
    <u-button @click="goSettings" style="margin-top: 20rpx;">设置</u-button>
    <u-button @click="goData" style="margin-top: 20rpx;">数据</u-button>
    <u-button @click="goScan" style="margin-top: 20rpx;">扫一扫</u-button>
  </view>
</template>

<script>
export default {
  name: 'MineIndex',
  setup() {
    const goWallet = () => {
      uni.navigateTo({ url: '/pages/mine/wallet/index' })
    }
    const goFavorite = () => {
      uni.navigateTo({ url: '/pages/mine/favorite/index' })
    }
    const goMessage = () => {
      uni.navigateTo({ url: '/pages/mine/message/index' })
    }
    const goService = () => {
      uni.navigateTo({ url: '/pages/mine/service/index' })
    }
    const goSettings = () => {
      uni.navigateTo({ url: '/pages/mine/settings/index' })
    }
    const goData = () => {
      uni.navigateTo({ url: '/pages/mine/data/index' })
    }
    const goScan = () => {
      uni.navigateTo({ url: '/pages/mine/scan/index' })
    }
    return {
      goWallet,
      goFavorite,
      goMessage,
      goService,
      goSettings,
      goData,
      goScan
    }
  }
}
</script>

<style>
.mine-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style> 
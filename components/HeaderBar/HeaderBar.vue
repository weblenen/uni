<template>
  <view class="headerbar-root">
    <!-- 状态栏占位 -->
    <view :style="{height: statusBarHeightRpx + 'rpx', width: '100%', background: '#fff'}"></view>
    <!-- 顶部栏 -->
    <view class="headerbar-main">
      <view class="headerbar-left" @click="goBack">
        <image class="headerbar-left-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197ed26bf79d4cf-5fa466db-722e-46f3-895f-18543bcf8e73.svg" mode="aspectFit" />
      </view>
      <view class="headerbar-title-left">{{ title }}</view>
   
    </view>
    <!-- 插槽内容 -->
    <view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'HeaderBar',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      statusBarHeightRpx: 0
    }
  },
  created() {
    const info = uni.getSystemInfoSync();
    const px2rpx = 750 / info.screenWidth;
    this.statusBarHeightRpx = info.statusBarHeight * px2rpx;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    }
  }
}
</script>

<style scoped>
.headerbar-root {
  background: #F9FAFB;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.headerbar-main {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20rpx;
  padding-right: 20rpx;
  padding-top: 12rpx;
  padding-bottom: 12rpx;
}
.headerbar-left {
  width: 48rpx;
  display: flex;
  align-items: center;
}
.headerbar-left-icon {
  width: 48rpx;
  height: 48rpx;
}
.headerbar-title {
  flex: 1;
  text-align: center;
  color: #374151;
  font-size: 36rpx;
  font-weight: 500;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 56rpx;
}
.headerbar-title-left {
  flex: 1;
  text-align: left;
  color: #374151;
  font-size: 36rpx;
  font-weight: 500;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 56rpx;
  margin-left: 16rpx;
}
.headerbar-right {
  width: 98rpx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.headerbar-right-icon {
  width: 98rpx;
  height: 36rpx;
}
</style>
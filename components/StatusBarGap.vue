<template>
  <view>
    <!-- 状态栏占位 -->
    <view :style="{height: statusBarHeightRpx + 'rpx', width: '100%', background: '#fff'}"></view>
    <!-- 标题栏 -->
    <view
      v-if="showTitle"
      :style="{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        paddingLeft: '32rpx',
        paddingTop: '12rpx',
        paddingBottom: '12rpx',
        fontWeight: 600,
        fontSize: '20px',
        color: '#00BD97',
        fontFamily: `'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif`,
        boxSizing: 'border-box',
      }"
    >
      {{ title }}
    </view>
    <!-- 插槽内容 -->
    <view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'StatusBarGap',
  props: {
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
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
  }
}
</script>
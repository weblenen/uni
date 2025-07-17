<template>
  <view>
    <HeaderBar title="联系客服" />
    <view class="content">
      <image
        :src="qrCodeImg"
        class="qrcode"
        mode="widthFix"
        @longpress="onLongPress"
        show-menu-by-longpress
      />
      <text class="tip">长按二维码添加客服</text>
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
export default {
  components: {
    HeaderBar
  },
  data() {
    return {
      qrCodeImg: 'https://img.xinchebangmai.cn/28ea661b-94a0-4d89-b080-26254f1996f8.jpg'
    }
  },
  methods: {
    onLongPress() {
    //   uni.showToast({
    //     title: '请在微信/支付宝中长按识别二维码',
    //     icon: 'none'
    //   });
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80rpx;
}
.qrcode {
  width: 600rpx;
  margin-bottom: 40rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.08);
  background: #fff;
}
.tip {
  font-size: 28rpx;
  color: #888;
}
</style>
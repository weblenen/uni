<template>
  <view class="message-wrapper">
    <HeaderBar title="消息中心" />
    <view class="message-list">
      <view class="message-item" v-for="(msg, idx) in messages" :key="idx">
        <view class="message-item-header">
          <view class="message-item-dot" :style="{background: msg.dotColor}"></view>
          <text class="message-item-title">{{ msg.title }}</text>
          <text class="message-item-time">{{ msg.time }}</text>
        </view>
        <view class="message-item-content">{{ msg.content }}</view>
        <image v-if="msg.img" class="message-item-img" :src="msg.img" mode="aspectFill" />
        <view class="message-item-footer">
          <text class="message-item-detail">查看详情</text>
          <image class="message-item-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197edc42376964a-e72b5a24-860a-4691-a255-9e087c8a5829.svg" mode="aspectFill" />
        </view>
      </view>
    </view>
    <view class="message-bottom-bar"></view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
export default {
  name: 'MessagePage',
  components: { HeaderBar },
  data() {
    return {
      messages: [
        {
          title: '系统通知',
          time: '10分钟前',
          content: '您的账户已成功充值¥500，请查收。如有疑问，请联系客服。',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197d402189fd9b1-f10fef8a-77a2-4513-a263-74f5400acdb5.jpeg',
          dotColor: '#00BD97'
        },
        {
          title: '活动消息',
          time: '2小时前',
          content: '恭喜您获得"双十一大促"活动优惠券，满300减50，请在个人中心查看详情。',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197d402189f0c3d-e7b19678-c229-470c-8ed6-d034da79a446.jpeg',
          dotColor: '#00BD97'
        },
        {
          title: '订单通知',
          time: '昨天',
          content: '您的订单#123456已发货，预计3-5天送达，请保持手机畅通。',
          img: '',
          dotColor: '#00BD97'
        },
        {
          title: '系统更新',
          time: '2天前',
          content: '我们的应用已更新至最新版本，新增多项功能与体验优化，欢迎体验。',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197d40218a01e5b-dc8206be-2d08-4acc-90f9-62acfdd1db0c.jpeg',
          dotColor: '#00BD97'
        },
        {
          title: '账户安全',
          time: '3天前',
          content: '您的账户于今日在新设备上登录，如非本人操作，请立即修改密码。',
          img: '',
          dotColor: '#00BD97'
        }
      ]
    }
  }
}
</script>

<style scoped>
.message-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 28rpx;
  font-weight: 400;
  padding-bottom: 40rpx;
  box-sizing: border-box;
}
.message-list {
  margin: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
.message-item {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  margin-top: 0;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}
.message-item-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
  justify-content: space-between;
}
.message-item-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 8rpx;
  margin-right: 8rpx;
}
.message-item-title {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
  flex: 1;
  text-align: left;
}
.message-item-time {
  color: #6B7280;
  font-size: 24rpx;
  margin-left: 16rpx;
}
.message-item-content {
  color: #374151;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-right: 8rpx;
  min-height: 40rpx;
}
.message-item-img {
  border-radius: 16rpx;
  width: 100%;
  max-width: 700rpx;
  height: 180rpx;
  background-size: cover;
  margin: 0 auto;
}
.message-item-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rpx;
  margin-top: 8rpx;
}
.message-item-detail {
  color: #00BD97;
  font-size: 28rpx;
  margin-left: auto;
}
.message-item-arrow {
  width: 32rpx;
  height: 32rpx;
  margin-left: 8rpx;
}
.message-bottom-bar {
  background: #000;
  border-radius: 9999rpx;
  width: 134rpx;
  height: 10rpx;
  margin: 30rpx auto 0 auto;
}
</style>
<template>
  <view v-if="show" class="member-modal-mask" @click.self="close">
    <view class="member-modal-content">
      <view class="member-modal-bar"></view>
      <view class="member-modal-header">
        <view class="member-modal-header-left">
          <image class="member-modal-avatar" :src="member.img" mode="aspectFill" />
          <view class="member-modal-header-info">
            <view class="member-modal-header-row">
              <view class="member-modal-name">{{ member.name }}</view>
              <view class="member-modal-status" :class="statusClass">{{ member.status }}</view>
            </view>
            <view class="member-modal-phone">{{ encryptPhone(member.desc) }}</view>
          </view>
        </view>
        <image class="member-modal-close" src="/static/close.png" @click="close" />
      </view>
      <view class="member-modal-tabs">
        <view class="member-modal-tab member-modal-tab-active">全部</view>
        <view class="member-modal-tab">今日</view>
        <view class="member-modal-tab">昨日</view>
        <view class="member-modal-tab">7日</view>
        <view class="member-modal-tab">本月</view>
        <view class="member-modal-tab">上月</view>
      </view>
      <view class="member-modal-section">
        <view class="member-modal-section-title">客户转化概览</view>
        <view class="member-modal-overview-list">
          <view class="member-modal-overview-item">
            <view class="member-modal-overview-left">
              <image class="member-modal-overview-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f8cb71a9bfc1-04fd4910-1fca-43fd-8951-69648a427be8.svg" mode="aspectFill" />
              <view class="member-modal-overview-label">覆盖用户</view>
            </view>
            <view class="member-modal-overview-value">24人</view>
          </view>
          <view class="member-modal-overview-item">
            <view class="member-modal-overview-left">
              <image class="member-modal-overview-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f8cb71aa71d9-60a798e8-8c46-4186-8518-ef76ee1c13a6.svg" mode="aspectFill" />
              <view class="member-modal-overview-label">注册用户</view>
            </view>
            <view class="member-modal-overview-value">24人 <text class="member-modal-overview-rate">(63%)</text></view>
          </view>
          <view class="member-modal-overview-item">
            <view class="member-modal-overview-left">
              <image class="member-modal-overview-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f8cb71aa457f-99cf8503-28a7-4a54-99df-a5776ff5e93c.svg" mode="aspectFill" />
              <view class="member-modal-overview-label">领券用户</view>
            </view>
            <view class="member-modal-overview-value">18人 <text class="member-modal-overview-rate">(75%)</text></view>
          </view>
          <view class="member-modal-overview-item">
            <view class="member-modal-overview-left">
              <image class="member-modal-overview-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f8cb71ab8932-fc66a1e8-640d-4d70-a272-6ade77d1f803.svg" mode="aspectFill" />
              <view class="member-modal-overview-label">购车用户</view>
            </view>
            <view class="member-modal-overview-value">12人 <text class="member-modal-overview-rate">(67%)</text></view>
          </view>
        </view>
        <view class="member-modal-section-order" @click="goOrderDetail">
          <view class="member-modal-section-order-left">
            <image class="member-modal-order-icon" src="../static/ddmx.png" mode="aspectFill" />
            <view class="member-modal-section-order-title">订单明细</view>
          </view>
          <image class="member-modal-order-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197f8cb71abfcff-1fe8bf1f-e0d1-4430-b26a-c6e2a2c449d9.svg" mode="aspectFill" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar.vue';
export default {
  name: 'MemberDetailModal',
  components: { HeaderBar },
  props: {
    show: Boolean,
    member: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    statusClass() {
      if (!this.member.statusClass) return '';
      return this.member.statusClass.replace('team-manage-status', 'member-modal-status');
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    encryptPhone(phone) {
      if (!phone || phone.length < 7) return phone;
      return phone.substr(0, 3) + '****' + phone.substr(7);
    },
    goOrderDetail() {
      uni.navigateTo({
        url: '/pages/data/order-detail'
      });
    }
  }
}
</script>

<style scoped>
.member-modal-mask {
  position: fixed;
  left: 0; right: 0; bottom: 0; top: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.member-modal-content {
  width: 100vw;
  background: #fff;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.00), 0px 0px 0px 0px rgba(0,0,0,0.00), 0px 20rpx 30rpx -6rpx rgba(0,0,0,0.10), 0px 8rpx 12rpx -8rpx rgba(0,0,0,0.10);
  padding-bottom: 68rpx;
  padding-top: 16rpx;
  padding-left: 40rpx;
  padding-right: 40rpx;
  animation: memberSlideUp 0.3s cubic-bezier(.25,.8,.25,1);
  max-width: 880rpx;
  overflow: hidden;
}
@keyframes memberSlideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.member-modal-bar {
  background: #D1D5DB;
  border-radius: 9999rpx;
  width: 80rpx;
  height: 10rpx;
  margin: 0 auto 24rpx auto;
}
.member-modal-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2rpx solid #F3F4F6;
  padding-bottom: 34rpx;
}
.member-modal-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24rpx;
}
.member-modal-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin-right: 24rpx;
}
.member-modal-header-info {
  display: flex;
  flex-direction: column;
}
.member-modal-header-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.member-modal-name {
  color: #000;
  font-size: 32rpx;
  line-height: 48rpx;
  min-width: 96rpx;
  font-weight: 500;
}
.member-modal-status {
  background: #DCFCE7;
  border-radius: 9999rpx;
  display: flex;
  width: 80rpx;
  justify-content: center;
  align-items: center;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
  padding: 8rpx 16rpx;
  color: #16A34A;
  font-size: 24rpx;
  line-height: 32rpx;
}
.member-modal-status-yellow {
  background: #FEF9C3;
  color: #CA8A04;
}
.member-modal-status-gray {
  background: #F3F4F6;
  color: #4B5563;
}
.member-modal-phone {
  color: #6B7280;
  font-size: 28rpx;
  line-height: 40rpx;
  margin-top: 8rpx;
}
.member-modal-close {
  width: 40rpx;
  height: 40rpx;
  margin-left: 24rpx;
  margin-top: 28rpx;
}
.member-modal-tabs {
  margin-top: 32rpx;
  margin-bottom: 16rpx;
  gap: 8rpx;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.member-modal-tab {
  background: #F3F4F6;
  border-radius: 9999rpx;
  min-width: 72rpx;
  min-height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4B5563;
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  margin-right: 8rpx;
}
.member-modal-tab-active {
  background: #00BD97;
  color: #fff;
}
.member-modal-section {
  margin-top: 16rpx;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.member-modal-section-title {
  color: #000;
  font-size: 28rpx;
  line-height: 40rpx;
  font-weight: 500;
  margin-bottom: 8rpx;
}
.member-modal-overview-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.member-modal-overview-item {
  background: #F9FAFB;
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 42rpx 32rpx 32rpx;
}
.member-modal-overview-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.member-modal-overview-icon {
  width: 64rpx;
  height: 64rpx;
  margin-right: 24rpx;
}
.member-modal-overview-label {
  color: #000;
  font-size: 28rpx;
  line-height: 40rpx;
  min-width: 112rpx;
  margin-top: 12rpx;
}
.member-modal-overview-value {
  color: #000;
  font-size: 32rpx;
  line-height: 48rpx;
  min-width: 70rpx;
  margin-top: 8rpx;
}
.member-modal-overview-rate {
  color: #16A34A;
  font-size: 24rpx;
  margin-left: 8rpx;
}
.member-modal-section-order {
  background: linear-gradient(90deg, #F0FDF4 0%, #DCFCE7 100%);
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  padding: 20rpx 32rpx 20rpx 24rpx;
}
.member-modal-section-order-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.member-modal-order-icon {
  width: 80rpx;
  height: 80rpx;
  filter: drop-shadow(0px 4rpx 8rpx rgba(0, 0, 0, 0.05));
}
.member-modal-section-order-title {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 48rpx;
  margin-left: 12rpx;
}
.member-modal-order-arrow {
  width: 40rpx;
  height: 40rpx;
  margin-top: 16rpx;
}
</style> 
<template>
  <view class="tuike-wrapper">
    <StatusBarGap title="推客中心" />
    <!-- Earnings Card -->
    <view class="earnings-card">
      <view class="earnings-label">累计收益(元)</view>
      <view class="earnings-total">8,562.50</view>
      <view class="earnings-divider"></view>
      <view class="earnings-row">
        <text class="earnings-sub-label">我的佣金</text>
        <text class="earnings-sub-label right">我的奖励 &gt;</text>
      </view>
      <view class="earnings-row">
        <text class="earnings-sub-value">6,245.30</text>
        <text class="earnings-sub-value right">2,317.20</text>
      </view>
    </view>
    <!-- Menu Row -->
    <view class="menu-row">
      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <view class="menu-icon" style="background-image: url('https://miaoduo.fbcontent.cn/private/resource/image/197e97e2db3f234-4fdeb62f-6a1b-4d4d-bab3-f740e34bd26b.svg');"></view>
        </view>
        <text class="menu-label">客户</text>
      </view>
      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <view class="menu-icon" style="background-image: url('https://miaoduo.fbcontent.cn/private/resource/image/197e97e2db3c628-f49d16df-bd07-4880-88ba-6a2cfac190aa.svg');"></view>
        </view>
        <text class="menu-label">排行榜</text>
      </view>
      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <view class="menu-icon" style="background-image: url('https://miaoduo.fbcontent.cn/private/resource/image/197e97e2db4d1ba-50c0dfce-2878-44f7-a8fb-fd929449cfd9.svg');"></view>
        </view>
        <text class="menu-label">团队</text>
      </view>
      <view class="menu-item">
        <view class="menu-icon-wrapper">
          <view class="menu-icon" style="background-image: url('https://miaoduo.fbcontent.cn/private/resource/image/197e97e2db48bc2-c19f5a33-ccec-481f-95cd-908180f0c945.svg');"></view>
        </view>
        <text class="menu-label">素材</text>
      </view>
    </view>
    <!-- Order Overview -->
    <view class="order-overview-card">
      <view class="order-overview-header">
        <view class="order-overview-header-left">
          <text class="order-overview-title">订单概览</text>
          <image class="order-overview-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197e97e2db4fbd7-afd285c4-accf-4952-aad9-47df2bcc8af6.svg" mode="aspectFill" />
        </view>
        <view class="order-overview-header-tabs">
          <view class="order-overview-tab active">今日</view>
          <view class="order-overview-tab">昨日</view>
          <view class="order-overview-tab">本月</view>
          <view class="order-overview-tab">上月</view>
        </view>
      </view>
      <view class="order-overview-stats-labels">
        <view class="order-overview-stat-label">
          <text class="order-overview-stat">12</text>
          <text class="order-overview-label">订单笔数</text>
        </view>
        <view class="order-overview-stat-label">
          <text class="order-overview-stat green">1,280</text>
          <text class="order-overview-label">预估佣金(元)</text>
        </view>
        <view class="order-overview-stat-label">
          <text class="order-overview-stat red">860</text>
          <text class="order-overview-label">结算佣金(元)</text>
        </view>
      </view>
    </view>
    <!-- Order List -->
    <view class="order-list-card">
      <view class="order-list-header">
        <text class="order-list-title">订单列表</text>
      </view>
      <view class="order-list-tabs">
        <view class="order-list-tab active">全部</view>
        <view class="order-list-tab">已领取</view>
        <view class="order-list-tab flex-grow">待购车/传凭证</view>
        <view class="order-list-tab">已完成</view>
        <view class="order-list-tab">无效</view>
      </view>
      <view class="order-list">
        <!-- Order Item 1 -->
        <view class="order-item">
          <image class="order-avatar" src="https://miaoduo.fbcontent.cn/private/resource/image/197bf79da945dc6-584f673c-b65c-4e36-8401-50079fd69a16.jpeg" mode="aspectFill" />
          <view class="order-info">
            <view class="order-info-row">
              <text class="order-name">张**</text>
              <view class="order-status invalid">无效</view>
            </view>
            <text class="order-desc">135****4321 · 深圳 · 长安Lumin</text>
            <view class="order-meta-row">
              <text class="order-date">2023-06-08 11:20:15</text>
              <text class="order-commission gray">佣金: ¥0</text>
            </view>
          </view>
        </view>
        <!-- Order Item 2 -->
        <view class="order-item">
          <image class="order-avatar" src="https://miaoduo.fbcontent.cn/private/resource/image/197bf79da939985-a30c6454-fe43-4c78-84c3-cee74d13ea37.jpeg" mode="aspectFill" />
          <view class="order-info">
            <view class="order-info-row">
              <text class="order-name">李**</text>
              <view class="order-status pending">待生效</view>
            </view>
            <text class="order-desc">135****4321 · 深圳 · 长安Lumin</text>
            <view class="order-meta-row">
              <text class="order-date">2023-06-08 11:20:15</text>
              <text class="order-commission green">预估佣金¥2,000</text>
            </view>
          </view>
        </view>
        <!-- Order Item 3 -->
        <view class="order-item">
          <image class="order-avatar" src="https://miaoduo.fbcontent.cn/private/resource/image/197bf79da9307d9-b468e172-d6d8-49cb-8716-65700cf75a42.jpeg" mode="aspectFill" />
          <view class="order-info">
            <view class="order-info-row">
              <text class="order-name">王**</text>
              <view class="order-status wait">待购车/传凭证</view>
            </view>
            <text class="order-desc">135****4321 · 深圳 · 长安Lumin</text>
            <view class="order-meta-row">
              <text class="order-date">2023-06-08 11:20:15</text>
              <text class="order-commission green">预估佣金¥2,000</text>
            </view>
          </view>
        </view>
        <!-- Order Item 4 -->
        <view class="order-item">
          <image class="order-avatar" src="https://miaoduo.fbcontent.cn/private/resource/image/197bf79da945dc6-584f673c-b65c-4e36-8401-50079fd69a16.jpeg" mode="aspectFill" />
          <view class="order-info">
            <view class="order-info-row">
              <text class="order-name">赵**</text>
              <view class="order-status done">已完成</view>
            </view>
            <text class="order-desc">135****4321 · 深圳 · 长安Lumin</text>
            <view class="order-meta-row">
              <text class="order-date">2023-06-08 11:20:15</text>
              <text class="order-commission green">结算佣金¥2,000</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import StatusBarGap from '@/components/StatusBarGap/StatusBarGap.vue';
export default {
  name: 'TuikePage',
  components: { StatusBarGap },
};
</script>

<style scoped>
.tuike-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 24rpx;
  font-weight: 400;
  padding-bottom: 40rpx;
  box-sizing: border-box;
}
.tuike-header {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 24rpx 0 24rpx 40rpx;
}
.tuike-title {
  color: #00BD97;
  font-size: 40rpx;
  font-weight: 600;
  line-height: 56rpx;
}
.earnings-card {
  background: linear-gradient(135deg, #00BD97 15%, #00A589 85%);
  border-radius: 24rpx;
  padding: 32rpx;
  margin: 0 32rpx;
  margin-top: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.earnings-label {
  color: #fff;
  font-size: 28rpx;
  line-height: 40rpx;
}
.earnings-total {
  color: #fff;
  font-size: 56rpx;
  font-weight: 600;
  line-height: 78rpx;
}
.earnings-divider {
  border-top: 2rpx solid rgba(255,255,255,0.2);
  margin: 18rpx 0 0 0;
}
.earnings-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8rpx;
}
.earnings-sub-label {
  color: #fff;
  line-height: 34rpx;
}
.earnings-sub-label.right {
  text-align: right;
}
.earnings-sub-value {
  color: #fff;
  font-size: 36rpx;
  font-weight: 500;
  line-height: 50rpx;
}
.earnings-sub-value.right {
  text-align: right;
}
.menu-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 66rpx;
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  padding: 32rpx 0;
}
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96rpx;
}
.menu-icon-wrapper {
  background: #E6F7F3;
  border-radius: 50%;
  width: 96rpx;
  height: 96rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12rpx;
}
.menu-icon {
  width: 48rpx;
  height: 48rpx;
  background-size: cover;
}
.menu-label {
  color: #1F2937;
  font-size: 28rpx;
  line-height: 40rpx;
  text-align: center;
}
.order-overview-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  padding: 32rpx 29rpx 32rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.order-overview-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}
.order-overview-header-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.order-overview-header-tabs {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.order-overview-title {
  color: #1F2937;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 44rpx;
}
.order-overview-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 3rpx;
}
.order-overview-tab {
  background: #F3F4F6;
  border-radius: 32rpx;
  color: #4B5563;
  width: 56rpx;
  text-align: center;
  padding: 8rpx 20rpx;
  /* margin-left: 12rpx; */
  line-height: 34rpx;
}
.order-overview-tab.active {
  background: #00BD97;
  color: #fff;
}
.order-overview-stats-labels {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 24rpx;
}
.order-overview-stat-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.order-overview-stat {
  color: #1F2937;
  font-size: 40rpx;
  font-weight: 600;
  line-height: 56rpx;
  text-align: center;
}
.order-overview-stat.green {
  color: #00BD97;
}
.order-overview-stat.red {
  color: #FF4268;
}
.order-overview-label {
  color: #6B7280;
  line-height: 34rpx;
  text-align: center;
  font-size: 26rpx;
}
.order-list-card {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  padding: 32rpx 32rpx 28rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
.order-list-header {
  display: flex;
  align-items: flex-start;
}
.order-list-title {
  color: #1F2937;
  font-size: 32rpx;
  font-weight: 500;
  line-height: 44rpx;
}
.order-list-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  margin-top: 12rpx;
  overflow-x: auto;
  white-space: nowrap;
  /* 隐藏滚动条 - 兼容主流浏览器 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.order-list-tabs::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Webkit */
}
.order-list-tab {
  background: #F3F4F6;
  border-radius: 32rpx;
  color: #4B5563;
  /* width: 96rpx;       */
  text-align: center;
  padding: 8rpx 24rpx;
  line-height: 34rpx;
}
.order-list-tab.active {
  background: #00BD97;
  color: #fff;
}
.order-list-tab.flex-grow {
  flex-grow: 1;
  width: auto;
}
.order-list {
  margin-top: 12rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.order-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  padding-bottom: 28rpx;
  border-bottom: 2rpx solid #F3F4F6;
}
.order-avatar {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  background-size: cover;
}
.order-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}
.order-info-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}
.order-name {
  color: #1F2937;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 48rpx;
}
.order-status {
  border-radius: 8rpx;
  padding: 4rpx 12rpx;
  font-size: 24rpx;
  line-height: 34rpx;
  text-align: center;
  margin-left: 16rpx;
}
.order-status.invalid {
  background: rgba(239, 68, 68, 0.10);
  color: #EF4444;
}
.order-status.pending {
  background: rgba(245, 158, 11, 0.10);
  color: #F59E0B;
}
.order-status.wait {
  background: rgba(37, 99, 235, 0.10);
  color: #2563EB;
}
.order-status.done {
  background: rgba(16, 185, 129, 0.10);
  color: #10B981;
}
.order-desc {
  color: #6B7280;
  font-size: 26rpx;
  line-height: 40rpx;
}
.order-meta-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rpx;
}
.order-date {
  color: #6B7280;
  font-size: 24rpx;
  line-height: 32rpx;
}
.order-commission {
  font-size: 28rpx;
  font-weight: 500;
  line-height: 40rpx;
}
.order-commission.gray {
  color: #9CA3AF;
}
.order-commission.green {
  color: #00BD97;
}
.order-commission.red {
  color: #FF4268;
}
</style>

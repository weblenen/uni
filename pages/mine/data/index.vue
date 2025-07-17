<template>
  <view class="data-page">
      <!-- 头部栏 -->
      <HeaderBar title="数据" />
      <view class="data-content">
          <view class="data-card">
              <view class="data-card-header">
                  <view class="data-card-header-left">
                      <image class="data-card-icon" src="/static/tuandui.svg" mode="aspectFill" />
                      <view class="data-card-title">太平洋保险</view>
                  </view>
                  <view class="data-card-header-right">
                      <view class="data-card-tab data-card-tab-active">全部</view>
                      <view class="data-card-tab">今日</view>
                      <view class="data-card-tab">七日</view>
                      <view class="data-card-tab">本月</view>
                      <view class="data-card-tab">上月</view>
                  </view>
              </view>
              <view class="data-card-row">
                  <view class="data-card-block data-card-block-border">
                      <view class="data-card-block-value">45</view>
                      <view class="data-card-block-label">团队数量</view>
                  </view>
                  <view class="data-card-block data-card-block-border">
                      <view class="data-card-block-value">1288</view>
                      <view class="data-card-block-label">成员数量</view>
                  </view>
              </view>
              <view class="data-card-row">
                  <view class="data-card-block">
                      <view class="data-card-block-value">85786</view>
                      <view class="data-card-block-label">客户数量</view>
                  </view>
                  <view class="data-card-block">
                      <view class="data-card-block-value">8656</view>
                      <view class="data-card-block-label">订单数量</view>
                  </view>
              </view>
              <view class="data-card-row">
                  <view class="data-card-block">
                      <view class="data-card-block-value">86</view>
                      <view class="data-card-block-label">成交数量</view>
                  </view>
                  <view class="data-card-block">
                      <view class="data-card-block-value data-card-block-value-green">24%</view>
                      <view class="data-card-block-label">成交月度增长</view>
                  </view>
              </view>
          </view>
      <!-- 内容区 -->
      <view class="team-manage-card">
          <view class="team-manage-header">
              <view class="team-manage-title">团队管理</view>
              <view class="team-manage-rank" @click="goToRank"><text>排行榜</text></view>
          </view>
          <view
            class="team-manage-item"
            v-for="(team, idx) in teamList"
            :key="idx"
            @click="goToTeam(team.id)"
          >
            <image class="team-manage-img" :src="team.img" mode="aspectFill" />
            <view class="team-manage-info">
              <view class="team-manage-row">
                <view class="team-manage-name-status">
                  <view class="team-manage-name">{{ team.name }}</view>
                  <view class="team-manage-status" :class="team.statusClass">{{ team.status }}</view>
                </view>
                <view class="team-manage-order">
                  <image class="team-manage-icon" :src="team.orderIcon" mode="aspectFill" />
                  <text>30天订单: {{ team.order }}</text>
                </view>
              </view>
              <view class="team-manage-row">
                <view class="team-manage-desc">{{ team.desc }}</view>
                <view class="team-manage-lastdeal">
                  <image class="team-manage-icon" :src="team.lastDealIcon" mode="aspectFill" />
                  <text>最近成交: <text class="team-manage-stats-time">{{ team.lastDeal }}</text></text>
                </view>
              </view>
            </view>
          </view>
      </view>
  </view>

  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
export default {
  components: { HeaderBar },
  name: 'DataPage',
  data() {
    return {
      teamList: [
        {
          id: 1,
          name: '上海二区',
          status: '活跃',
          statusClass: 'team-manage-status-green',
          desc: '上海中心-上海分公司',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197cac1e7449eda-37f77c81-f2a4-4140-87d6-1916deb8c376.jpeg',
          order: 28,
          lastDeal: '12小时前',
          lastDealIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa1f33bd-531c4cbb-93d8-4877-9355-74b79c4b1a90.svg',
          orderIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa20ddcf-42e7a8c1-7962-4504-b29c-d95a7bd0d9e1.svg'
        },
        {
          id: 2,
          name: '上海三区',
          status: '活跃',
          statusClass: 'team-manage-status-green',
          desc: '上海中心-上海分公司',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197cac1e745ef97-5fa13bad-d1d6-4f04-812d-6c9a7f8fddd3.jpeg',
          order: 22,
          lastDeal: '1天前',
          lastDealIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa1f33bd-531c4cbb-93d8-4877-9355-74b79c4b1a90.svg',
          orderIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa20ddcf-42e7a8c1-7962-4504-b29c-d95a7bd0d9e1.svg'
        },
        {
          id: 3,
          name: '上海二区',
          status: '一般',
          statusClass: 'team-manage-status-yellow',
          desc: '上海中心-上海分公司',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197cac1e74549e6-9042f6ae-57e4-47dc-a756-807bad1db54b.jpeg',
          order: 18,
          lastDeal: '3天前',
          lastDealIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa1f33bd-531c4cbb-93d8-4877-9355-74b79c4b1a90.svg',
          orderIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa20ddcf-42e7a8c1-7962-4504-b29c-d95a7bd0d9e1.svg'
        },
        {
          id: 4,
          name: '上海二区',
          status: '活跃',
          statusClass: 'team-manage-status-green',
          desc: '上海中心-上海分公司',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197cac1e7464826-b1b8e618-c8f9-4d7d-b537-ee9ee0bb6d5c.jpeg',
          order: 15,
          lastDeal: '5小时前',
          lastDealIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa1f33bd-531c4cbb-93d8-4877-9355-74b79c4b1a90.svg',
          orderIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa20ddcf-42e7a8c1-7962-4504-b29c-d95a7bd0d9e1.svg'
        },
        {
          id: 5,
          name: '上海二区',
          status: '低活跃',
          statusClass: 'team-manage-status-gray',
          desc: '上海中心-上海分公司',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197cac1e74628e2-5f19e429-36f8-43e2-b512-d1786c698f64.jpeg',
          order: 12,
          lastDeal: '7天前',
          lastDealIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa1f33bd-531c4cbb-93d8-4877-9355-74b79c4b1a90.svg',
          orderIcon: 'https://miaoduo.fbcontent.cn/private/resource/image/197ee22aa20ddcf-42e7a8c1-7962-4504-b29c-d95a7bd0d9e1.svg'
        }
      ]
    }
  },
  methods: {
    goToRank() {
      uni.navigateTo({ url: '/pages/data/rank' });
    },
    goToTeam(id) {
      uni.navigateTo({ url: `/pages/data/team?id=${id}` });
    }
  }
}
</script>

<style scoped>
.data-content {
  background-color: #F9FAFB;
  padding: 32rpx;
}

.data-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.05);
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 26rpx;
}

.data-card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10rpx;
}

.data-card-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10rpx;
}

.data-card-header-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
}

.data-card-icon {
  width: 40rpx;
  height: 40rpx;
}

.data-card-title {
  color: #1F2937;
  font-size: 28rpx;
  line-height: 56rpx;
  min-height: 56rpx;
  font-weight: 500;
}

.data-card-tab {
  background: #F3F4F6;
  border-radius: 9999rpx;
  width: 80rpx;
  min-height: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4B5563;
  font-size: 22rpx;
}

.data-card-tab-active {
  background: #00BD97;
  color: #fff;
}

.data-card-row {
  display: flex;
  flex-direction: row;
  gap: 32rpx;
  margin-top: 6rpx;
}

.data-card-block {
  background: #F9FAFB;
  border-radius: 16rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8rpx;
}

.data-card-block-border {
  border: 2rpx solid #00BD97;
}

.data-card-block-value {
  color: #1F2937;
  font-size: 48rpx;
  line-height: 64rpx;
  text-align: center;
  margin-top: 24rpx;
}

.data-card-block-label {
  color: #6B7280;
  font-size: 24rpx;
  line-height: 40rpx;
  text-align: center;
  margin-bottom: 24rpx;
}

.data-card-block-value-green {
  color: #00BD97;
}
.team-manage-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0, 0, 0, 0.05);
  padding: 0 0 22rpx 0;
  margin-top: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 24rpx;
}
.team-manage-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 38rpx;
  padding: 32rpx 32rpx 34rpx 32rpx;
  border-bottom: 2rpx solid #F3F4F6;
}
.team-manage-title {
  color: #1F2937;
  font-size: 36rpx;
  line-height: 56rpx;
  font-weight: 500;
  min-width: 142rpx;
}
.team-manage-avatar {
  background: #fff;
  border-radius: 9999rpx;
  width: 64rpx;
  height: 64rpx;
}
.team-manage-rank {
  background: #00BD97;
  border-radius: 9999rpx;
  width: 152rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7rpx 37rpx;
}
.team-manage-rank text {
  color: #fff;
  font-size: 26rpx;
  font-weight: 500;
  line-height: 64rpx;
}
.team-manage-item {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 8rpx;
  padding: 32rpx 30rpx 32rpx 32rpx;
  border-bottom: 2rpx solid #F3F4F6;
}
.team-manage-item:last-child {
  border-bottom: none;
}
.team-manage-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}
.team-manage-info {
  margin-top: 4rpx;
  margin-left: 16rpx;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.team-manage-info-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.team-manage-name {
  color: #1F2937;
  font-size: inherit;
  line-height: 48rpx;
  font-weight: 500;
}
.team-manage-status {
  border-radius: 9999rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rpx 16rpx;
  font-size: inherit;
  min-width: 48rpx;
  min-height: 32rpx;
}
.team-manage-status-green {
  background: #DCFCE7;
  color: #16A34A;
}
.team-manage-status-yellow {
  background: #FEF9C3;
  color: #CA8A04;
}
.team-manage-status-gray {
  background: #F3F4F6;
  color: #4B5563;
}
.team-manage-desc {
  color: #6B7280;
  font-size: inherit;
  line-height: 40rpx;
  margin-top: 4rpx;
  flex: 1;
}
.team-manage-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 16rpx;
}
.team-manage-stats {
  margin-top: 4rpx;
  margin-left: 0;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  min-width: 180rpx;
}
.team-manage-stats-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
  font-size: inherit;
  color: #1F2937;
}
.team-manage-stats-time {
  color: #6B7280;
  font-size: inherit;
}
.team-manage-row {
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
}
.team-manage-desc {
flex: 1;
}
.team-manage-stats {
min-width: 180rpx;
margin-left: 16rpx;
margin-top: 0;
}
.team-manage-name-status {
display: flex;
align-items: center;
gap: 16rpx;
}
.team-manage-order,
.team-manage-lastdeal {
display: flex;
align-items: center;
gap: 8rpx;
}
</style>

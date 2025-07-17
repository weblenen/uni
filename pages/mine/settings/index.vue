<template>
  <view class="setting-wrapper">
    <HeaderBar title="设置" />
    <view class="setting-content">
      <!-- 第一组：用户协议、隐私协议 -->
      <view class="setting-card">
        <view class="setting-list-item" @click="goUserAgreement">
          <image class="setting-list-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede68443a6cd-9213adb8-0dbd-41d2-8b94-468a048fd43b.svg" mode="aspectFit" />
          <text class="setting-list-label">用户协议</text>
          <image class="setting-list-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede68443a9a2-044257c8-7ed8-4b2d-ba8c-c2b9b95b9955.svg" mode="aspectFit" />
        </view>
        <view class="setting-list-item" @click="goPrivacyPolicy">
          <image class="setting-list-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede6844456a1-c1ddf380-be50-4c72-8523-7f9d8cea7c76.svg" mode="aspectFit" />
          <text class="setting-list-label">隐私协议</text>
          <image class="setting-list-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede68443a9a2-044257c8-7ed8-4b2d-ba8c-c2b9b95b9955.svg" mode="aspectFit" />
        </view>
      </view>
      <!-- 第二组：意见反馈、注销账号 -->
      <view class="setting-card">
        <view class="setting-list-item" @click="goFeedback">
          <image class="setting-list-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede684454565-b785cba9-629f-49d7-aad5-91a7e063d5d9.svg" mode="aspectFit" />
          <text class="setting-list-label">意见反馈</text>
          <image class="setting-list-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede68443a9a2-044257c8-7ed8-4b2d-ba8c-c2b9b95b9955.svg" mode="aspectFit" />
        </view>
        <view class="setting-list-item" @click="goLogoutAccount">
          <image class="setting-list-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede684455c1f-9ccb1253-4016-4d2d-b5ce-39c26a4e7f99.svg" mode="aspectFit" />
          <text class="setting-list-label logout">注销账号</text>
          <image class="setting-list-arrow" src="https://miaoduo.fbcontent.cn/private/resource/image/197ede68443a9a2-044257c8-7ed8-4b2d-ba8c-c2b9b95b9955.svg" mode="aspectFit" />
        </view>
      </view>
      <!-- 退出登录按钮 -->
      <view class="setting-logout-btn" @click="goLogout">
        <text class="setting-logout-btn-text">退出登录</text>
      </view>
      <!-- 版本号和公司信息 -->
      <view class="setting-footer">
        <text class="setting-version">新车帮买v1.0</text>
        <text class="setting-company">乐享似锦（浙江）信息科技有限公司</text>
        <text class="setting-icp">浙ICP备2025146292号-1X</text>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
export default {
  components: { HeaderBar },
  methods: {
    goUserAgreement() {
      uni.navigateTo({ url: '/pages/mine/settings/user-agreement/index' });
    },
    goPrivacyPolicy() {
      uni.navigateTo({ url: '/pages/mine/settings/privacy/index' });
    },
    goFeedback() {
      uni.navigateTo({ url: '/pages/mine/settings/feedback/index' });
    },
    goLogoutAccount() {
      uni.navigateTo({ url: '/pages/mine/settings/logout-account/index' });
    },
    goLogout() {
      // TODO: 退出登录逻辑
      uni.showToast({ title: '退出登录', icon: 'none' });
    }
  }
}
</script>

<style scoped>
.setting-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.setting-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 32rpx 0 32rpx;
  box-sizing: border-box;
}
.setting-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 8rpx 0 rgba(0,0,0,0.05);
  margin-top: 48rpx;
  margin-bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.setting-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32rpx;
  border-bottom: 1rpx solid #F3F4F6;
  position: relative;
}
.setting-card .setting-list-item:last-child {
  border-bottom: none;
}
.setting-list-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 36rpx;
}
.setting-list-label {
  color: #000;
  font-size: 32rpx;
  flex: 1;
  min-width: 0;
  font-weight: 400;
}
.setting-list-label.logout {
  color: #FF4D4F;
}
.setting-list-arrow {
  width: 40rpx;
  height: 40rpx;
  margin-left: 16rpx;
}
.setting-logout-btn {
  margin: 92rpx 64rpx 0 64rpx;
  border-radius: 24rpx;
  border: 4rpx solid #00BD97;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24rpx 0;
}
.setting-logout-btn-text {
  color: #00BD97;
  font-size: 32rpx;
  font-weight: 500;
}
.setting-footer {
  margin-top: 280rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}
.setting-version {
  color: #6B7280;
  font-size: 28rpx;
  margin-bottom: 8rpx;
}
.setting-company, .setting-icp {
  color: #9CA3AF;
  font-size: 24rpx;
}

</style>
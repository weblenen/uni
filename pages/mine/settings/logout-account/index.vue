<template>
  <view class="logout-wrapper">
    <HeaderBar title="注销账号" />
    <view class="logout-content">
      <view class="logout-section logout-warning">
        <view class="logout-warning-row">
          <image class="logout-warning-icon" src="/static/warning.svg" mode="aspectFit" />
          <text class="logout-warning-title">注销须知</text>
        </view>
        <view class="logout-warning-desc">注销账号是不可逆操作，注销后您将：</view>
        <view class="logout-warning-list">
          <view class="logout-warning-item">• 无法登录和使用该账号</view>
          <view class="logout-warning-item">• 账号相关的个人信息将被删除</view>
          <view class="logout-warning-item">• 账号内的资产和权益将无法找回</view>
          <view class="logout-warning-item">• 绑定的服务和数据将被清除</view>
        </view>
      </view>
      <view class="logout-section logout-impact-row">
        <view class="logout-impact-col">
          <image class="logout-impact-icon" src="/static/info.svg" mode="aspectFit" />
          <text class="logout-impact-title">个人信息</text>
          <text class="logout-impact-desc">所有个人信息将被删除</text>
        </view>
        <view class="logout-impact-col">
          <image class="logout-impact-icon" src="/static/login.svg" mode="aspectFit" />
          <text class="logout-impact-title">账号登录</text>
          <text class="logout-impact-desc">无法再次登录该账号</text>
        </view>
      </view>
      <view class="logout-section logout-impact-row">
        <view class="logout-impact-col">
          <image class="logout-impact-icon" src="/static/balance.svg" mode="aspectFit" />
          <text class="logout-impact-title">账户余额</text>
          <text class="logout-impact-desc">账户内余额将被清空</text>
        </view>
        <view class="logout-impact-col">
          <image class="logout-impact-icon" src="/static/data.svg" mode="aspectFit" />
          <text class="logout-impact-title">数据记录</text>
          <text class="logout-impact-desc">历史数据无法恢复</text>
        </view>
      </view>
      <view class="logout-section">
        <view class="logout-label">请选择注销原因</view>
        <view class="logout-reason-list">
          <view v-for="item in reasons" :key="item" :class="['logout-reason-item', reason === item ? 'active' : '']" @click="reason = item">
            <image v-if="reason === item" src="/static/check-green.svg" class="logout-reason-icon" mode="aspectFit" />
            <image v-else src="/static/check-gray.svg" class="logout-reason-icon" mode="aspectFit" />
            <text class="logout-reason-text">{{ item }}</text>
          </view>
        </view>
      </view>
      <view class="logout-section">
        <view class="logout-label">身份验证</view>
        <view class="logout-verify-desc">为确保是您本人操作，请输入手机验证码</view>
        <view class="logout-verify-row">
          <input v-model="code" class="logout-verify-input" placeholder="请输入验证码" />
          <view class="logout-verify-btn" @click="getCode">获取验证码</view>
        </view>
      </view>
      <view class="logout-section logout-agreement-row">
        <image :src="agree ? '/static/check-green.svg' : '/static/check-gray.svg'" class="logout-agree-icon" mode="aspectFit" @click="agree = !agree" />
        <text class="logout-agree-text">我已阅读并同意《账号注销协议》</text>
      </view>
      <view class="logout-btn-row">
        <view class="logout-cancel-btn" @click="cancel">取消</view>
        <view class="logout-confirm-btn" :class="{disabled: !canSubmit}" @click="submit">确认注销</view>
      </view>
      <view class="logout-footer">
        <view class="logout-version">新车帮买v1.0</view>
        <view class="logout-company">乐享似锦（浙江）信息科技有限公司</view>
        <view class="logout-icp">浙ICP备2025146292号-1X</view>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue';
export default {
  components: { HeaderBar },
  data() {
    return {
      reasons: [
        '不再使用该应用',
        '使用体验不佳',
        '发现更好的替代品',
        '隐私安全考虑',
        '其他原因'
      ],
      reason: '',
      code: '',
      agree: false
    }
  },
  computed: {
    canSubmit() {
      return this.reason && this.code && this.agree;
    }
  },
  methods: {
    getCode() {
      uni.showToast({ title: '验证码已发送', icon: 'success' });
    },
    cancel() {
      uni.navigateBack();
    },
    submit() {
      if (!this.canSubmit) {
        uni.showToast({ title: '请填写完整信息并同意协议', icon: 'none' });
        return;
      }
      // 这里可以对接后端注销接口
      uni.showToast({ title: '注销成功', icon: 'success' });
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/index/index' });
      }, 1200);
    }
  }
}
</script>

<style scoped>
.logout-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.logout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 32rpx;
  box-sizing: border-box;
}

.logout-warning {
  background: #fff;
  border-radius: 24rpx;
  border: 2rpx solid #FF4D4F;
  padding: 32rpx 24rpx 24rpx 24rpx;
  margin-top: 48rpx;
}
.logout-warning-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.logout-warning-icon {
  width: 40rpx;
  height: 40rpx;
}
.logout-warning-title {
  color: #FF4D4F;
  font-size: 32rpx;
  font-weight: 600;
}
.logout-warning-desc {
  color: #374151;
  font-size: 28rpx;
  margin-top: 12rpx;
}
.logout-warning-list {
  margin-top: 12rpx;
  color: #374151;
  font-size: 28rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.logout-warning-item {
  margin-left: 12rpx;
}
.logout-impact-row {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
  margin-top: 12rpx;
}
.logout-impact-col {
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx 0 rgba(0,0,0,0.05);
  flex: 1;
  padding: 24rpx 16rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8rpx;
}
.logout-impact-icon {
  width: 40rpx;
  height: 40rpx;
}
.logout-impact-title {
  color: #1F2937;
  font-size: 28rpx;
  font-weight: 500;
}
.logout-impact-desc {
  color: #4B5563;
  font-size: 24rpx;
}
.logout-label {
  color: #1F2937;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
}
.logout-reason-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.logout-reason-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx 0;
  cursor: pointer;
}
.logout-reason-item.active .logout-reason-text {
  color: #00BD97;
}
.logout-reason-icon {
  width: 32rpx;
  height: 32rpx;
}
.logout-reason-text {
  color: #374151;
  font-size: 28rpx;
}
.logout-verify-desc {
  color: #4B5563;
  font-size: 24rpx;
  margin-bottom: 8rpx;
}
.logout-verify-row {
  display: flex;
  flex-direction: row;
  gap: 16rpx;
  align-items: center;
}
.logout-verify-input {
  flex: 1;
  background: #fff;
  border-radius: 8rpx;
  border: 2rpx solid #D1D5DB;
  padding: 16rpx;
  font-size: 28rpx;
  color: #333;
}
.logout-verify-btn {
  background: #00BD97;
  color: #fff;
  border-radius: 8rpx;
  font-size: 28rpx;
  padding: 16rpx 32rpx;
  text-align: center;
}
.logout-agreement-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  margin-top: 20rpx;
}
.logout-agree-icon {
  width: 32rpx;
  height: 32rpx;
}
.logout-agree-text {
  color: #374151;
  font-size: 28rpx;
}
.logout-btn-row {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
  margin-top: 28rpx;
}
.logout-cancel-btn {
  flex: 1;
  background: #fff;
  border: 2rpx solid #D1D5DB;
  color: #374151;
  border-radius: 12rpx;
  font-size: 32rpx;
  text-align: center;
  padding: 24rpx 0;
}
.logout-confirm-btn {
  flex: 1;
  background: #FF4D4F;
  color: #fff;
  border-radius: 12rpx;
  font-size: 32rpx;
  text-align: center;
  padding: 24rpx 0;
}
.logout-confirm-btn.disabled {
  background: #F3F4F6;
  color: #9CA3AF;
}
.logout-footer {
  margin-top: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}
.logout-version {
  color: #6B7280;
  font-size: 28rpx;
  margin-bottom: 8rpx;
}
.logout-company, .logout-icp {
  color: #9CA3AF;
  font-size: 24rpx;
}
</style>
<template>
  <view class="feedback-wrapper">
    <HeaderBar title="意见反馈" />
    <view class="feedback-content">
      <view class="feedback-section">
        <view class="feedback-label">问题类型</view>
        <view class="feedback-type-row">
          <view :class="['feedback-type-item', type === '产品问题' ? 'active' : '']" @click="type = '产品问题'">产品问题</view>
          <view :class="['feedback-type-item', type === '功能建议' ? 'active' : '']" @click="type = '功能建议'">功能建议</view>
          <view :class="['feedback-type-item', type === '体验问题' ? 'active' : '']" @click="type = '体验问题'">体验问题</view>
          <view :class="['feedback-type-item', type === '其他' ? 'active' : '']" @click="type = '其他'">其他</view>
        </view>
      </view>
      <view class="feedback-section">
        <view class="feedback-label">问题描述</view>
        <view class="feedback-desc-box">
          <textarea v-model="desc" class="feedback-desc-input" maxlength="200" placeholder="请输入您的意见或建议..." />
          <view class="feedback-desc-count">{{ desc.length }}/200</view>
        </view>
      </view>
      <view class="feedback-section">
        <view class="feedback-label">联系方式（选填）</view>
        <view class="feedback-contact-box">
          <input v-model="contact" class="feedback-contact-input" placeholder="请留下您的手机号或邮箱，方便我们联系您" />
        </view>
      </view>
      <view class="feedback-section">
        <view class="feedback-upload-row">
          <view class="feedback-upload-label">上传图片（最多3张）</view>
          <view class="feedback-upload-count">{{ images.length }}/3</view>
        </view>
        <view class="feedback-image-list">
          <view v-for="(img, idx) in images" :key="idx" class="feedback-image-item">
            <image :src="img" class="feedback-image" mode="aspectFill" />
            <view class="feedback-image-delete" @click="removeImage(idx)">×</view>
          </view>
          <view v-if="images.length < 3" class="feedback-image-add" @click="chooseImage">
            <image src="/static/plus.png" class="feedback-image-plus" mode="aspectFit" />
          </view>
        </view>
      </view>
      <view class="feedback-submit-btn" @click="submitFeedback">提交</view>
      <view class="feedback-footer">
        <view class="feedback-version">新车帮买v1.0</view>
        <view class="feedback-company">乐享似锦（浙江）信息科技有限公司</view>
        <view class="feedback-icp">浙ICP备2025146292号-1X</view>
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
      type: '产品问题',
      desc: '',
      contact: '',
      images: []
    }
  },
  methods: {
    chooseImage() {
      const that = this;
      uni.chooseImage({
        count: 3 - that.images.length,
        success: (res) => {
          that.images = that.images.concat(res.tempFilePaths).slice(0, 3);
        }
      });
    },
    removeImage(idx) {
      this.images.splice(idx, 1);
    },
    submitFeedback() {
      if (!this.desc.trim()) {
        uni.showToast({ title: '请填写问题描述', icon: 'none' });
        return;
      }
      // 这里可以对接后端接口
      uni.showToast({ title: '提交成功', icon: 'success' });
      this.type = '产品问题';
      this.desc = '';
      this.contact = '';
      this.images = [];
    }
  }
}
</script>

<style scoped>
.feedback-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.feedback-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 32rpx 0 32rpx;
  box-sizing: border-box;
}
.feedback-section {
  margin-top: 32rpx;
}
.feedback-label {
  color: #1F2937;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
}
.feedback-type-row {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
}
.feedback-type-item {
  background: #fff;
  border-radius: 16rpx;
  border: 2rpx solid #E5E7EB;
  color: #4B5563;
  font-size: 28rpx;
  padding: 12rpx 20rpx;
  text-align: center;
}
.feedback-type-item.active {
  background: #00BD97;
  color: #fff;
  border: none;
}
.feedback-desc-box {
  background: #fff;
  border-radius: 24rpx;
  min-height: 186rpx;
  position: relative;
  padding: 32rpx 32rpx 24rpx 32rpx;
  display: flex;
  flex-direction: column;
}
.feedback-desc-input {
  width: 100%;
  min-height: 120rpx;
  font-size: 28rpx;
  color: #333;
  border: none;
  background: transparent;
  resize: none;
}
.feedback-desc-count {
  color: #9CA3AF;
  font-size: 24rpx;
  position: absolute;
  right: 32rpx;
  bottom: 16rpx;
}
.feedback-contact-box {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
}
.feedback-contact-input {
  width: 100%;
  font-size: 28rpx;
  color: #333;
  border: none;
  background: transparent;
}
.feedback-upload-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.feedback-upload-label {
  color: #1F2937;
  font-size: 28rpx;
  font-weight: 500;
}
.feedback-upload-count {
  color: #9CA3AF;
  font-size: 24rpx;
}
.feedback-image-list {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
  margin-top: 16rpx;
}
.feedback-image-item {
  position: relative;
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  overflow: hidden;
}
.feedback-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}
.feedback-image-delete {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: #fff;
  font-size: 32rpx;
  width: 40rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  border-radius: 50%;
  z-index: 2;
}
.feedback-image-add {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  border: 2rpx dashed #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.feedback-image-plus {
  width: 48rpx;
  height: 48rpx;
}
.feedback-submit-btn {
  background: #00BD97;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  border-radius: 24rpx;
  text-align: center;
  padding: 24rpx 0;
  margin: 48rpx 0 0 0;
}
.feedback-footer {
  margin-top: 64rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}
.feedback-version {
  color: #6B7280;
  font-size: 28rpx;
  margin-bottom: 8rpx;
}
.feedback-company, .feedback-icp {
  color: #9CA3AF;
  font-size: 24rpx;
}
</style> 
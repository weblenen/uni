<template>
  <view class="add-bank-root">
    <HeaderBar title="添加银行卡" />
    <view class="add-bank-content">
      <!-- 身份信息 -->
      <view class="add-bank-section">
        <view class="add-bank-section-title">身份信息</view>
        <view class="add-bank-id-upload-row">
          <view class="add-bank-id-upload" @click="onUpload('front')">
            <image class="add-bank-id-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef14caca-6cc26e68-78ef-44e6-bcf4-a40220ac4815.svg" mode="aspectFit" />
            <text class="add-bank-id-tip">点击上传身份证正面</text>
          </view>
          <view class="add-bank-id-upload" @click="onUpload('back')">
            <image class="add-bank-id-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef14caca-6cc26e68-78ef-44e6-bcf4-a40220ac4815.svg" mode="aspectFit" />
            <text class="add-bank-id-tip">点击上传身份证反面</text>
          </view>
        </view>
        <view class="add-bank-input-row">
          <image class="add-bank-input-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef155c65-3b4c77d3-7b48-4090-839b-60dd07ea3dfa.svg" />
          <input class="add-bank-input" v-model="name" placeholder="姓名" />
        </view>
        <view class="add-bank-input-row">
          <image class="add-bank-input-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef15d300-285559de-c1b3-49c9-8f53-c95f80e87cc3.svg" />
          <input class="add-bank-input" v-model="idNumber" placeholder="身份证号" />
        </view>
      </view>
      <!-- 银行卡信息 -->
      <view class="add-bank-section">
        <view class="add-bank-section-title">银行卡信息</view>
        <view class="add-bank-input-row">
          <image class="add-bank-input-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef15f13b-3513134e-11e4-49b1-8ac8-efc21ef63b4f.svg" />
          <input class="add-bank-input" v-model="cardNumber" placeholder="银行卡号" />
        </view>
        <view class="add-bank-input-row add-bank-input-row-code">
          <image class="add-bank-input-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef1683b0-dfe9ff94-daae-475b-bb7c-43c39befb1fa.svg" />
          <input class="add-bank-input" v-model="phone" placeholder="手机号" />
          <view class="add-bank-code-btn" @click="onGetCode">获取验证码</view>
        </view>
        <view class="add-bank-input-row">
          <image class="add-bank-input-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef1618ef-1c1169e1-e680-4644-9233-cff962a3791a.svg" />
          <input class="add-bank-input" v-model="code" placeholder="验证码" />
        </view>
      </view>
      <!-- 加密提示 -->
      <view class="add-bank-tip-row">
        <image class="add-bank-tip-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a6ef176d6b-f266119b-2386-4650-bf0a-fe9decdfcd26.svg" />
        <text class="add-bank-tip-text">您的信息将被安全加密，我们确保您的个人信息安全</text>
      </view>
      <!-- 确认按钮 -->
      <view class="add-bank-btn" @click="onSubmit">确认添加</view>
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
export default {
  components: { HeaderBar },
  data() {
    return {
      name: '',
      idNumber: '',
      cardNumber: '',
      phone: '',
      code: ''
    }
  },
  methods: {
    onUpload(type) {
      uni.showToast({ title: '上传' + (type === 'front' ? '身份证正面' : '身份证反面'), icon: 'none' })
    },
    onGetCode() {
      uni.showToast({ title: '获取验证码', icon: 'none' })
    },
    onSubmit() {
      uni.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    }
  }
}
</script>

<style scoped>
.add-bank-root {
  background: #F5F7FA;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.add-bank-content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-top: 0;
}
.add-bank-section {
  background: #fff;
  border-radius: 24rpx;
  margin: 32rpx 32rpx 0 32rpx;
  padding: 32rpx 32rpx 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.add-bank-section-title {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
  margin-bottom: 16rpx;
}
.add-bank-id-upload-row {
  display: flex;
  flex-direction: row;
  gap: 24rpx;
  margin-bottom: 16rpx;
}
.add-bank-id-upload {
  flex: 1;
  border: 1rpx dashed #D1D5DB;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 0;
  background: #fff;
}
.add-bank-id-icon {
  width: 64rpx;
  height: 64rpx;
  margin-bottom: 16rpx;
}
.add-bank-id-tip {
  color: #6B7280;
  font-size: 24rpx;
  font-weight: 500;
}
.add-bank-input-row {
  background: #F9FAFB;
  border-radius: 12rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  padding: 0 24rpx;
  margin-bottom: 16rpx;
}
.add-bank-input-row-code {
  position: relative;
}
.add-bank-input-icon {
  width: 40rpx;
  height: 40rpx;
}
.add-bank-input {
  flex: 1;
  font-size: 32rpx;
  color: #000;
  background: transparent;
  border: none;
  outline: none;
  padding: 16rpx 0;
}
.add-bank-code-btn {
  position: absolute;
  right: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  background: #DCFCE7;
  color: #00BD97;
  font-size: 24rpx;
  border-radius: 8rpx;
  padding: 8rpx 24rpx;
  font-weight: 500;
}
.add-bank-tip-row {
  background: #FEFCE8;
  border-radius: 12rpx;
  padding: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
  margin: 32rpx 32rpx 0 32rpx;
}
.add-bank-tip-icon {
  width: 40rpx;
  height: 40rpx;
}
.add-bank-tip-text {
  color: #A16207;
  font-size: 24rpx;
}
.add-bank-btn {
  background: linear-gradient(90deg, #00BD97 0%, #36D7B7 100%);
  border-radius: 16rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  text-align: center;
  margin: 0rpx 32rpx 0 32rpx;
  padding: 24rpx 0;
}

</style> 
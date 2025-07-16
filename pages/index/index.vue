<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
    <view style="margin-top: 40rpx;">
      <text>用户信息：</text>
      <view v-if="userStore.userInfo">
        <text>姓名：{{ userStore.userInfo.name }}</text><br />
        <text>年龄：{{ userStore.userInfo.age }}</text><br />
        <text>邮箱：{{ userStore.userInfo.email }}</text>
      </view>
      <view v-else>
        <text>暂无</text>
      </view>
    </view>
    <view style="margin-top: 20rpx;">
      <text>Token：{{ userStore.token || '暂无' }}</text>
    </view>
	<u-button type="primary">测试按钮</u-button>
    <u-button type="primary" @click="setUserInfo" style="margin-top: 30rpx;">设置用户信息（uView）</u-button>
    <u-button type="success" @click="setToken" style="margin-top: 20rpx;">设置Token（uView）</u-button>
	</view>
</template>

<script>
import { useUserStore } from '@/store/user'
import { ref } from 'vue'

export default {
  setup() {
    const userStore = useUserStore()
    const title = ref('Hello')
    const setUserInfo = () => {
      userStore.setUserInfo({
        name: '张三',
        age: 18,
        email: 'zhangsan@example.com'
      })
    }
    const setToken = () => {
      userStore.setToken('abc123456789')
    }
    return {
      title,
      userStore,
      setUserInfo,
      setToken
    }
  }
}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

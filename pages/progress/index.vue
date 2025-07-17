<template>
  <view class="progress-wrapper">
    <text class="progress-title">进度页面</text>
  </view>
  <u-tabbar :value="active" @change="onChange" :fixed="true" :safeAreaInsetBottom="true" :activeColor="'#00BD97'" :inactiveColor="'#6B7280'">
    <u-tabbar-item icon="/static/a.png" text="首页" name="index" />
    <u-tabbar-item icon="/static/bb.png"  text="进度" name="progress" />
    <u-tabbar-item v-if="userInfo && userInfo.referrer == 1" icon="/static/c.png"  text="推客" name="referrer" />
    <u-tabbar-item icon="/static/d.png"  text="我的" name="mine" />
  </u-tabbar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const active = ref('progress')
function onChange(name) {
  
  const map = {
    index: '/pages/index/index',
    progress: '/pages/progress/index',
    referrer: '/pages/referrer/index',
    mine: '/pages/mine/index'
  }
  uni.switchTab({ url: map[name] })
}
// 可在此添加进度页面逻辑
</script>

<style scoped>
.progress-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9FAFB;
}
.progress-title {
  font-size: 40rpx;
  color: #00BD97;
  font-weight: bold;
}
</style> 
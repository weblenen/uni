<template>
  <view class="favorite-wrapper">
    <HeaderBar title="我的收藏" />
    <view class="car-list">
      <CarCard
        v-for="(car, idx) in carList"
        :key="car.vehicle_id || idx"
        :car="car"
      />
      <view v-if="!loading && hasMore && carList.length > 0" style="text-align:center;padding:32rpx 0;">
        <text
          @click="loadMore"
          style="color:#00BD97;font-size:28rpx;cursor:pointer;"
        >点击查看更多</text>
      </view>
      <view v-if="!hasMore && carList.length > 0" style="text-align:center;color:#9CA3AF;font-size:24rpx;padding:32rpx 0;">没有更多了</view>
      <view v-if="!loading && carList.length === 0" style="text-align:center;color:#00BD97;font-size:30rpx;padding:80rpx 0 60rpx 0;">暂无收藏</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { get } from '@/utils/request'
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
import CarCard from '@/components/CarCard/CarCard.vue'

const carList = ref([])
const userStore = useUserStore()
const page = ref(1)
const pageSize = 10
const hasMore = ref(true)
const loading = ref(false)

async function fetchFavoriteCars() {
  const user_id = userStore.userInfo?.id || ''
  if (!user_id || loading.value || !hasMore.value) return
  loading.value = true
  const url = `/api/v2/car-manage?user_id=${encodeURIComponent(user_id)}&isfav=1&page=${page.value}&pageSize=${pageSize}`
  try {
    const res = await get(url)
    const list = res.data || []
    if (page.value === 1) {
      carList.value = list
    } else {
      carList.value = carList.value.concat(list)
    }
    if (list.length < pageSize) {
      hasMore.value = false
    }
  } catch (err) {
    if (page.value === 1) carList.value = []
    uni.showToast({ title: '获取收藏失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  page.value = 1
  hasMore.value = true
  fetchFavoriteCars()
})

// 监听页面滚动到底部
if (typeof onReachBottom === 'function') {
  onReachBottom(() => {
    if (hasMore.value && !loading.value) {
      page.value++
      fetchFavoriteCars()
    }
  })
}
// H5兼容（如需）
// onReachBottom为uni-app内置，H5下可用window.onscroll等实现

function loadMore() {
  if (hasMore.value && !loading.value) {
    page.value++
    fetchFavoriteCars()
  }
}
</script>

<style scoped>
.favorite-wrapper {
  background: #F9FAFB;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 24rpx;
  font-weight: 400;
  padding-bottom: 120rpx;
  box-sizing: border-box;
}
.car-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}
</style> 
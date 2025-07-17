<template>
  <view class="car-card-hd" @click="$emit('click')">
    <view class="car-card-hd-top">
      <view style="display: flex; gap: 12rpx;">
        <view v-for="id in car.power_type" :key="id" class="car-card-hd-tag">
          {{ getEnergyTypeNameById(id) }}
        </view>
      </view>
      <image
        v-if="isFavorite"
        class="car-card-hd-fav"
        src="/static/favcheck.svg"
        mode="aspectFit"
        @tap.stop="handleFavorite"
      />
      <image
        v-else
        class="car-card-hd-fav"
        src="/static/fav.svg"
        mode="aspectFit"
        @tap.stop="handleFavorite"
      />
      <!-- <image class="car-card-hd-arrow" :src="arrowIcon" mode="aspectFill" /> -->
    </view>
    <view class="car-card-hd-main">
      <image class="car-card-hd-img" :src="car.img || car.vehicle_image_url" mode="aspectFill" />
      <view class="car-card-hd-info">
        <view class="car-card-hd-title">{{ car.title }}</view>
        <view class="car-card-hd-price">{{ car.price || ('指导价：' + car.manufacturer_price + '万') }}</view>
        <view class="car-card-hd-desc">
          <text class="car-card-hd-desc-highlight">送</text>全网最高<text class="car-card-hd-desc-highlight">{{ car.subsidy || 15000}}</text>元补贴攻略
        </view>
        <view class="car-card-hd-actions">
          <view class="car-card-hd-coupon">¥{{ parseInt(car.subsidy_amount) }}</view>
          <view class="car-card-hd-btn">
            <text class="car-card-hd-btn-main">领取</text>
            <text class="car-card-hd-btn-sub">新车帮买额外补贴</text>
          </view>
        </view>
      </view>
    </view>
    <view class="car-card-hd-bottom">
      <image class="car-card-hd-bottom-icon" :src="bottomIcon" mode="aspectFill" />
      <text class="car-card-hd-bottom-text">已有{{ car.receivedCount  || 1653}}人领取</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { post } from '@/utils/request';
import { useUserStore } from '@/store/user';

const props = defineProps({
  car: {
    type: Object,
    required: true
  },
  arrowIcon: {
    type: String,
    default: 'https://miaoduo.fbcontent.cn/private/resource/image/197e901a210500a-d82fcf18-b9ad-41e1-a30c-4ed09d697a7b.svg'
  },
  bottomIcon: {
    type: String,
    default: 'https://miaoduo.fbcontent.cn/private/resource/image/197e901a2116c2c-6cf21c67-2abd-4313-91f4-0fcb58381dcd.svg'
  }
});

const emit = defineEmits(['click']);

const energyTypes = [
  { id: -1, name: '全部' },
  { id: 0, name: '油车' },
  { id: 1, name: '电车' },
  { id: 2, name: '油电混动' }
];

const isFavorite = ref(props.car.is_favorited); // 本地维护收藏状态
console.log('isFavorite', isFavorite.value);

const favoriteId = ref('');
const userStore = useUserStore();
const userId = computed(() => userStore.userInfo?.id || '');

function getEnergyTypeNameById(id) {
  const type = energyTypes.find(item => item.id === id);
  return type ? type.name : '';
}

async function handleFavorite() {
  if (!userId.value || !props.car.vehicle_id) {
    uni.showToast({ title: '请先登录', icon: 'none' });
    return;
  }
  if (isFavorite.value) {
    await cancelFavorite();
  } else {
    await addFavorite();
  }
}

async function addFavorite() {
  const response = await post('/api/favorites', {
    user_id: userId.value,
    item_id: props.car.vehicle_id,
    type: 'vehicle'
  });
  isFavorite.value = true; // 本地切换
}

async function cancelFavorite() {
  const response = await post('/api/favorites/delByUser', {
    user_id: userId.value,
    item_id: props.car.vehicle_id,
  });
  isFavorite.value = false; // 本地切换

}

// 删除 onMounted(() => { fetchFavoriteStatus(); });
</script>

<style scoped>
.car-card-hd {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  margin: 0 32rpx;
  padding: 32rpx 32rpx 22rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.car-card-hd-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.car-card-hd-tag {
  background: rgba(0,189,151,0.10);
  border-radius: 12rpx;
  color: #00BD97;
  display: inline-block;
  min-width: 40rpx;
  text-align: center;
  padding: 8rpx 16rpx;
  line-height: 32rpx;
  font-size: 22rpx;
}
.car-card-hd-arrow {
  width: 40rpx;
  height: 40rpx;
}
.car-card-hd-fav {
  width: 40rpx;
  height: 40rpx;
  margin-left: 16rpx;
}
.car-card-hd-main {
  display: flex;
  flex-direction: row;
  gap: 32rpx;
  margin-top: 16rpx;
}
.car-card-hd-img {
  width: 280rpx;
  height: 200rpx;
  border-radius: 16rpx;
  background-size: cover;
  flex-shrink: 0;
}
.car-card-hd-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.car-card-hd-title {
  color: #000;
  font-size: 36rpx;
  font-weight: 500;
  line-height: 56rpx;
}
.car-card-hd-price {
  color: #9CA3AF;
  line-height: 32rpx;
  font-size: 28rpx;
}
.car-card-hd-desc {
  margin-top: 8rpx;
  margin-right: 8rpx;
  min-height: 40rpx;
  color: #4B5563;
  font-size: 22rpx;
  line-height: 40rpx;
}
.car-card-hd-desc-highlight {
  color: #00BD97;
  font-weight: 400;
}
.car-card-hd-actions {
  margin-top: 6rpx;
  display: flex;
  flex-direction: row;
}
.car-card-hd-coupon {
  background: #E6F7F3;
  color: #FF4268;
  font-size: 34rpx;
  font-weight: 600;
  line-height: 51rpx;
  flex: 1;
  text-align: center;
  padding: 15rpx 0;
  border-radius: 40rpx 0 0 40rpx;
}
.car-card-hd-btn {
  background: #00BD97;
  color: #fff;
  flex: 1;
  text-align: center;
  border-radius: 0 40rpx 40rpx 0;
  padding: 14rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.car-card-hd-btn-main {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 26rpx;
}
.car-card-hd-btn-sub {
  font-size: 16rpx;
  font-weight: 500;
  line-height: 18rpx;
  margin-top: 6rpx;
}
.car-card-hd-bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8rpx;
  margin-top: 8rpx;
}
.car-card-hd-bottom-icon {
  width: 24rpx;
  height: 24rpx;
  margin-top: 6rpx;
  margin-left: 379rpx;
}
.car-card-hd-bottom-text {
  color: #9CA3AF;
  line-height: 36rpx;
  font-size: 26rpx;
}
</style> 
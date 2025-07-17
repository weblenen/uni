<template>
  <view class="favorite-wrapper">
    <HeaderBar title="我的收藏" />
    <view class="car-list">
      <CarCard
        v-for="(car, idx) in carList"
        :key="idx"
        :tag="car.tag"
        :img="car.img"
        :title="car.title"
        :price="car.price"
        :subsidy="car.subsidy"
        :coupon="car.coupon"
        :receivedCount="car.receivedCount"
      />
    </view>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
import CarCard from '@/components/CarCard/CarCard.vue'
export default {
  name: 'FavoritePage',
  components: { HeaderBar, CarCard },
  data() {
    return {
      carList: [
        {
          tag: '插电混合车型',
          img: 'https://miaoduo.fbcontent.cn/private/resource/image/197bf79da9540d3-b161282b-bc49-434d-9f3a-e69429750577.jpeg',
          title: '理想L6',
          price: '指导价：24.98-27.98万',
          subsidy: 15000,
          coupon: 2000,
          receivedCount: 3452
        },
        // 可添加更多收藏车辆数据
      ]
    }
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
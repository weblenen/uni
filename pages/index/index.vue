<template>
  <view class="index-wrapper">
    <StatusBarGap title="新车帮买" />
    <!-- 顶部搜索栏 -->
    <!-- <view class="header-bar">
      <text class="header-title">新车帮买</text>
      <view class="header-search">
        <image class="search-icon" src="https://miaoduo.fbcontent.cn/private/resource/image/197e8f3a0c614d9-299579e3-34e1-4400-8cc7-81c96492e032.svg" mode="aspectFill" />
        <text class="search-placeholder">搜索车型</text>
      </view>
      <image class="header-bell" src="https://miaoduo.fbcontent.cn/private/resource/image/197e8f3a0c6b00c-aa11737f-25f2-49d5-8efc-a4e4f440fdf8.svg" mode="aspectFill" />
    </view> -->
    <!-- 顶部banner -->
    <view class="banner">
      <swiper
        class="banner-swiper"
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :circular="true"
      >
        <swiper-item v-for="(item, idx) in banners" :key="idx">
          <view @click="onBannerClick(item)" style="width:100%;height:100%">
            <image class="banner-img" :src="item.image" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 品牌头像组 -->
    <view class="brand-row">
      <view
        class="brand-box"
        :class="{ 'brand-box-active': selectedBrand === idx }"
        v-for="(brand, idx) in brands"
        :key="brand.code || brand.name"
        @click="onBrandChange(idx)"
      >
        <image
          v-if="brand.icon"
          class="brand-avatar"
          :src="brand.icon"
          mode="aspectFill"
        />
        <view v-else class="brand-avatar brand-all"><text>全</text></view>
        <text class="brand-name">{{ brand.name }}</text>
      </view>
    </view>
    <!-- 价格/车型/能源筛选 -->
    <!-- <view class="filter-row">
      <picker :range="priceRanges" range-key="range_name" @change="onPriceChange">
        <view class="filter-item">
          价格：{{ priceRanges[selectedPrice] ? (priceRanges[selectedPrice].range_name || priceRanges[selectedPrice].name) : '请选择' }}
        </view>
      </picker>
      <picker :range="carTypes" range-key="name" @change="onCarTypeChange">
        <view class="filter-item">
          车型：{{ carTypes[selectedCarType] ? carTypes[selectedCarType].name : '请选择' }}
        </view>
      </picker>
      <picker :range="energyTypes" range-key="name" @change="onEnergyChange">
        <view class="filter-item">
          能源：{{ energyTypes[selectedEnergy] ? energyTypes[selectedEnergy].name : '请选择' }}
        </view>
      </picker>
    </view> -->
    <!-- 车型列表 -->
    <view class="car-list">
      <view v-if="showLoading" class="car-loading-mask">
        <view class="car-loading-dots">
          <view class="car-dot" v-for="n in 3" :key="n"></view>
        </view>
        <text class="car-loading-text">正在加载车辆...</text>
      </view>
      <CarCard
        v-for="(car, idx) in cars"
        :key="car.vehicle_id || idx"
        :tag="car.tag"
        :img="car.img || car.vehicle_image_url"
        :title="car.title"
        :price="car.price || ('指导价：' + car.manufacturer_price + '万')"
        :subsidy="car.subsidy"
        :subsidy_amount ="car.subsidy_amount "
        :receivedCount="car.receivedCount"
        :power_type="car.power_type"
        @click="onCarClick(car)"
      />
      <view v-if="!showLoading && cars.length === 0" class="car-empty">
        <!-- <image src="/static/cc.png" class="car-empty-img" mode="aspectFit" /> -->
        <text class="car-empty-text">暂无车辆</text>
      </view>
    </view>
    <!-- @click="showModal = true" -->

    <!-- <PhoneChangeModal v-model="showModal" :carInfo="carInfo" /> -->
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import StatusBarGap from '@/components/StatusBarGap/StatusBarGap.vue'
import CarCard from '@/components/CarCard/CarCard.vue'
import { get, post } from '@/utils/request'

const showModal = ref(false)
const showLoading = ref(false)
const cars = ref([])
const brands = ref([])
const banners = ref([
  { link: '', image: 'https://img.xinchebangmai.cn/524c989a-6fca-4e1c-aeb5-086007953089.jpg' },
  { link: '', image: 'https://img.xinchebangmai.cn/9d7c041f-eadc-4993-a409-28152a09e725.jpg' }
])
const carTypes = ref([])
const priceRanges = ref([])
const energyTypes = ref([
  {id: -1, name: '全部'},
  {id: 0, name: '油车'},
  {id: 1, name: '电车'},
  {id: 2, name: '油电混动'}
])
const selectedPrice = ref(0)
const selectedCarType = ref(0)
const selectedEnergy = ref(0)
const selectedBrand = ref(0)
const carInfo = ref({})

const userStore = useUserStore()

async function fetchInitData(user_id) {
  showLoading.value = true;
  try {
    // 品牌
    // const response = await get('/api/brands/all');
    const response = [
      {"id":15,"brand":"理想","model":null,"brand_item":[{"code":"Lixiang","icon":"https://img.xinchebangmai.cn/17e3ebf5-6f68-46fd-b074-6ef46d0f9e8f.png","name":"理想","enable":true}],"sort_order":"1"},
      {"id":2,"brand":"极氪","model":"极氪","brand_item":[{"url":"/pages/diypage/diypage?id=30","code":"zeekr","icon":"https://img.xinchebangmai.cn/f5c2b4ac-7f07-43f4-a9ca-6f4ae7d10f9a.png","name":"极氪","enable":false}],"sort_order":"2"},
      {"id":10,"brand":"零跑","model":null,"brand_item":[{"url":"/pages/diypage/diypage?id=33","code":"leapmotor","icon":"https://img.xinchebangmai.cn/b4215c40-b531-4111-b9bb-c117cb297d26.png","name":"零跑","enable":true}],"sort_order":"2"},
      {"id":3,"brand":"长安","model":"长安","brand_item":[{"url":"/pages/diypage/diypage?id=99902","code":"80081005","icon":"http://atbuycar.oss-cn-shanghai.aliyuncs.com/eba024cb-7bfe-46c8-a1ad-d7f2e19e264c.png","name":"启源","enable":true},{"url":"/pages/diypage/diypage?id=99903","code":"80081001","icon":"https://img.xinchebangmai.cn/6a58e3e9-4f8f-44bf-bf7c-8638f4ea4521.png","name":"长安","enable":true},{"code":"20000000","icon":"http://atbuycar.oss-cn-shanghai.aliyuncs.com/cae29afd-382f-4969-906f-0db5880e3477.png","name":"阿维塔","enable":false},{"code":"80081004","icon":"http://atbuycar.oss-cn-shanghai.aliyuncs.com/c3946f00-9267-4492-ac24-67d4c41a450c.png","name":"深蓝","enable":false}],"sort_order":"3"},
      {"id":4,"brand":"宝骏","model":"宝骏","brand_item":[{"code":"宝骏","icon":"https://img.xinchebangmai.cn/8d54b0ec-cda9-4aa1-b2fb-bc8dbb5d68bf.png","name":"宝骏","enable":false}],"sort_order":"4"},
      {"id":8,"brand":"极狐","model":null,"brand_item":[{"code":"ARCFOX","icon":"https://img.xinchebangmai.cn/35941df7-265a-428e-8748-e0b0e7314dcf.png","name":"极狐","enable":false}],"sort_order":"5"},
      {"id":1,"brand":"蔚来","model":"蔚来","brand_item":[{"code":"nio","icon":"https://img.xinchebangmai.cn/240b0509-a085-4c4d-8797-6aead74e2dd5.png","name":"蔚来","enable":false}],"sort_order":"6"}
    ];
    const names = response.reduce((acc, item) => {
      if (item.brand_item && Array.isArray(item.brand_item)) {
        const itemNames = item.brand_item.map(bi => bi)
        return [...acc, ...itemNames]
      }
      return acc
    }, [])
    const brandsArr = [{ code: '', name: '全部', icon: 'https://img.xinchebangmai.cn/c4c1d45d-d64b-49af-b7ba-085120be40dc.png' }, ...names];
    brands.value = brandsArr;
    const storageBrands = brandsArr.reduce((acc, item) => {
      acc[item.code] = item.name
      return acc
    }, {})
    uni.setStorageSync('brandCodeMap', storageBrands);

    // 车型、价格区间
    const [typesRes, pricesRes] = await Promise.all([
      get('/api/config/vehicle-types'),
      get('/api/config/price-ranges')
    ])
    carTypes.value = [{ id: '', name: '全部' }, ...(typesRes.data || [])];
    priceRanges.value = [{ id: '', range_name: '全部' }, ...(pricesRes.data || [])];
    await fetchCars(user_id);
  } catch (error) {
    console.error('fetchbrands:', error);
    uni.showToast({
      title: 'Failed to load data',
      icon: 'none'
    })
  } finally {
    showLoading.value = false;
  }
}

async function fetchCars(user_id) {
  showLoading.value = true;
  cars.value = [];
  const params = {
    brandCode: brands.value[selectedBrand.value]?.code || '',
    type: carTypes.value[selectedCarType.value]?.id || '',
    price_range: priceRanges.value[selectedPrice.value]?.id || '',
    power: energyTypes.value[selectedEnergy.value]?.id !== -1 ? energyTypes.value[selectedEnergy.value]?.id : undefined,
  }
  if (user_id) params.user_id = user_id;
  const queryString = Object.entries(params)
    .filter(([_, v]) => v !== '' && v !== undefined)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')
  const url = queryString ? `/api/v2/car-manage?${queryString}` : '/api/v2/car-manage'
  try {
    const res = await get(url)
    cars.value = res.data || []
  } catch (err) {
    cars.value = []
    uni.showToast({ title: '获取车辆失败', icon: 'none' })
  } finally {
    showLoading.value = false;
  }
}

function onBannerClick(item) {
  if (item.link) {
    window.open ? window.open(item.link) : uni.navigateTo({ url: item.link })
  }
}
function onPriceChange(e) {
  selectedPrice.value = Number(e.detail.value)
  fetchCars()
}
function onCarTypeChange(e) {
  selectedCarType.value = Number(e.detail.value)
  fetchCars()
}
function onEnergyChange(e) {
  selectedEnergy.value = Number(e.detail.value)
  fetchCars()
}
function onBrandChange(idx) {
  selectedBrand.value = idx
  fetchCars()
}
function onCarClick(car) {
  carInfo.value = car
  showModal.value = true
}

watch(
  () => userStore.userInfo,
  (newVal, oldVal) => {
    const user_id = newVal && newVal.id ? newVal.id : ''
    fetchInitData(user_id)
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
.index-wrapper {
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
.status-bar {
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 36rpx 24rpx 40rpx;
}
.status-time {
  color: #000;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 40rpx;
  width: 60rpx;
}
.status-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16rpx;
}
.status-speed {
  color: #000;
  line-height: 32rpx;
  width: 102rpx;
}
.status-net {
  color: #000;
  line-height: 32rpx;
  width: 32rpx;
}
.status-icon {
  width: 32rpx;
  height: 32rpx;
  background-size: cover;
}
.header-bar {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24rpx 40rpx;
  gap: 32rpx;
}
.header-title {
  color: #00BD97;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 56rpx;
  width: 158rpx;
}
.header-search {
  background: #F3F4F6;
  border-radius: 9999rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12rpx 30rpx 12rpx 32rpx;
  gap: 16rpx;
  width: 222rpx;
  margin-left: 88rpx;
}
.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 4rpx;
  margin-bottom: 4rpx;
}
.search-placeholder {
  color: #9CA3AF;
  font-size: 28rpx;
  line-height: 40rpx;
  width: 112rpx;
}
.header-bell {
  width: 48rpx;
  height: 48rpx;
  margin-top: 8rpx;
  margin-bottom: 8rpx;
}
.banner {
  position: relative;
  margin: 32rpx;
  height: 500rpx;
  border-radius: 24rpx;
  overflow: hidden;
}
.banner-swiper {
  width: 100%;
  height: 500rpx;
}
.banner-img {
  width: 100%;
  height: 500rpx;
  border-radius: 24rpx;
  /* position: absolute;
  left: 0;
   top: 0; */
  z-index: 199;
}
.banner-content {
  position: absolute;
  left: 40rpx; top: 40rpx;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  width: 80%;
}
.banner-tag {
  background: rgba(255,255,255,0.20);
  border-radius: 9999rpx;
  color: #fff;
  padding: 8rpx 16rpx;
  width: 128rpx;
  font-size: 24rpx;
  margin-bottom: 8rpx;
}
.banner-title {
  color: #fff;
  font-size: 40rpx;
  font-weight: 600;
  line-height: 56rpx;
  margin-top: 80rpx;
}
.banner-desc {
  color: rgba(255,255,255,0.90);
  font-size: 28rpx;
  line-height: 40rpx;
}
.brand-row {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 40rpx;
  background: #fff;
  padding: 24rpx 32rpx 16rpx 32rpx;
  overflow-x: auto;
}
.brand-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 110rpx;
}
.brand-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 9999rpx;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}
.brand-all {
  background: #E5E7EB;
  color: #6B7280;
  font-size: 32rpx;
  font-weight: 500;
}
.brand-name {
  color: #1F2937;
  font-size: 24rpx;
  text-align: center;
  line-height: 32rpx;
}
.brand-box-active .brand-name {
  color: #00BD97;
  font-weight: 600;
}
.filter-row {
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding: 24rpx 32rpx;
  margin-top: 16rpx;
}
.filter-item {
  background: #F3F4F6;
  border-radius: 9999rpx;
  color: #4B5563;
  font-size: 26rpx;
  line-height: 40rpx;
  width: 220rpx;
  text-align: center;
  padding: 12rpx 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-item-active {
  background: #00BD97;
  color: #fff;
  font-weight: 600;
}
.filter-btn {
  background: #00BD97;
  border-radius: 9999rpx;
  width: 154rpx;
  height: 64rpx;
  margin-right: -152rpx;
}
.car-list {
  margin-top: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  position: relative; /* 让 loading 遮罩绝对定位于 car-list */
}

.car-loading-mask {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.85);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 24rpx;
  min-height: 300rpx;
}

.car-loading-dots {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40rpx;
  margin-bottom: 18rpx;
}
.car-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #00BD97;
  margin: 0 8rpx;
  animation: car-dot-bounce 1s infinite;
}
.car-dot:nth-child(1) { animation-delay: 0s; }
.car-dot:nth-child(2) { animation-delay: 0.2s; }
.car-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes car-dot-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.7; }
  40% { transform: translateY(-18rpx); opacity: 1; }
}

.car-loading-text {
  color: #00BD97;
  font-size: 28rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  text-shadow: 0 2rpx 8rpx #e0f7f3;
}
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
  width: 174rpx;
  text-align: center;
  padding: 8rpx 16rpx;
  line-height: 32rpx;
}
.car-card-hd-arrow {
  width: 40rpx;
  height: 40rpx;
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
.index-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 112rpx;
  box-shadow: 0 -2rpx 8rpx 0 rgba(0,0,0,0.04);
  z-index: 100;
}
.tabbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  color: #6B7280;
  font-size: 24rpx;
}
.tabbar-item-active {
  color: #00BD97;
}
.tabbar-icon {
  width: 48rpx;
  height: 48rpx;
}
.index-tabbar-bar {
  background: #000;
  border-radius: 9999rpx;
  width: 268rpx;
  height: 10rpx;
  margin: 29rpx auto 0 auto;
}
/* 隐藏品牌横向滚动条 */
.brand-row::-webkit-scrollbar {
  display: none;
}
.brand-row {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}
/* 弹窗样式 */
.loading-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(255,255,255,0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 8rpx solid #00BD97;
  border-top: 8rpx solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20rpx;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
.loading-text {
  color: #00BD97;
  font-size: 28rpx;
}
.car-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0 60rpx 0;
  color: #00BD97;
}
.car-empty-img {
  width: 180rpx;
  height: 180rpx;
  margin-bottom: 24rpx;
  opacity: 1;
}
.car-empty-text {
  font-size: 30rpx;
  color: #00BD97;
  margin-top: 8rpx;
}
</style>

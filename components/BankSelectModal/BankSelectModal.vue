<template>
    <view class="bank-modal-content">
      <view class="bank-modal-header">
        <text class="bank-modal-title">选择银行卡</text>
      </view>
      <view v-for="(card, idx) in cards" :key="card.id" class="bank-modal-item" @click="select(card)">
        <view class="bank-modal-item-left">
          <view class="bank-modal-icon" :style="{ background: card.bgColor }">
            <image class="bank-modal-icon-img" :src="card.icon" mode="aspectFit" />
          </view>
          <view class="bank-modal-info">
            <view class="bank-modal-bank">{{ card.bankName }}</view>
            <view class="bank-modal-tail">尾号 {{ card.tail }}</view>
          </view>
        </view>
        <view>
          <image v-if="selectedId === card.id" class="bank-modal-check" src="https://miaoduo.fbcontent.cn/private/resource/image/197f3a2b6faf4f6-b67e39b3-7e4c-4459-b510-44f523a78f39.svg" />
          <view v-else class="bank-modal-uncheck"></view>
        </view>
      </view>
      <view class="bank-modal-add-btn" @click.stop="onAdd">
        添加银行卡
      </view>
    </view>
</template>

<script>
export default {
  name: 'BankSelectModal',
  props: {
    show: Boolean,
    cards: Array,
    selectedId: [String, Number]
  },
  emits: ['close', 'select', 'add'],
  methods: {
    close() {
      this.$emit('close')
    },
    select(card) {
      this.$emit('select', card)
    },
    onAdd() {
      this.$emit('add')
    }
  }
}
</script>

<style scoped>
.bank-modal-content {
  width: 100vw;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  padding-bottom: 40rpx;
}

.bank-modal-bar {
  width: 80rpx;
  height: 8rpx;
  background: #D1D5DB;
  border-radius: 8rpx;
  margin: 16rpx auto 0 auto;
}
.bank-modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 24rpx 0 0 0;
  padding: 0 32rpx;
}
.bank-modal-title {
  color: #374151;
  font-size: 36rpx;
  font-weight: 500;
  text-align: center;
  flex: 1;
}
.bank-modal-close {
  width: 48rpx;
  height: 48rpx;
}
.bank-modal-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  border-bottom: 1rpx solid #F3F4F6;
}
.bank-modal-item-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24rpx;
}
.bank-modal-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bank-modal-icon-img {
  width: 40rpx;
  height: 40rpx;
}
.bank-modal-info {
  display: flex;
  flex-direction: column;
}
.bank-modal-bank {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
}
.bank-modal-tail {
  color: #6B7280;
  font-size: 24rpx;
  margin-top: 4rpx;
}
.bank-modal-check {
  width: 40rpx;
  height: 40rpx;
}
.bank-modal-uncheck {
  width: 40rpx;
  height: 40rpx;
  border-radius: 9999rpx;
  border: 2rpx solid #D1D5DB;
  background: #fff;
  margin-top: 0;
}
.bank-modal-add-btn {
  background: linear-gradient(90deg, #00BD97 0%, #36D7B7 100%);
  border-radius: 16rpx;
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
  text-align: center;
  margin: 48rpx 32rpx 0 32rpx;
  padding: 24rpx 0;
}
</style> 
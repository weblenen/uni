<template>
  <view class="wallet-root">
    <!-- 顶部栏 -->
    <HeaderBar title="我的钱包" />
    <!-- 主体内容 -->
    <view class="wallet-content">
      <!-- 提现卡片 -->
      <view class="withdraw-card">
        <view class="withdraw-label">提现金额</view>
        <view class="withdraw-amount-row">
          <text class="withdraw-currency">¥</text>
          <input class="withdraw-amount-input" type="number" v-model="amount" placeholder="请输入金额" />
          <view class="withdraw-all-btn">
            <text>全部</text>
          </view>
        </view>
        <view class="withdraw-balance">可提现余额：¥1,280.00</view>
        <view class="withdraw-divider"></view>
        <view class="withdraw-bank-label">到账银行卡</view>
        <view v-if="hasBankCard" class="withdraw-bank-row">
          <view class="bank-icon-wrap">
            <image class="bank-icon" :src="selectedCard.icon" mode="aspectFit" />
          </view>
          <view class="bank-info">
            <view class="bank-name">{{ selectedCard.bankName }}</view>
            <view class="bank-tail">尾号 {{ selectedCard.tail }}</view>
          </view>
          <view class="bank-change" @click="showBankModal = true">更换 &gt;</view>
        </view>
        <view v-else class="withdraw-bank-row no-bank">
          <view class="bank-icon-wrap gray">
            <image class="bank-icon" src="/static/yhk.svg" mode="aspectFit" />
          </view>
          <view class="bank-info">
            <view class="bank-name gray-text">暂无银行卡</view>
          </view>
          <view class="bank-add" @click="onAddBankCard">去添加 &gt;</view>
        </view>
        <view class="withdraw-btn">
          <text>确认提现</text>
        </view>
      </view>
      <!-- 提现记录卡片 -->
      <view class="record-card">
        <view class="record-header">
          <text class="record-title">提现记录</text>
          <text class="record-all">查看全部 &gt;</text>
        </view>
        <view class="record-divider"></view>
        <template v-if="hasBankCard && records.length">
          <view v-for="(item, idx) in records" :key="idx" class="record-item">
            <view class="record-item-left">
              <text class="record-item-bank">提现至{{ item.bankName }}({{ item.tail }})</text>
              <text class="record-item-date">{{ item.date }}</text>
            </view>
            <view class="record-item-right">
              <text class="record-item-amount">-¥{{ item.amount }}</text>
              <text class="record-item-status success">已到账</text>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="record-empty">暂无提现记录</view>
          <view class="record-empty-tip">成功提现后将在这里显示记录</view>
        </template>
      </view>
      <!-- 说明 -->
      <view class="wallet-footer">
        <image class="footer-icon" src="/static/sm.svg" mode="aspectFit" />
        <text class="footer-text">提现说明</text>
      </view>
    </view>
    <!-- 银行卡选择弹窗 -->
    <BaseModal v-model="showBankModal"  @close="showBankModal = false">
    <BankSelectModal
      :show="showBankModal"
      :cards="bankCards"
      :selectedId="selectedCard.id"
      @close="showBankModal = false"
      @select="onSelectBank"
      @add="onAddBankCard"
    />
    </BaseModal>
  </view>
</template>

<script>
import HeaderBar from '@/components/HeaderBar/HeaderBar.vue'
import BankSelectModal from '@/components/BankSelectModal/BankSelectModal.vue'
import BaseModal from '@/components/BaseModal/BaseModal.vue'

export default {
  components: { HeaderBar, BankSelectModal },
  data() {
    return {
      amount: '',
      hasBankCard: true, // 模拟有无银行卡，后续可对接接口
      showBankModal: false,
      bankCards: [
        {
          id: 1,
          bankName: '招商银行',
          tail: '5678',
          icon: '/static/yhk.svg',
          bgColor: '#2563EB'
        },
        {
          id: 2,
          bankName: '工商银行',
          tail: '1234',
          icon: '/static/yhk.svg',
          bgColor: '#EF4444'
        },
        {
          id: 3,
          bankName: '中国银行',
          tail: '9876',
          icon: '/static/yhk.svg',
          bgColor: '#3B82F6'
        }
      ],
      selectedCard: {
        id: 1,
        bankName: '招商银行',
        tail: '5678',
        icon: '/static/yhk.svg',
        bgColor: '#2563EB'
      },
      records: [
        { bankName: '招商银行', tail: '5678', date: '2023-09-15 14:30:25', amount: '500.00' },
        { bankName: '招商银行', tail: '5678', date: '2023-09-10 09:15:42', amount: '1,000.00' }
      ]
    }
  },
  methods: {
    onAddBankCard() {
      // 跳转添加银行卡流程
      this.showBankModal = false
      uni.navigateTo({ url: '/pages/mine/wallet/add-bankcard' })
    },
    onSelectBank(card) {
      this.selectedCard = card
      this.showBankModal = false
    }
  }
}
</script>

<style scoped>
.wallet-root {
  background: #F9FAFB;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
.wallet-content {
  margin-top: 0rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}
.withdraw-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  margin: 32rpx 32rpx 0 32rpx;
  padding: 32rpx 32rpx 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.withdraw-label {
  color: #6B7280;
  font-size: 28rpx;
  line-height: 40rpx;
}
.withdraw-amount-row {
  display: flex;
  align-items: center;
  margin-top: 12rpx;
  gap: 0;
  justify-content: space-between;
}
.withdraw-currency {
  color: #000;
  font-size: 48rpx;
  font-weight: 700;
  line-height: 64rpx;
  margin-right: 8rpx;
}
.withdraw-amount-input {
  flex: 1;
  font-size: 48rpx;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;
  background: transparent;
  line-height: 64rpx;
  padding: 0;
}
.withdraw-all-btn {
  border: 1rpx solid #14B8A6;
  border-radius: 9999rpx;
  color: #14B8A6;
  font-size: 24rpx;
  font-weight: 300;
  padding: 8rpx 32rpx;
  margin-left: 32rpx;
  line-height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.withdraw-balance {
  color: #6B7280;
  font-size: 24rpx;
  margin-top: 12rpx;
}
.withdraw-divider {
  border-top: 1rpx solid #F3F4F6;
  margin: 24rpx 0 0 0;
}
.withdraw-bank-label {
  color: #6B7280;
  font-size: 28rpx;
  margin-top: 24rpx;
}
.withdraw-bank-row {
  background: #F9FAFB;
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24rpx;
  margin-top: 12rpx;
  justify-content: space-between;
}
.bank-icon-wrap {
  background: #2563EB;
  border-radius: 12rpx;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bank-icon {
  width: 48rpx;
  height: 48rpx;
}
.bank-info {
  display: flex;
  flex-direction: column;
  margin-left: 24rpx;
}
.bank-name {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
}
.bank-tail {
  color: #6B7280;
  font-size: 24rpx;
  margin-top: 4rpx;
}
.bank-change {
  color: #9CA3AF;
  font-size: 28rpx;
  margin-left: auto;
}
.withdraw-btn {
  background: linear-gradient(90deg, #00BD97 0%, #36D7B7 100%);
  border-radius: 16rpx;
  margin-top: 32rpx;
  padding: 24rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.withdraw-btn text {
  color: #fff;
  font-size: 32rpx;
  font-weight: 500;
}
.record-card {
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,0.05);
  margin: 0 32rpx;
  padding: 32rpx 32rpx 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.record-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.record-title {
  color: #000;
  font-size: 32rpx;
  font-weight: 500;
}
.record-all {
  color: #9CA3AF;
  font-size: 24rpx;
}
.record-divider {
  border-top: 1rpx solid #F3F4F6;
  margin: 24rpx 0 0 0;
}
.record-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 24rpx;
}
.record-item-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.record-item-bank {
  color: #000;
  font-size: 28rpx;
  font-weight: 500;
}
.record-item-date {
  color: #6B7280;
  font-size: 20rpx;
  margin-top: 8rpx;
}
.record-item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}
.record-item-amount {
  color: #000;
  font-size: 28rpx;
  font-weight: 500;
}
.record-item-status {
  font-size: 20rpx;
  margin-top: 8rpx;
}
.record-item-status.success {
  color: #10B981;
}
.wallet-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  margin: 40rpx 0 0 0;
}
.footer-icon {
  width: 32rpx;
  height: 32rpx;
}
.footer-text {
  color: #9CA3AF;
  font-size: 24rpx;
}

.withdraw-bank-row.no-bank {
  background: #F9FAFB;
  border-radius: 16rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24rpx;
  margin-top: 12rpx;
  justify-content: space-between;
}
.bank-icon-wrap.gray {
  background: #9CA3AF;
}
.bank-name.gray-text {
  color: #9CA3AF;
  font-size: 32rpx;
  font-weight: 500;
}
.bank-add {
  color: #9CA3AF;
  font-size: 28rpx;
  margin-left: auto;
  cursor: pointer;
}
.record-empty {
  color: #9CA3AF;
  font-size: 28rpx;
  text-align: center;
  margin-top: 44rpx;
}
.record-empty-tip {
  color: #9CA3AF;
  font-size: 24rpx;
  text-align: center;
  margin-top: 16rpx;
}
</style>

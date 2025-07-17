<template>
  <div v-if="visible" class="base-modal-mask" @click.self="handleMaskClick" :style="{ opacity: maskOpacity }">
    <div
      class="base-modal-container"
      :class="{ 'base-modal-animating': animating, 'base-modal-leave': leave }"
      ref="modalContent"
      @click.stop
    >
      <div class="base-modal-bar"></div>
      <button class="base-modal-close" @click="close" aria-label="关闭">
        <svg viewBox="0 0 48 48" width="48rpx" height="48rpx" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#F5F5F5"/>
          <path d="M16 16l16 16M32 16L16 32" stroke="#888" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  closeOnMask: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue', 'close'])

const visible = ref(false)
const animating = ref(false)
const leave = ref(false)
const maskOpacity = ref(0)

watch(() => props.modelValue, (val) => {
  if (val) {
    visible.value = true
    nextTick(() => {
      maskOpacity.value = 1
      animating.value = true
      leave.value = false
    })
  } else {
    maskOpacity.value = 0
    leave.value = true
    setTimeout(() => {
      visible.value = false
      animating.value = false
    }, 300)
  }
})

if (props.modelValue) {
  visible.value = true
  animating.value = true
  maskOpacity.value = 1
}

function close() {
  // emit('update:modelValue', false)
  emit('close')
}
function handleMaskClick() {
  if (props.closeOnMask) close()
}
</script>

<style scoped>
.base-modal-mask {
  position: fixed;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  /* 背景模糊 */
  backdrop-filter: blur(8px);
  transition: opacity 0.3s;
}
.base-modal-container {
  background: #fff;
  border-top-left-radius: 48rpx;
  border-top-right-radius: 48rpx;
  min-width: 300rpx;
  min-height: 100rpx;
  padding: 24rpx 24rpx 24rpx 24rpx;
  position: relative;
  box-shadow: 0 8rpx 32rpx rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  max-width: none;
  animation: none;
}
.base-modal-bar {
  width: 128rpx;
  height: 12rpx;
  background: #D1D5DB;
  border-radius: 8rpx;
  
}
.base-modal-close {
  position: absolute;
  right: 32rpx;
  top: 24rpx;
  z-index: 2;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.base-modal-close svg {
  display: block;
}
.base-modal-close:hover svg circle {
  fill: #eee;
}
.base-modal-close:hover svg path {
  stroke: #333;
}
.base-modal-animating {
  animation: base-modal-slide-up 0.3s cubic-bezier(.25,.8,.25,1);
}
.base-modal-leave {
  animation: base-modal-slide-down 0.3s cubic-bezier(.25,.8,.25,1) forwards;
}
@keyframes base-modal-slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes base-modal-slide-down {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
</style> 
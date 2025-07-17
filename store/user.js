import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: ''
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo
    },
    setToken(token) {
      this.token = token
    },
    logout() {
      this.userInfo = null
      this.token = ''
      if (typeof uni !== 'undefined') {
        try { uni.removeStorageSync('token') } catch {}
        try { uni.removeStorageSync('userInfo') } catch {}
      }
    }
  }
}) 
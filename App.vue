<script>
import { useUserStore } from '@/store/user'

export default {
  onLaunch: function() {
    console.log('App Launch')
    // 1. 获取 userStore 实例
    const userStore = useUserStore()
    // 2. 假设你有 resdata.userInfo 和 resdata.token
    // 你可以从本地缓存或接口获取
    const userInfo = uni.getStorageSync('userInfo')
    const token = uni.getStorageSync('token')
    if (userInfo && token) {
      userStore.setUserInfo(userInfo)
      userStore.setToken(token)
    }
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>
	/*每个页面公共css */
</style>

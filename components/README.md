# 组件文档

本目录包含以下 Vue 组件，适用于本项目的各类页面。每个组件均为 Vue 2 单文件组件（.vue）。

---

## StatusBarGap

**文件路径**：`components/StatusBarGap/StatusBarGap.vue`

**用途**：
用于适配不同设备的状态栏高度，并可选显示标题。常用于页面顶部。

**Props**：
- `title` (String, 默认: '')：标题文本。
- `showTitle` (Boolean, 默认: true)：是否显示标题。

**用法示例**：
```vue
<StatusBarGap title="页面标题" :showTitle="true" />
```

---

## MemberDetailModal

**文件路径**：`components/MemberDetailModal/MemberDetailModal.vue`

**用途**：
展示会员详细信息的弹窗，包括头像、状态、手机号、统计信息等。

**Props**：
- `show` (Boolean)：是否显示弹窗。
- `member` (Object)：会员信息对象。

**用法示例**：
```vue
<MemberDetailModal :show="showModal" :member="memberInfo" @close="showModal = false" />
```

---

## LoginRegisterModal

**文件路径**：`components/LoginRegisterModal/LoginRegisterModal.vue`

**用途**：
登录/注册弹窗，支持微信一键登录，协议勾选等。

**Props**：
- `show` (Boolean)：是否显示弹窗。

**用法示例**：
```vue
<LoginRegisterModal :show="showLogin" @close="showLogin = false" />
```

---

## HeaderBar

**文件路径**：`components/HeaderBar/HeaderBar.vue`

**用途**：
页面顶部导航栏，带返回按钮和标题。

**Props**：
- `title` (String, 默认: '')：标题文本。

**用法示例**：
```vue
<HeaderBar title="页面标题" />
```

---

## BankSelectModal

**文件路径**：`components/BankSelectModal/BankSelectModal.vue`

**用途**：
选择银行卡的弹窗，支持选择、添加银行卡。

**Props**：
- `show` (Boolean)：是否显示弹窗。
- `cards` (Array)：银行卡列表。
- `selectedId` (String/Number)：当前选中的卡片 id。

**事件**：
- `close`：关闭弹窗
- `select(card)`：选择某张卡
- `add`：添加银行卡

**用法示例**：
```vue
<BankSelectModal :show="showBankModal" :cards="bankList" :selectedId="selectedBankId"
  @close="showBankModal = false" @select="onSelectBank" @add="onAddBank" />
```

---

## CarCard

**文件路径**：`components/CarCard/CarCard.vue`

**用途**：
车辆信息卡片，展示车辆图片、价格、补贴、收藏等信息。

**Props**：
- `tag` (String)：标签
- `img` (String)：车辆图片
- `title` (String)：标题
- `price` (String)：价格
- `subsidy` (String/Number)：补贴
- `subsidy_amount` (String/Number)：补贴金额
- `receivedCount` (String/Number)：领取人数
- `arrowIcon` (String)：右侧箭头图标
- `bottomIcon` (String)：底部图标
- `power_type` (Array)：能源类型 id 列表
- `userId` (String/Number)：用户 id
- `vehicleId` (String/Number)：车辆 id

**用法示例**：
```vue
<CarCard :img="car.img" :title="car.title" :price="car.price" :subsidy="car.subsidy"
  :subsidy_amount="car.subsidy_amount" :receivedCount="car.receivedCount"
  :power_type="car.power_type" :userId="userId" :vehicleId="car.id"
  @click="onCarClick(car)" />
```

---

## uView 动态 Tabbar 说明

本项目推荐使用 uView 的 <u-tabbar> 组件实现自定义/动态 tabbar。

**用法示例：**
```vue
<u-tabbar :value="active" @change="onChange">
  <u-tabbar-item icon="home" text="首页" name="index" />
  <u-tabbar-item icon="list" text="进度" name="progress" />
  <u-tabbar-item v-if="userInfo && userInfo.referrer == 1" icon="star" text="推客" name="referrer" />
  <u-tabbar-item icon="account" text="我的" name="mine" />
</u-tabbar>
```

**动态控制 tabbar 项显示/隐藏，详见 uView 官方文档：https://www.uviewui.com/components/tabbar.html** 
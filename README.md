# 新车帮买2.0 项目

本项目为新车帮买2.0版本，基于 UniApp 框架开发，使用了 Pinia 状态管理和 uView UI 组件库。

---

# 项目结构与开发规范说明

本项目采用 UniApp 框架，页面按功能模块分文件夹管理，便于扩展和维护。

## 主要目录结构

```
atbuycar-univ2/
  pages/
    index/                # 首页
    mine/                 # 我的相关页面
      wallet/             # 我的钱包及子页面
      favorite/           # 我的收藏
      ...
    ...
  static/                 # 静态资源
  store/                  # 状态管理
  utils/                  # 工具函数
  ...
```

## 页面注册与跳转
- 所有页面均需在 `pages.json` 注册。
- 子页面建议放在对应功能文件夹下（如 `mine/wallet/index.vue`）。
- 跳转统一使用绝对路径，如：
  ```js
  uni.navigateTo({ url: '/pages/mine/wallet/index' })
  ```

## 自定义头部
- 所有页面建议设置 `navigationStyle: custom`，使用自定义公共头部组件。

## 扩展建议
- 新增页面时，优先在对应模块文件夹下新建，并注册到 `pages.json`。
- 各模块可在本目录下添加 `README.md` 说明子结构和用法。

---
如有疑问或需补充说明，请联系项目维护者。

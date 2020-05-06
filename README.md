# lighthouse-plugin-arnold-diy

## 介绍
> 基于支付宝小程序web端的性能检测

## 安装
```
yarn add lighthouse-plugin-arnold-diy

npm install lighthouse-plugin-arnold-diy
```

## 使用说明
```js
const lighthouseLauncher = require('lighthouse');

lighthouseLauncher(url, {
  // chrome-launcher config
}, {
  extends: 'lighthouse:default',
  plugins: ['lighthouse-plugin-arnold-diy'],
  setttings: {
    // lighthouse settings...
  },
});
```

## 未来规划
支持更多小程序检测项




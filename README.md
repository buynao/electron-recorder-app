# electron-recorder-app

基于 `electron` 的视频录制客户端，可以采集电脑设备上的各种视频源，进行播放和录制。

![image](https://user-images.githubusercontent.com/11701966/149653517-dca4b0f7-4721-4541-b644-2d1c7c22450f.png)

## 功能

- 支持大于 2GB 的录制文件，且在下载到本地时，不会占用太多内存和时间
- 修复了进度条不能拖拽浏览的问题 [详情见此链接](https://bugs.chromium.org/p/chromium/issues/detail?id=642012)
- 包含声音录制，可调节音量
- 可自定义背景图

## 本地运行

```sh
git clone https://github.com/buynao/electron-recorder-app
cd electron-recorder-app
yarn && yarn dev
```

## 打包

mac 客户端： `yarn pack:mac`

windows 客户端： `yarn pack:win`

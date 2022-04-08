import { VideoSourceMenu } from "./VideoSourceList";
import * as React from "react";
import { LayoutMode } from "./Layout";
import { Devices } from "./VideoSourceList";
import { useGetVideoPlayerState, VideoStateProps } from './hooks/useGetVideoPlayerState';
import { useDragEvent } from './hooks/useDragEvent';
import { useToolsShowEvent } from './hooks/useToolsShowEvent';
import { getImage } from '../../util/help';
import "./style.less";
const Remote = require('@electron/remote');

const { useEffect, useState, useCallback } = React;



interface VideoLayoutProps {
  mode: number;
  showSourceMenuFun: () => void
  showSourceMenu: boolean;
  hideAllModeMenu: () => void;
  selectVideo: HTMLVideoElement | null;
  setSelectVideo: (video: HTMLVideoElement | null) => void;
  toggleMenuToolHide: (bol: boolean) => void;
}

export function VideoLayout(props: VideoLayoutProps) {
  const { mode, showSourceMenu, selectVideo, showSourceMenuFun, hideAllModeMenu , setSelectVideo, toggleMenuToolHide } = props;
  const [ sourceMenuPosition, saveSourceMenuPosition ] = useState({});
  const [ bgImg, setBgImg ] = useState('');
  const [ curVideo, saveCurVideo ] = useState<HTMLVideoElement>();
  const [ devices, updateDevices ] = useState<Devices>({} as Devices);
  const [ videoPlayState, updateVideoPlayStates ] = useGetVideoPlayerState<VideoStateProps>(mode);
  useDragEvent(videoPlayState, updateVideoPlayStates);
  // 初始化  - 获取媒体设备
  useEffect(() => {
    async function getDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const ob = {
        videoinputs: devices.filter(device => device.kind === 'videoinput'),
        audiooutputs: devices.filter(device => device.kind === 'audiooutput'),
        audioinputs: devices.filter(device => device.kind === 'audioinput')
      }
      updateDevices(ob);
    }
    getDevices();
  }, []);
  // 更新播放器对应diviced关系
  const updateVideoStates = useCallback((deviceId: string, video: HTMLVideoElement) => {
    const newStates = videoPlayState.map((videoState) => {
      const index = Number(video.getAttribute('index'))
      if (videoState.index === index) {
        if (deviceId) {
          return {
            ...videoState,
            deviceId
          }
        } else {
          // 初始化设置
          return {
            ...videoState,
            left: video.getBoundingClientRect().left,
            top: video.getBoundingClientRect().top,
            width: parseInt(video.style.width, 10),
            height: parseInt(video.style.height, 10),
            video
          } as VideoStateProps
        }
      }
      return videoState
    });
    updateVideoPlayStates(newStates);
    hideAllModeMenu();
  }, [videoPlayState]);
  // video点击事件
  const handleVideoClick = useCallback((e, index: number) => {
      saveCurVideo(e.target);
      e.stopPropagation();
      showSourceMenuFun();
      const left = e.clientX + 200 > window.innerWidth ? e.clientX - 200 : e.clientX;
      const top = e.clientY + 200 > window.innerHeight ? e.clientY - 100 : e.clientY;
      saveSourceMenuPosition({
        left,
        top
      });
  }, []);
  // video点击事件
  const handleVideoWrapClick = useCallback((e: any, videoWrap: HTMLVideoElement | null) => {
    setSelectVideo(videoWrap);
    e.stopPropagation();
  }, []);
  // 切换背景 & 隐藏弹窗
  const handleLayoutClick = useCallback(async (e: React.MouseEvent<HTMLDivElement>, contextPop?: boolean) => {
    if (contextPop || (e.target as HTMLDivElement).className.includes('Container-layout')) {
      const img = await getImage() as string;
      setBgImg(img)
      hideAllModeMenu();
    }
  }, []);
  const menuPop = useToolsShowEvent(toggleMenuToolHide, handleLayoutClick);

  return (
    <div className="Container-layout"
      style={{
        position: 'relative',
        backgroundImage: bgImg ? `url(${bgImg})` : ''
      }}
      onContextMenu={(ev) => {
        // 弹出上下文菜单
        menuPop();
        // 阻止默认行为
        ev.preventDefault();
      }}
      onClick={hideAllModeMenu}
      onDoubleClick={handleLayoutClick}
    >
        <LayoutMode
            mode={mode}
            selectVideo={selectVideo}
            videoPlayState={videoPlayState}
            handleVideoClick={handleVideoClick}
            handleVideoWrapClick={handleVideoWrapClick}
            updateVideoStates={updateVideoStates}
        />
        { showSourceMenu ? <VideoSourceMenu
            devices={devices}
            postition={sourceMenuPosition}
            video={curVideo as HTMLVideoElement}
            updateVideoStates={updateVideoStates}
        /> : null }
    </div>
  )
}
 

import { VideoSourceMenu } from "./VideoSourceList";
import * as React from "react";
import { LayoutMode } from "./Layout";
import { Devices } from "./VideoSourceList";
import { useGetVideoPlayerState, VideoStateProps } from './hooks/useGetVideoPlayerState';
import { useDragEvent } from './hooks/useDragEvent';
const { useEffect, useState, useCallback } = React;
import "./style.less";

interface VideoLayoutProps {
  mode: number;
  showSourceMenuFun: () => void
  showSourceMenu: boolean;
  hideAllModeMenu: () => void;
  selectVideo: HTMLVideoElement | null;
  setSelectVideo: (video: HTMLVideoElement | null) => void;
}

export function VideoLayout(props: VideoLayoutProps) {
  const { mode, showSourceMenu, showSourceMenuFun, hideAllModeMenu , setSelectVideo, selectVideo } = props;
  const [ sourceMenuPosition, saveSourceMenuPosition ] = useState({});
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
  // 获取当前布局界面
  return (
    <div className="Video-layout" onClick={hideAllModeMenu}>
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
 


import { LayoutProps } from "./Layout";
import * as React from "react";
const { useEffect, useState, useRef } = React;

export interface VideoProps extends LayoutProps {
  id?: string;
  cls: string;
  style?: any;
  index: number;
}

function VideoComp(props: VideoProps) {
  const { id, cls, style, handleVideoClick,
    handleVideoWrapClick, selectVideo, videoPlayState, index, updateVideoStates
  } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayVideo, savePlayVideoState] = useState<boolean>(false);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
    // 播放音频
  useEffect(() => {
    const curVideoState = videoPlayState.filter((videoState) => videoState.index === index);
    if (!curVideoState.length) return;
    const videoState = curVideoState[0];
    if (!videoState.video) {
        updateVideoStates('', videoRef.current as HTMLVideoElement);
        return;
    };
    if (videoState.video === videoRef.current) {
      if (videoState.deviceId) {
        // 调用 getUserMedia API 获取音视频流
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            deviceId: videoState.deviceId
          }
        })
        .then((mediaStream) => {
          if (!videoRef.current) return;
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = function() {
            if (!videoRef.current) return;
            videoRef.current.play();
            // 禁止杂音
            videoRef.current.volume = 0;
            savePlayVideoState(true);
          };
        })
        .catch((err) => {
            alert(err.message);
        });
      } else {

        videoRef.current.srcObject = null;
        savePlayVideoState(false);
      }
    }
  }, [videoPlayState]);

  const isSelect = selectVideo === videoRef.current && selectVideo !== null;
  const curVideoState = videoPlayState.filter((videoState) => videoState.index === index);
  const videoState = curVideoState[0] || {};
  const deviceid = videoState.video === videoRef.current ? videoState.deviceId : '';

  return (
      <div className={`video-wrap ${cls}`}
        style={{
          ...style,
        }}
        draggable={true}
        index={index}
        deviceid={deviceid}
      >
        <div
          className={`video-move-wrap ${isSelect ? 'select': ''}`}
          ref={videoWrapRef}
          onClick={(e) => {
            handleVideoWrapClick(e, e.target as HTMLVideoElement);
          }}  style={{
            ...style,
            // ...positionCss
            }}>
            { !isPlayVideo ?
            <p style={{
              width: style.width - 2,
              height: style.height - 2,
              lineHeight: `${style?.height || 0}px`
            }} className="video-mode-index"></p> : null }
            
            <video
              className={`videoPlayer ${isPlayVideo ? "playing" : 'notPlaying'}`}
              style={{
                ...style,
              }}
              index={index}
              muted={false}
              deviceid={deviceid}
              ref={videoRef}
              onClick={(e) => handleVideoClick(e, index)}
              id={id}
              autoPlay
              playsInline />
            {/* {
              isSelect ? <>
                <span className="video-move lt"></span>
                <span className="video-move lb"></span>
                <span className="video-move rt"></span>
                <span className="video-move rb"></span>
              </> : null
            } */}
        </div>
    </div>
  )
}

export function Video(props: VideoProps) {
  return  <VideoComp 
  {
    ...props
  }/>
};
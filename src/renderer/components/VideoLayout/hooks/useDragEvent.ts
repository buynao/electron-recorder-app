import * as React from "react";
import { VideoStateProps } from "./useGetVideoPlayerState";

const MOVE = {
  drag: 'drag',
  start: 'dragstart',
  over: 'dragover',
  end: 'dragend',
  enter: 'dragenter',
  leave: 'dragleave',
  drop: 'drop'
};

const { useEffect, useRef } = React;

export const useDragEvent  = (
  videoPlayState: VideoStateProps[],
  updateVideoStates: React.Dispatch<React.SetStateAction<VideoStateProps[]>>
) => {
  const draggedRef = useRef<any>();
  const dragEventRef = useRef<any>({});
  useEffect(() => {
    dragEventRef.current.start = (e: any) => {
      if (e.target) {
        const $video = e.target as HTMLVideoElement;
        draggedRef.current = e.target;
        draggedRef.current.cls = $video.className;
        draggedRef.current.index = $video.getAttribute('index');
        draggedRef.current.deviceid = $video.getAttribute('deviceid');
        $video.className = `${$video.className} draging`;
        e.dataTransfer.setData("index", $video.getAttribute('index'));
      }
    };
    dragEventRef.current.over = (e: any) => {
      e.preventDefault();
    };
    dragEventRef.current.enter = (e: any) => {
        // 当可拖动的元素进入可放置的目标高亮目标节点
        e.preventDefault();
        const $videoWrap = e.target as HTMLVideoElement;
        const enterIndex = $videoWrap.getAttribute('index');
        const dragIndex = draggedRef.current.index;
        if(enterIndex && enterIndex !== dragIndex) {
            $videoWrap.style.borderColor = 'red';
        }
    };
    dragEventRef.current.leave = (e: any) => {
      e.preventDefault();
      const $videoWrap = e.target as HTMLVideoElement;
      const enterIndex = $videoWrap.getAttribute('index');
      const dragIndex = draggedRef.current.index;
      if(enterIndex && enterIndex !== dragIndex) {

          $videoWrap.style.borderColor = 'transparent';
      }
    };
    dragEventRef.current.drop = (e: any) => {
      const $videoWrap = e.target as HTMLVideoElement;
      draggedRef.current.className = draggedRef.current.cls;
    
      const enterIndex = $videoWrap.getAttribute('index');
      const dragIndex = draggedRef.current.index;
      if(enterIndex && enterIndex !== dragIndex) {
        const enterDeviceid= $videoWrap.getAttribute('deviceid');
        const dragDeviceid= draggedRef.current.deviceid;
        const newVideoState = videoPlayState.map((videoState) => {
            if (videoState.index === Number(enterIndex)) {
              return {
                ...videoState,
                deviceId: dragDeviceid
              }
            }
            if (videoState.index === Number(dragIndex)) {
              return {
                ...videoState,
                deviceId: enterDeviceid
              }
            }
            return videoState;
        });
        updateVideoStates(newVideoState);
        $videoWrap.style.borderColor = 'transparent';
      }
    };
    document.addEventListener(MOVE.start, dragEventRef.current.start);
    document.addEventListener(MOVE.over, dragEventRef.current.over);
    document.addEventListener(MOVE.enter, dragEventRef.current.enter);
    document.addEventListener(MOVE.leave, dragEventRef.current.leave);
    document.addEventListener('drop', dragEventRef.current.drop);
    return () => {
      document.removeEventListener(MOVE.start, dragEventRef.current.start);
      document.removeEventListener(MOVE.over, dragEventRef.current.over);
      document.removeEventListener(MOVE.enter, dragEventRef.current.enter);
      document.removeEventListener(MOVE.leave, dragEventRef.current.leave);
      document.removeEventListener(MOVE.drop, dragEventRef.current.drop);
    }
  }, [videoPlayState]);
}
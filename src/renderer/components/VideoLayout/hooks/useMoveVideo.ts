import * as React from "react";
import { VideoStateProps } from "./useGetVideoPlayerState";
interface PositionProps {
  videoCurrent: HTMLDivElement | null;
  left: number;
  top: number;
}

const { useEffect, useRef, useState } = React;

export const useMoveVideo = (
  videoWrap: HTMLDivElement | null,
  video: HTMLVideoElement | null,
  videoPlayState: VideoStateProps[]
) => {
  const mouseStartEventRef = useRef<any>();
  const mousehMoveEventRef = useRef<any>();
  const mousehEndEventRef = useRef<any>();
  const moveStartPositionRef = useRef({ x : 0, y : 0 , left: 0, top: 0 });
  const isMoveingRef = useRef(false);
  const [ curPosition, setPosition ] = useState<PositionProps>({ videoCurrent: null, left: 0, top: 0 });

  useEffect(() => {
    if (!videoWrap) return;
    const mouseStartEvent = (e: any) => {
      if (!videoWrap) return;
      if(e.target === videoWrap || e.target === video) {
        isMoveingRef.current = true;
        const left = parseInt(videoWrap.style.left);
        const top = parseInt(videoWrap.style.top);
        moveStartPositionRef.current = {
          left, top,
          x: e.clientX,
          y: e.clientY
        };
      }
    };
    const mouseMoveEvent = (e: any) => {
      if (!videoWrap || !isMoveingRef.current) return;
      const diffOffset = {
        x: e.clientX - moveStartPositionRef.current.x + moveStartPositionRef.current.left,
        y: e.clientY - moveStartPositionRef.current.y + moveStartPositionRef.current.top,
      };
      videoWrap.style.left = `${diffOffset.x}px`;
      videoWrap.style.top = `${diffOffset.y}px`;
    };
    const mouseEndEvent = (e: any) => {
      if (isMoveingRef.current) {
        const diffOffset = {
          x: e.clientX - moveStartPositionRef.current.x + moveStartPositionRef.current.left,
          y: e.clientY - moveStartPositionRef.current.y + moveStartPositionRef.current.top,
        };
        setPosition({
          videoCurrent: videoWrap,
          left: diffOffset.x,
          top: diffOffset.y
        })
        isMoveingRef.current = false;
        // updateVideoStates('', video);
      }
    };
    function videoAddClick() {
      mouseStartEventRef.current = (e: any) => {
          mouseStartEvent(e);
      };
      mousehMoveEventRef.current = (e: any) => {
          mouseMoveEvent(e);
      };
      mousehEndEventRef.current = (e: any) => {
          mouseEndEvent(e);
      };
      document.body.addEventListener('mousedown', mouseStartEventRef.current);
      document.body.addEventListener('mousemove', mousehMoveEventRef.current);
      document.body.addEventListener('mouseup', mousehEndEventRef.current);
  }
  videoAddClick();
    return () => {
      function videoRemoveClick() {
          // 移除之前的事件监听
          if(mouseStartEventRef.current) {
              document.body.removeEventListener('mousedown', mouseStartEventRef.current);
              document.body.removeEventListener('mousemove', mousehMoveEventRef.current);
              document.body.removeEventListener('mouseup', mousehEndEventRef.current);
          }
      }
      videoRemoveClick();
    }
  }, [videoWrap, video, videoPlayState]);

  return curPosition;
}
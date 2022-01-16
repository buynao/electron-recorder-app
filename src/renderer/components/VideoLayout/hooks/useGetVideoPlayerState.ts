import * as React from "react";
export interface VideoStateProps {
  video: HTMLVideoElement | null;
  deviceId: string;
  index: number;
  state?: number; // 0: 未播放，1: 播放中，2：暂停
  left: 0,
  width: 0,
  height: 0,
  top: 0
}

const { useEffect, useRef, useState } = React;

export const useGetVideoPlayerState = <T>(mode: number): [T[], React.Dispatch<React.SetStateAction<T[]>>] => {
  const [ videoPlayStates, updateVideoPlayStates ] = useState<T[]>([]);

  useEffect(() => {
    const states = [];
    for (let i = 1; i <= mode; i++) {
      states.push({
          video: null,
          deviceId: '',
          state: 0,
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          index: i
        } as unknown as T);
    }
    updateVideoPlayStates(states);
    return () => {

    }
  }, [mode]);

  return [videoPlayStates, updateVideoPlayStates];
}
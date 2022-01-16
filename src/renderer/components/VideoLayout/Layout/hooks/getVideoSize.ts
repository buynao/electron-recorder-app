

import {
  getLit4VideoSize,
  getVideoFullSize,
  getVideoSize5,
  getVideoSizeLit7,
  getVideoSize8
} from "../../../../util/help";
import * as React from "react";

const { useEffect, useState, useCallback } = React;

/* mode = 1 的布局大小 */
export const useGetVideoSizeFull = () => {
  const [ wrapWidth, setWrapWidth ] = useState(window.innerWidth - 100);
  const videoFullSize = getVideoFullSize(wrapWidth);
  const [ videoStyle, setVideoStyle ] = useState(videoFullSize);
  const handleReize = useCallback(() => {
    const wrapWidth = window.innerWidth - 20;
    setWrapWidth(wrapWidth);
    const videoReSize = getVideoFullSize(wrapWidth);
    setVideoStyle(videoReSize)
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleReize);
    return () => {
      window.removeEventListener('resize', handleReize);
    }
  }, []);
  return {
    videoStyle, wrapWidth
  }
}
/* mode = 2 ~ 4 的布局大小 */
export const useGetVideoSizeLit4 = () => {
  const [ wrapWidth, setWrapWidth ] = useState(window.innerWidth - 20);
  const videoLit4Size = getLit4VideoSize(wrapWidth);
  const [ videoStyle, setVideoStyle ] = useState(videoLit4Size.style);
  const [ videoLitStyle, setVideoLitStyle ] = useState(videoLit4Size.litStyle);
  const handleReize = useCallback(() => {
    setWrapWidth(window.innerWidth - 20);
    const videoReSize = getLit4VideoSize(window.innerWidth - 20);
    setVideoStyle(videoReSize.style)
    setVideoLitStyle(videoReSize.litStyle)
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleReize);
    return () => {
      window.removeEventListener('resize', handleReize);
    }
  }, []);
  return {
    normal: videoStyle,
    lit: videoLitStyle,
    wrapWidth
  }
}

/* mode = 5  的布局大小 */
export const useGetVideoSize5 = () => {
  const [ wrapWidth, setWrapWidth ] = useState(window.innerWidth - 20);
  const videoSize5 = getVideoSize5(wrapWidth);
  const [ videoStyle, setVideoStyle ] = useState(videoSize5.style);
  const [ videoLitStyle, setVideoLitStyle ] = useState(videoSize5.litStyle);
  const handleReize = useCallback(() => {
    const wrapWidth = window.innerWidth - 20;
    setWrapWidth(wrapWidth);
    const videoReSize = getVideoSize5(wrapWidth);
    setVideoStyle(videoReSize.style)
    setVideoLitStyle(videoReSize.litStyle)
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleReize);
    return () => {
      window.removeEventListener('resize', handleReize);
    }
  }, []);
  return {
    normal: videoStyle,
    lit: videoLitStyle,
    wrapWidth
  }
}

/* mode = 6 ~ 7 的布局大小 */
export const useGetVideoSizeLit7 = () => {
  const [ wrapWidth, setWrapWidth ] = useState(window.innerWidth - 20);
  const videoSizeLit8 = getVideoSizeLit7(wrapWidth);
  const [ videoStyle, setVideoStyle ] = useState(videoSizeLit8.style);
  const [ videoLitStyle, setVideoLitStyle ] = useState(videoSizeLit8.litStyle);
  const handleReize = useCallback(() => {
    const wrapWidth = window.innerWidth - 20;
    setWrapWidth(wrapWidth);
    const videoReSize = getVideoSizeLit7(wrapWidth);
    setVideoStyle(videoReSize.style)
    setVideoLitStyle(videoReSize.litStyle)
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleReize);
    return () => {
      window.removeEventListener('resize', handleReize);
    }
  }, []);
  return {
    normal: videoStyle,
    lit: videoLitStyle,
    wrapWidth
  }
}

/* mode = 8 的布局大小 */
export const useGetVideoSize8 = () => {
  const [ wrapWidth, setWrapWidth ] = useState(window.innerWidth - 20);
  const videoSize8 = getVideoSize8(wrapWidth);
  const [ videoStyle, setVideoStyle ] = useState(videoSize8.style);
  const [ videoLitStyle, setVideoLitStyle ] = useState(videoSize8.litStyle);
  const handleReize = useCallback(() => {
    const wrapWidth = window.innerWidth - 20;
    setWrapWidth(wrapWidth);
    const videoReSize = getVideoSize8(wrapWidth);
    setVideoStyle(videoReSize.style)
    setVideoLitStyle(videoReSize.litStyle)
  }, []);
  useEffect(() => {
    window.addEventListener('resize', handleReize);
    return () => {
      window.removeEventListener('resize', handleReize);
    }
  }, []);
  return {
    normal: videoStyle,
    lit: videoLitStyle,
    wrapWidth
  }
}

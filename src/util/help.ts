import { VIDEO_WIDTH_MAP, VIDEO_SIZE_LIT4, VIDEO_SCALE, VIDEO_SIZE_5, VIDEO_SIZE_LIT8, VIDEO_SIZE_8 } from "../constant";

export const getLit4VideoSize = () => {
  const innerWidth = window.innerWidth;
  return {
    style: {
      width: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_LIT4.SIZE,
      height: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_LIT4.SIZE / VIDEO_SCALE
    },
    litStyle: {
      width: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_LIT4.LIT_SIZE,
      height: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_LIT4.LIT_SIZE / VIDEO_SCALE
    }
  }
}
export const getVideoSizeLit7 = () => {
  const innerWidth = window.innerWidth;
  return {
    style: {
      width: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  *  VIDEO_SIZE_LIT8.SIZE),
      height: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_LIT8.SIZE / VIDEO_SCALE)
    },
    litStyle: {
      width: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_LIT8.LIT_SIZE),
      height: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_LIT8.LIT_SIZE / VIDEO_SCALE)
    }
  }
}
export const getVideoSize8 = () => {
  const innerWidth = window.innerWidth;
  return {
    style: {
      width: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  *  VIDEO_SIZE_8.SIZE),
      height: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_8.SIZE / VIDEO_SCALE)
    },
    litStyle: {
      width: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_8.LIT_SIZE),
      height: Math.floor((innerWidth - VIDEO_WIDTH_MAP - 10)  * VIDEO_SIZE_8.LIT_SIZE / VIDEO_SCALE)
    }
  }
}


export const getVideoSize5 = () => {
  const innerWidth = window.innerWidth;
  return {
    style: {
      width: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_5.SIZE,
      height: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_5.SIZE / VIDEO_SCALE
    },
    litStyle: {
      width: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_5.LIT_SIZE,
      height: (innerWidth - VIDEO_WIDTH_MAP)  * VIDEO_SIZE_5.LIT_SIZE / VIDEO_SCALE
    }
  }
}

export const getVideoFullSize  = () => {
    const innerWidth = window.innerWidth;
    return {
        width: (innerWidth - 20),
        height: (innerWidth - 20) / VIDEO_SCALE
    }
}
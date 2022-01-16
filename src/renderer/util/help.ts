import { VIDEO_WIDTH_MAP, VIDEO_SIZE_LIT4, VIDEO_SCALE, VIDEO_SIZE_5, VIDEO_SIZE_LIT8, VIDEO_SIZE_8 } from "./constant";
const Remote = require('@electron/remote');

export const getLit4VideoSize = (innerWidth: number) => {
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
export const getVideoSizeLit7 = (innerWidth: number) => {
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
export const getVideoSize8 = (innerWidth: number) => {
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


export const getVideoSize5 = (innerWidth: number) => {
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

export const getVideoFullSize  = (innerWidth: number) => {
    return {
        width: innerWidth > 1600 ? innerWidth - 200 : innerWidth - 100,
        height: (innerWidth > 1600 ? innerWidth - 200 : innerWidth - 100)/ VIDEO_SCALE
    }
}

export function getDate() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
/*
* 获取保存路径
*/
export const getVideoPath = () => {
  return new Promise((resolve) => {
    Remote.dialog.showSaveDialog({
      buttonLabel: '保存录制视频',
      defaultPath: `vid-${getDate()}.webm`
    }).then(({ filePath, canceled }: any) => {
        if (canceled) resolve('');
        resolve(filePath)
    });
  })
}
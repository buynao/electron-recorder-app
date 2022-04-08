import { VIDEO_WIDTH_MAP, VIDEO_SIZE_LIT4, VIDEO_SCALE, VIDEO_SIZE_5, VIDEO_SIZE_LIT8, VIDEO_SIZE_8 } from "./constant";
const Remote = require('@electron/remote');

const fs = require('fs');

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

/*
* 获取图片地址
*/
export const getImage = () => {
  return new Promise((resolve) => {
    Remote.dialog.showOpenDialog({
      title: '选择背景图片',
      filters: [
        {
          name: 'img',
          extensions: ['jpg', 'png'] // 只允许 jpg 和 png 格式的文件
        }
      ],
      buttonLabel: '选择图片'
    }).then((filePath: any) => {
      if (!filePath.filePaths[0]) {
        return;
      }
      fs.exists(filePath.filePaths[0], (exists: any) => {
        console.log(exists ? "文件存在" : "文件不存在");
        console.log(exists);
        if (exists) {
          //读取本地的json文件
          // let result = JSON.parse(fs.readFileSync(newFile_path));
          let result = fs.readFileSync(filePath.filePaths[0]);
          resolve(transformArrayBufferToBase64(result))
        }
      })
    });
  })
}
function transformArrayBufferToBase64 (buffer: any) {            
  var binary = '';            
  var bytes = new Uint8Array(buffer);            
  for (var len = bytes.byteLength, i = 0; i < len; i++) {                
      binary += String.fromCharCode(bytes[i]);            
  }            
  return "data:image/png;base64," + window.btoa(binary);        
}   
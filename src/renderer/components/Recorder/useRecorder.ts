
import fixWebmDuration from 'webm-duration-fix';
import { message } from 'antd';
import { getVideoPath } from "../../util/help";
import * as React from 'react';
const fs = require('fs');
const Remote = require('@electron/remote');
const { useRef, useState, useEffect } = React;
const isWin = process.platform === 'win32';

interface RecorderConst {
  slice: number;
  timeSlice: number;
  timer: NodeJS.Timeout;
  isSaveing: boolean;
  fileBits: any[];
  timeOut: number;
}

export type Opt = {
  mimeType: string;
  width?: number;
  height?: number;
}


export const writeVideoInPath = async (fixBlob: Blob, videoPath: string) => {
  return new Promise(async (resolve) => {
    try {
      let fileStream = fs.createWriteStream(videoPath);
      const readstream = fixBlob.stream() as any;
      const reader = readstream.getReader();

      while (true) {
        let { done, value } = await reader.read();
        if (done) {
          fileStream.close();
          resolve(true);
          break;
        }
        fileStream.write(value);
        value = null;
      }
    } catch (error: any) {
      console.error('catch error');
      console.error(error);
    }
  })
}
// 屏幕画面&系统声音
// const getDesktopAudioStream = async () => {
//   const audioSource: MediaStream = await navigator.mediaDevices.getUserMedia({
//     audio: {
//       mandatory: {
//         chromeMediaSource: 'desktop',
//       },
  
//     },
//     video: {
//       mandatory: {
//         chromeMediaSource: 'desktop',
//       }
//     },
//   } as MediaStreamConstraints);
//   return audioSource;
// }

// 获取当前程序
const genMediaStreamConstraints = (sourceId: string) => {
  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: sourceId
      }
    },
  };
  return constraints as MediaStreamConstraints;
}
// 混音
const mergeAudioStreams = (desktopStream: MediaStream, voiceStream: MediaStream) => {
  const context = new AudioContext();
  const destination = context.createMediaStreamDestination();
  const hasDesktop = false;
  const hasVoice = false;
  if (desktopStream && desktopStream.getAudioTracks().length > 0) {
    const source1 = context.createMediaStreamSource(desktopStream);
    const desktopGain = context.createGain();
    desktopGain.gain.value = 0.7;
    source1.connect(desktopGain).connect(destination);
  }
  if (voiceStream && voiceStream.getAudioTracks().length > 0) {
    const source2 = context.createMediaStreamSource(voiceStream);
    const voiceGain = context.createGain();
    voiceGain.gain.value = 0.7;
    source2.connect(voiceGain).connect(destination);
  }
  return (hasDesktop || hasVoice) ? destination.stream.getAudioTracks() : [];
};
export const useRecorder = (recorderConst: RecorderConst) => {
  const rcConstRef = useRef(recorderConst);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, toggleRecordingState] = useState(false);
  const [deviceId, saveDeviceId] = useState('');
  const [medOpts, saveMedOpts] = useState<Opt>({} as Opt);
  const [isSaving, toggleSavingState] = useState(false);

  const videoStreamRef = useRef<any>();
  // const desktopAudioStreamRef = useRef<any>();
  const voiceAudioStreamRef = useRef<any>();
  // 初始化录制控制器 & 录制流
  const genRecorderAndStartRecorder = async () => {
    // 构建media相关参数
    const constraints = genMediaStreamConstraints(deviceId);
    // 构建录像视频流
    videoStreamRef.current = await navigator.mediaDevices.getUserMedia(constraints);
    let allTracks = [...videoStreamRef.current.getVideoTracks()];
    if (isWin) {
        // 系统声音
        // desktopAudioStreamRef.current = await getDesktopAudioStream();
        // 麦克风
        voiceAudioStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        // 合并音频流
        allTracks = allTracks.concat(voiceAudioStreamRef.current.getAudioTracks());
    }
    const combinedSource = new MediaStream(allTracks);
    // 构建录像控制器
    recorderRef.current = new MediaRecorder(combinedSource, { mimeType: medOpts.mimeType });
    // 开始录像
    recorderRef.current.start(rcConstRef.current.timeSlice);
  };
  // 数据传输
  const handleDataAcailable = async (event: BlobEvent) => {
    if (event.data) {
      rcConstRef.current.fileBits.push(event.data);
    }
  };
  // 销毁录像控制器，清空录制流
  const recorderDestory = () => {
    if (videoStreamRef.current) {
      const tracks = videoStreamRef.current.getTracks();
      tracks.forEach((track: any) => {
          track.stop();
      });
      if (isWin) {
        // const audioTracks = desktopAudioStreamRef.current.getTracks();
        // audioTracks.forEach((track: any) => {
        //     track.stop();
        // });
        const audio1Tracks = voiceAudioStreamRef.current.getTracks();
        audio1Tracks.forEach((track: any) => {
            track.stop();
        });
      }
      // desktopAudioStreamRef.current = null;
      voiceAudioStreamRef.current = null;
      videoStreamRef.current = null;
      recorderRef.current = null;
    }
    rcConstRef.current.fileBits = [];
    toggleSavingState(false);
  };
  // 录像控制器停止时触发
  const recorderStop = async () => {
    const videoPath = await getVideoPath() as string;
    message.info('视频保存中,请稍等!');
    try {
      let fixBlob = await fixWebmDuration(new Blob(rcConstRef.current.fileBits));
      const result = await writeVideoInPath(fixBlob, videoPath);
      // const result = await writeVideoInPath(
      //   new Blob(rcConstRef.current.fileBits),
      //   videoPath
      // );
      if (result) {
        message.success('视频保存成功!');
        recorderDestory();
      }
    } catch (error: any) {
      message.error(`视频保存失败:${error.message}`);
      // message.error(error);
      recorderDestory();
    }
  };
  // 初始化传输/停止事件
  const initRecorderEvent = async (isAuto?: boolean) => {
    if (recorderRef.current) {
        recorderRef.current.ondataavailable = handleDataAcailable;
        recorderRef.current.onstop = recorderStop.bind(this, isAuto);
        recorderRef.current.onerror = (err: any) => {
          message.error(`recorder.onerror:${err.message}`);
        };
    }
  };
  // 
  const recorderLooper = async () => {
    // 构建录像控制器并开始录像
    await genRecorderAndStartRecorder();
    // 初始化录像控制器相关事件
    initRecorderEvent();
  };
  const handleRecorderClcik = async (medOpts: Opt) => {
    if (isRecording) {
      recorderEnd();
    } else {
      try {
        const curDeviceId = Remote.getCurrentWindow().getMediaSourceId();
        if (curDeviceId) {
            // 获取视频保存路径
            // 保存相关配置进行复用
            saveMedOpts(medOpts);
            saveDeviceId(curDeviceId);
            // 根据recirdubgState状态
            toggleRecordingState(true);
        } else {
          toggleRecordingState(false);
        }
      } catch(error: any) {
        message.error(`handleRecorderClcik:${error.message}`);
      }
    }
  };
  const recorderEnd = async () => {
    // 设置保存中状态
    toggleSavingState(true);
    toggleRecordingState(false);
    if (recorderRef.current) {
      recorderRef.current.stop();
    }
    if (rcConstRef.current.timer) {
      clearTimeout(rcConstRef.current.timer);
    }
  };
  // 开始重新录制
  useEffect(() => {
    async function startLooper() {
      await recorderLooper();
    }
    if (isRecording && !isSaving) {
      startLooper();
    }
  }, [isRecording, isSaving]);

  return {
    isRecording,
    isSaving,
    handleRecorderClcik
  }
}

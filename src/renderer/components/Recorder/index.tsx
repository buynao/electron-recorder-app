
import * as React from "react";
import { Button, message } from "antd";

import { useRecorder } from "./useRecorder";
const recorderConst = {
  slice: 0,
  timeSlice: 5 * 1000,
  mimeType: 'video/webm;codecs=h264',
  timer: 0,
  fileBits: [],
  isSaveing: false,
  timeOut: 0.2 * 60 * 1000,
};

export function Recorder() {
  const { isRecording, handleRecorderClcik, isSaving } = useRecorder(recorderConst as any);
  return (
    <Button
      type="text"
      className="recorder-button"
      loading={isSaving}
      onClick={() => {
        if (isSaving) {
          message.info('视频保存中...');
        } else {
          handleRecorderClcik({
            mimeType: recorderConst.mimeType,
            width: 1200,
            height: 800
          });
        }
      }}
    >{ isSaving ? '保存中...' : isRecording ? '停止录制' : '开始录制' }</Button>
  )
}
 

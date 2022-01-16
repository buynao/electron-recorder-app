import * as React from "react";

export interface Devices {
  videoinputs: MediaDeviceInfo[]
  audiooutputs: MediaDeviceInfo[]
  audioinputs: MediaDeviceInfo[]
}

interface IProps {
  postition: Object;
  video: HTMLVideoElement;
  updateVideoStates: (id: string, video: HTMLVideoElement) => void;
  devices: Devices;
}

export function VideoSourceMenu(props: IProps) {

  const { postition, updateVideoStates, video, devices } = props;

  return (
    <div className="VideoSourceMenuList" style={postition}>
      <ul>
          <li className="first">播放器-{video.getAttribute('index')} - 视频源：</li>
          {
            devices.videoinputs?.map(item => <li
              className="videoSource-item"
              key={item.deviceId}
              value={item.deviceId}
              onClick={() => updateVideoStates(item.deviceId, video)}
              >{item.deviceId === 'default' ? '当前使用：' : null}{item.label}</li>)
          }
      </ul>
    </div>
  )
}
 

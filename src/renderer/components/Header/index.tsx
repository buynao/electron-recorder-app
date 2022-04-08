
import * as React from "react";
const { ipcRenderer } = require('electron')

import "./index.less";
import mixIcon from "./assets/mix.png";
import maxIcon from "./assets/max.png";
import closeIcon from "./assets/close.png";
import playIcon from "./assets/play.png";

const msg = {
  1: 'window-minimize',
  2: 'window-maximize',
  3: 'window-unmaximize',
  4: 'window-close'
} as any;

export function Header({ isHide }: any) {
  const [isFullSize, setWindowFullSize] = React.useState(false);
  const handleClick = (type: number) => {
    const channel = msg[type] as string;
    ipcRenderer.send(channel);
    if (type === 2 || type === 3) {
      setWindowFullSize(!isFullSize);
    }
  }
console.log(isHide);
  return (
    <div className={`Container-Header ${isHide ? 'is-hide' : ''}`}>
      <div className="header-icon">
        <img src={playIcon} alt="直播录制" /> xxx
      </div>
      <div className="header-right">
        <img src={mixIcon} onClick={() => handleClick(1)} alt="最小化" />
        <img src={maxIcon} onClick={() => handleClick(isFullSize ? 3 : 2)} alt="最大化" />
        <img src={closeIcon} onClick={() => handleClick(4)} alt="关闭" />
      </div>
      <div className="header-move-bar"></div>
    </div>
  )
}
 

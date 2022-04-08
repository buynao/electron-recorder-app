import * as React from "react";
import { VideoLayout } from "./components/VideoLayout/index"
import { Header } from "./components/Header";
import { Bottom } from "./components/Bottom";

import "./App.less";

const { useState, useCallback } = React; 

export default function App() {
  const [ showSourceMenu, toggleShowSourceMenu ] = useState(false);
  const [ showModeMenu, toggleShowModeMenu ] = useState(false);
  const [ selectVideo, setSelectVideo ] = useState<HTMLVideoElement | null>(null);
  const [ mode, saveMode ] = useState(1);
  const [ isHide, toggleMenuToolHide ] = useState(false);
  // 关闭所有弹窗
  const hideAllModeMenu = useCallback(async () => {
      console.log('关闭弹窗');
      toggleShowModeMenu(false);
      toggleShowSourceMenu(false);
      setSelectVideo(null);
  }, []);
  // 显示布局模式弹窗
  const showSourceMenuFun = useCallback(() => {
      toggleShowSourceMenu((state) => !state);
  }, []);
  // 选择布局模式
  const saveModeFun = useCallback((mode) => {
      saveMode(mode);
      toggleShowModeMenu(false);
      toggleShowSourceMenu(false);
  }, []);

  return (
    <div className={`Container ${isHide ? 'is-record' : ''}`}>
        <Header isHide={isHide} />
        <VideoLayout
          mode={mode}
          selectVideo={selectVideo}
          setSelectVideo={setSelectVideo}
          showSourceMenuFun={showSourceMenuFun}
          hideAllModeMenu={hideAllModeMenu}
          toggleMenuToolHide={toggleMenuToolHide}
          showSourceMenu={showSourceMenu}
        />
        <Bottom
          mode={mode}
          isHide={isHide}
          showModeMenu={showModeMenu}
          saveModeFun={saveModeFun}
          setSelectVideo={setSelectVideo}
          toggleShowSourceMenu={toggleShowSourceMenu}
          toggleShowModeMenu={toggleShowModeMenu}
        />
    </div>
  )
}
 

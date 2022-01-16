import * as React from "react";
import { VideoLayout } from "./components/VideoLayout/index"
import { ModeMenu } from "./components/ModeMenu";
import { Recorder } from "./components/Recorder";
import { Volume } from "./components/Volume";
import { Header } from "./components/Header";
import { Button } from "antd";

import "./App.less";

const { useState, useCallback } = React;

export default function App() {
  const [ showSourceMenu, toggleShowSourceMenu ] = useState(false);
  const [ showModeMenu, toggleShowModeMenu ] = useState(false);
  const [ selectVideo, setSelectVideo ] = useState<HTMLVideoElement | null>(null);
  const [ mode, saveMode ] = useState(1);
  // 关闭所有弹窗
  const hideAllModeMenu = useCallback(() => {
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
    <div className="Container">
        <Header />
        <VideoLayout
          mode={mode}
          selectVideo={selectVideo}
          setSelectVideo={setSelectVideo}
          showSourceMenuFun={showSourceMenuFun}
          hideAllModeMenu={hideAllModeMenu}
          showSourceMenu={showSourceMenu}
        />
        <div className="cls-Bottom">
          <Button onClick={() => {
            toggleShowModeMenu(true);
            setSelectVideo(null);
            toggleShowSourceMenu(false);
          }}>更改布局</Button>
          <Recorder />
          <Volume />
        </div>
        { showModeMenu ? <ModeMenu
          mode={mode}
          saveMode={saveModeFun}
        /> : null}
    </div>
  )
}
 

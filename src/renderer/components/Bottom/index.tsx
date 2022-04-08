
import * as React from "react";
const { ipcRenderer } = require('electron')

import { ModeMenu } from "../ModeMenu";
import { Recorder } from "../Recorder";
import { Volume } from "../Volume";
import { Button } from "antd";

import "./index.less";
;

export function Bottom({ toggleShowModeMenu, mode, saveModeFun,
  showModeMenu, setSelectVideo, toggleShowSourceMenu, isHide }: any) {

  return (
    <>
      <div className={`Container-Bottom ${isHide ? 'is-hide' : ''}`}>
        <Button className="Container-Bottom-button" onClick={() => {
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
    </>
  )
}
 

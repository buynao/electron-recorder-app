
import * as React from "react";
import mirIcon from "./images/mir.png";
import "./index.less";

const loudness = require('loudness');

const { useRef, useState, useEffect } = React;
let start = {
  x: 0
}
let diff = {
  x: 0
}
export function Volume() {
  const jdtRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const [ vol, setVol ] = useState(0);
  const moveEvent = useRef<any>({
    start: () => {},
    move: () => {},
    up: () => {}
  });
  const isMove = useRef(false);

  useEffect(() => {
    async function getVolume() {
      //  获取当前音量
      const vol = await loudness.getVolume();
      setVol(vol);
    }
    getVolume();
  }, [])

  useEffect(() => {
    moveEvent.current.start = async (e: any) => {
      // 直接设置音量
      if (e.target === processRef.current || e.target === jdtRef.current) {
        const rect = e.target.getBoundingClientRect();
        const x = e.pageX - rect.left;
        setVol(x);
        await loudness.setVolume(x);
      }
      // 拖动设置音量
      if (e.target === dotRef.current) {
        isMove.current = true;
        start.x = e.pageX;
      }
    };
    moveEvent.current.move = (e: any) => {
      if (isMove.current && jdtRef.current) {
        diff.x = e.pageX - start.x;
        let curVol = diff.x + vol;
        curVol = curVol > 100 ? 100 : curVol;
        curVol = curVol < 0 ? 0 : curVol;
        jdtRef.current.style.width = `${curVol}%`;
      }
    }
    moveEvent.current.up = async (e: any) => {
      if (isMove.current && jdtRef.current) {
        isMove.current = false;
        diff.x = e.pageX - start.x;
        let curVol = diff.x + vol;
        curVol = curVol > 100 ? 100 : curVol;
        curVol = curVol < 0 ? 0 : curVol;
        jdtRef.current.style.width = `${curVol}%`;
        setVol(curVol);
        await loudness.setVolume(curVol);
      }
    }
    document.addEventListener('mousedown', moveEvent.current.start)
    document.addEventListener('mousemove', moveEvent.current.move)
    document.addEventListener('mouseup', moveEvent.current.up)
    return () => {
      if (!dotRef.current) {
        return;
      }
      document.removeEventListener('mousedown', moveEvent.current.start)
      document.removeEventListener('mousemove', moveEvent.current.move)
      document.removeEventListener('mouseup', moveEvent.current.up)
    }
  }, [vol])
  return (
      <div className="volume-wrap">
          <img src={mirIcon} alt="mirIcon" />
          <div ref={processRef} className="volume-process">
              <div ref={jdtRef} className="volume-jdt" style={{
                width: `${vol}%`
              }}>
                {vol ? <div className="volume-dot" ref={dotRef}></div> : null }
              </div>
          </div>
      </div>
  )
}
 

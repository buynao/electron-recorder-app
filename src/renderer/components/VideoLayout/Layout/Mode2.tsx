
import { LayoutProps } from "./index";
import { Video } from "../Video";
import * as React from "react";
import { useGetVideoSizeLit4 } from "./hooks/getVideoSize";


export function Mode2(props: LayoutProps) {
  const videoSize = useGetVideoSizeLit4();
  return (
      <div className="PotitionCenter video-wrap2" style={{
        width: videoSize.wrapWidth
      }}>
        <Video
          index={1}
          style={videoSize.normal}
          cls="video1"
          {...props}
        />
        <Video
          index={2}
          style={videoSize.lit}
          cls="video2"
          {...props}
        />
      </div>
    )
}
 



import * as React from "react";
import { LayoutProps } from "./index";
import { Video } from "../Video";
import { useGetVideoSizeFull } from "./hooks/getVideoSize";


export function Mode1(props: LayoutProps) {
  const videoSize = useGetVideoSizeFull();

  return (
      <div className="PotitionCenter video-wrap1" style={{
        width: videoSize.wrapWidth
      }}>
        <Video
          index={1}
          style={videoSize.videoStyle}
          cls="video1"
          {...props}
        />
      </div>
    )
}
 

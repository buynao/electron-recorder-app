
import { LayoutProps } from "./index";
import { Video } from "../Video";
import { useGetVideoSizeLit4 } from "./hooks/getVideoSize";
import * as React from "react";

export function Mode3(props: LayoutProps) {
  const videoSize = useGetVideoSizeLit4();
  return (
      <div className="PotitionCenter video-wrap3" style={{
        width: videoSize.wrapWidth
      }}>
        <Video
          index={1}
          style={videoSize.normal}
          cls="video1"
          {...props}
        />
        <div className="video-flex" style={{
          width: videoSize.lit.width,
          height: videoSize.normal.height,
        }}>
          <Video
            index={2}
            style={videoSize.lit}
            cls="video2"
            {...props}
          />
          <Video
            index={3}
            style={videoSize.lit}
            cls="video3"
            {...props}
          />
        </div>
      </div>
    )
}
 

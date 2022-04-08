
import { LayoutProps } from "./index";
import { Video } from "../Video";
import * as React from "react";
import { useGetVideoSizeLit4 } from "./hooks/getVideoSize";


export function Mode4(props: LayoutProps) {
  const videoSize = useGetVideoSizeLit4();
  return (
      <div className="PotitionCenter video-wrap4" style={{
        width: videoSize.wrapWidth
      }}>
        <Video
          index={1}
          style={videoSize.normal}
          cls="video video1"
          {...props}
        />
       <div className="video-flex" style={{
          width: videoSize.lit.width,
          height: videoSize.normal.height,
        }}>
          <Video
            index={2}
            style={videoSize.lit}
            cls="video video2"
            {...props}
          />
          <Video
            index={3}
            style={videoSize.lit}
            cls="video video3"
            {...props}
          />
          <Video
            index={4}
            style={videoSize.lit}
            cls="video video4"
            {...props}
          />
        </div>
      </div>
    )
}
 

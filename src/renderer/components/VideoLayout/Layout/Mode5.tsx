
import { LayoutProps } from "./index";
import { Video } from "../Video";
import * as React from "react";
import { useGetVideoSize5 } from "./hooks/getVideoSize";


export function Mode5(props: LayoutProps) {
  const videoSize = useGetVideoSize5();
  return (
      <div className="PotitionCenter video-wrap5" style={{
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
          <Video
            index={5}
            style={videoSize.lit}
            cls="video video5"
            {...props}
          />
        </div>
      </div>
    )
}
 

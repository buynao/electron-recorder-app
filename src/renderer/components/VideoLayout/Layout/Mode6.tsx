
import { LayoutProps } from "./index";
import { Video } from "../Video";
import * as React from "react";
import { useGetVideoSizeLit7 } from "./hooks/getVideoSize";


export function Mode6(props: LayoutProps) {
  const videoSize = useGetVideoSizeLit7();
  return (
      <div className="PotitionCenter video-wrap6" style={{
        width: videoSize.wrapWidth
      }}>
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
            index={5}
            style={videoSize.lit}
            cls="video video2"
            {...props}
          />
          <Video
            index={6}
            style={videoSize.lit}
            cls="video video3"
            {...props}
          />
        </div>
      </div>
    )
}
 

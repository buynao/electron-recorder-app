
import { LayoutProps } from "./index";
import { Video } from "../Video";
import { useGetVideoSize8 } from "./hooks/getVideoSize";
import * as React from "react";


export function Mode8(props: LayoutProps) {
  const videoSize = useGetVideoSize8();
  return (
      <div className="PotitionCenter video-wrap8" style={{
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
          <Video
            index={5}
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
            index={6}
            style={videoSize.lit}
            cls="video video2"
            {...props}
          />
          <Video
            index={7}
            style={videoSize.lit}
            cls="video video3"
            {...props}
          />
          <Video
            index={8}
            style={videoSize.lit}
            cls="video video3"
            {...props}
          />
          <Video
            index={9}
            style={videoSize.lit}
            cls="video video3"
            {...props}
          />
        </div>
      </div>
    )
}
 

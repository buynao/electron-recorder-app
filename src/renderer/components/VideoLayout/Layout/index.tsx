
import * as React from "react";
import { Mode1 } from "./Mode1";
import { Mode2 } from "./Mode2";
import { Mode3 } from "./Mode3";
import { Mode4 } from "./Mode4";
import { Mode5 } from "./Mode5";
import { Mode6 } from "./Mode6";
import { Mode7 } from "./Mode7";
import { Mode8 } from "./Mode8";
import { VideoStateProps } from "../hooks/useGetVideoPlayerState";
import "./style.less";

export interface LayoutProps {
  mode?: number;
  handleVideoClick: (e: any, index: number) => void;
  handleVideoWrapClick: (e: any, video: HTMLVideoElement | null) => void;
  videoPlayState: VideoStateProps[];
  selectVideo: HTMLVideoElement | null;
  updateVideoStates: (id: string, video: HTMLVideoElement) => void;
}

export const LayoutMode = (props: LayoutProps) => {
  const { mode } = props;
  switch (mode) {
    case 1:
      return <Mode1 {...props }/>;
    case 2:
      return <Mode2 {...props }/>;
    case 3:
      return <Mode3 {...props }/>;
    case 4:
      return <Mode4 {...props }/>;
    case 5:
      return <Mode5 {...props }/>;
    case 6:
      return <Mode6 {...props }/>;
    case 7:
      return <Mode7 {...props }/>;
    case 8:
      return <Mode8 {...props }/>;
    default:
      return <Mode1 {...props }/>;
  }
}
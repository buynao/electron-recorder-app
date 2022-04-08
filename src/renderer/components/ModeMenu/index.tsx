
import * as React from "react";
import m1 from "./img/1.png";
import m2 from "./img/2.png";
import m3 from "./img/3.png";
import m4 from "./img/4.png";
import m5 from "./img/5.png";
import m6 from "./img/6.png";
import m7 from "./img/7.png";
import m8 from "./img/8.png";
import "./index.less";

interface IProps {
  mode: number;
  saveMode: (index: number) => void;
}

const menuList = [
  m1, m2, m3, m4, m5, m6, m7, m8
]

export function ModeMenu(props: IProps) {
  const { saveMode, mode } = props;
  
  return (
      <ul className="ModeMenuList">
        {
          menuList.map((item, index) => <li
            key={index}
            className={`menu-item ${mode - 1 === index ? 'select' : ''}`}
            onClick={() => saveMode(index + 1)}>
              <img className="mode-img" src={item} alt={`布局${index}`} />
              {index + 1}
          </li>)
        }
      </ul>
  )
}
 

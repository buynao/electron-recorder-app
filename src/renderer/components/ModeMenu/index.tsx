
import * as React from "react";


interface IProps {
  mode: number;
  saveMode: (index: number) => void;
}

const menuList = [
  'mode1',
  'mode2',
  'mode3',
  'mode4',
  'mode5',
  'mode6',
  'mode7',
  'mode8',
]

export function ModeMenu(props: IProps) {
  const { saveMode, mode } = props;
  
  return (
      <ul className="ModeMenuList">
        {
          menuList.map((item, index) => <li
            key={item}
            className={`menu-item ${mode - 1 === index ? 'select' : ''}`}
            onClick={() => saveMode(index + 1)}>{item}
          </li>)
        }
      </ul>
  )
}
 

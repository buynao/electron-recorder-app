import * as React from "react";

const Remote = require('@electron/remote');

const { useMemo } = React;

export const useToolsShowEvent = (toggleMenuToolHide: any, handleLayoutClick: any) => {
    // 显示上下工具栏
    const showTool = () => {
      toggleMenuToolHide(false);
    }
    // 隐藏上下工具栏
    const hideTool = () => {
      toggleMenuToolHide(true);
    }
  // 菜单模板
  const menuTemplate = [
    {
      label: '显示工具栏',
      click(){
        showTool();
      }
    },
    {
      label: '隐藏工具栏',
      click() {
        hideTool()
      } 
    },
    {
      label: '背景图片上传',
      click() {
        handleLayoutClick(false, true)
      } 
    }
  ];
// 构建菜单项
  const menu = useMemo(() => {
    return Remote.Menu.buildFromTemplate(menuTemplate)
  }, []);
  return () => {
    menu.popup({
      // 获取网页所属的窗口
      window: Remote.getCurrentWindow()
    })
  };
}
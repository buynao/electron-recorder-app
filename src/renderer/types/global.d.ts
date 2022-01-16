import { createElement } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> {
    index?: number;
    deviceid?: String;
  }
}
export default createElement
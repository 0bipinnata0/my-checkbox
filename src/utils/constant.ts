/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from "./pick";

export const NOOP = () => {};

export function newArray(length: number) {
  return [...Array(length)];
}

export function pickTriggerPropsFromRest(rest: Record<any, any>) {
  return pick(rest, [
    "onMouseEnter",
    "onMouseLeave",
    "onMouseMove",
    "onContextMenu",
    "onClick",
    "onFocus",
    "onBlur",
    "tabIndex",
  ]);
}

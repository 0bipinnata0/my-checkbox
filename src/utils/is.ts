import { Dayjs } from "dayjs";

const opt = Object.prototype.toString;

export function isArray(obj: unknown): obj is unknown[] {
  return opt.call(obj) === "[object Array]";
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return opt.call(obj) === "[object Object]";
}

export function isString(obj: unknown): obj is string {
  return opt.call(obj) === "[object String]";
}

export function isNumber(obj: unknown): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj; // eslint-disable-line
}

export function isRegExp(obj: unknown) {
  return opt.call(obj) === "[object RegExp]";
}

export function isFile(obj: unknown): obj is File {
  return opt.call(obj) === "[object File]";
}

export function isBlob(obj: unknown): obj is Blob {
  return opt.call(obj) === "[object Blob]";
}

function isHex(color: string) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color);
}

function isRgb(color: string) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color);
}

function isRgba(color: string) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color);
}
export function isColor(color: unknown): boolean {
  return isString(color) && (isHex(color) || isRgb(color) || isRgba(color));
}
export function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined;
}

export function isNull(obj: unknown): obj is null {
  return obj === null;
}

export function isNullOrUndefined(obj: unknown): boolean {
  return obj === null || obj === undefined;
}

export function isFunction(
  obj: unknown
): obj is (...args: unknown[]) => unknown {
  return typeof obj === "function";
}

export function isEmptyObject(obj: unknown): boolean {
  return isObject(obj) && Object.keys(obj).length === 0;
}

export function isEmptyReactNode(content: unknown, trim?: boolean): boolean {
  if (content === null || content === undefined || content === false) {
    return true;
  }
  if (
    typeof content === "string" &&
    (trim ? content.trim() === "" : content === "")
  ) {
    return true;
  }
  return false;
}

export function isExist(obj: unknown): boolean {
  return !!(obj || obj === 0);
}

export function isWindow(el: unknown): el is Window {
  return el === window;
}

export function isDayjs(time: unknown): time is Dayjs {
  // dayjs.isDayjs 在实际应用场景，比如多个版本的 dayjs 会失效
  return (
    isObject(time) &&
    !!(
      ("$y" in time &&
        "$M" in time &&
        "$D" in time &&
        "$d" in time &&
        "$H" in time &&
        "$m" in time &&
        "$s" in time) ||
      time._isAMomentObject
    ) // 兼容 moment 的验证
  );
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

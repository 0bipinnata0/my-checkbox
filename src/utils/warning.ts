export default function warning(condition: unknown, message: string) {
  if (process.env.NODE_ENV !== "production" && console) {
    if (condition) {
      console.error(`[@arco-design/web-react]: ${message}`);
    }
  }
}

import { serverError, serverInfo, serverLog, serverWarn } from "./wrappers";

// This is simply a Logger class that uses the server-side logging functions from "./wrappers".
class Logger {
  static async log(message: string) {
    await serverLog(message);
  }

  static async warn(message: string) {
    await serverWarn(message);
  }

  static async error(message: string) {
    await serverError(message);
  }

  static async info(message: string) {
    await serverInfo(message);
  }
}

export default Logger;

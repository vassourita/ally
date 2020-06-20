import { format } from 'date-fns';

export default class Logger {
  static info(message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[34m[${now}]\x1b[0m ${message}`);
  }
  static success(message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[32m[${now}]\x1b[0m ${message}`);
  }
  static error(message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[31m[${now}]\x1b[0m ${message}`);
  }
}

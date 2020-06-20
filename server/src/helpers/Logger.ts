import { format } from 'date-fns';

export default class Logger {
  static info(title: string, message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[34m[${now}] ${title}\x1b[0m ${message}`);
  }
  static success(title: string, message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[32m[${now}] ${title}\x1b[0m ${message}`);
  }
  static error(title: string, message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[31m[${now}] ${title}\x1b[0m ${message}`);
  }
  static warn(title: string, message: string) {
    const now = format(new Date(), 'hh:mm:ss');
    console.info(`\x1b[33m[${now}] ${title}\x1b[0m ${message}`);
  }
}

export class DateHelper {
  static diffDateToNow(date: Date): string {
    return Math.abs((date.getTime() - Date.now()) / 31536000000).toFixed(0);
  }
}

export class DateHelper {
  static diffDateToNow(date: Date): string {
    return Math.abs((date.getTime() - Date.now()) / 31536000000).toFixed(0);
  }
}

console.log(DateHelper.diffDateToNow(new Date('1 January 2000')));

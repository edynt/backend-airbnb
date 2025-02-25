export class ResponseDTO<T> {
  statusCode: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(JSON.stringify(this));
  }
}

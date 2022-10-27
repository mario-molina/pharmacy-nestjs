import { HttpStatus } from '@nestjs/common';

export class ServiceResponse {
  private success: boolean;
  private code: number;
  private message: string;
  private data: any;

  constructor() {
    this.success = true;
    this.code = HttpStatus.OK;
    this.message = '';
    this.data = null;
  }

  setSuccess(success: boolean) {
    this.success = success;
  }

  isSuccessful() {
    return this.success;
  }

  setCode(code: number) {
    this.code = code;
  }

  getCode(): number {
    return this.code;
  }

  setMessage(message: string) {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}

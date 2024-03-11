export interface ResponseObject {
  status: string;
  message: string;
  data?: object | number;
  errors?: object | string;
}
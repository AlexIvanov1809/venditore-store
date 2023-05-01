import { AxiosError } from 'axios';

const UNEXPECTED = 'Непредвиденная ошибка';

export default function makeErrorMsg(error: unknown): string {
  if (error instanceof AxiosError) {
    if (typeof error.response === 'undefined') {
      return UNEXPECTED;
    }
    if (typeof error.response.data === 'string') {
      return error.response.data;
    }
    if (typeof error.response.data.message === 'string') {
      return error.response.data.message;
    }
    return UNEXPECTED;
  }
  return UNEXPECTED;
}

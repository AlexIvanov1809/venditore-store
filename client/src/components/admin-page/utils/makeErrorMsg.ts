export default function makeErrorMsg(error: any): string {
  return typeof error.response.data === 'string' ? error.response.data : error.response.data.message;
}

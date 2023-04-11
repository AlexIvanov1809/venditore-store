import { $host } from './index';

const ENDPOINT = 'api/v1/order';

export const sendOrder = async (message: string) => {
  const { data } = await $host.post(`${ENDPOINT}/`, { message });
  console.log(data);
  return data;
};

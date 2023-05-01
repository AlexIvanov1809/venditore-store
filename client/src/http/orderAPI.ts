import { $host } from './index';

const ENDPOINT = 'order';

const sendOrder = async (message: string) => {
  const { data } = await $host.post(`${ENDPOINT}/`, { message });

  return data;
};

export default sendOrder;

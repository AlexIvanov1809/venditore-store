import { IOrder } from '@/types/basketTypes';

export default function messageConverter(data: IOrder): string {
  let message = `${data.name}\n${data.phone}\n${data.address}\n${data.comments ? `\n${data.comments}\n` : ''}`;

  data.items.forEach((i, v) => {
    message += `\n${v + 1}.  ${i.brand} ${i.name} ${i.weight}. ${i.beans ? `${i.beans} ` : ''}${i.quantity} шт. ${
      i.value
    } руб.`;
  });

  message += `\n\nИтого: ${data.total} руб.`;

  return message;
}

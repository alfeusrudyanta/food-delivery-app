type OrderType = {
  display: string;
  value: string;
};

const orderType: OrderType[] = [
  { display: 'Preparing', value: 'preparing' },
  { display: 'On the Way', value: 'on_the_way' },
  { display: 'Delivered', value: 'delivered' },
  { display: 'Done', value: 'done' },
  { display: 'Canceled', value: 'cancelled' },
];

export default orderType;

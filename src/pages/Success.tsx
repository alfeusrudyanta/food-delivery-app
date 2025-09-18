import { Button } from '@/components/ui/button';
import { useMyOrder, useOrder } from '@/hooks/useOrder';
import formatCurrency from '@/lib/formatCurrency';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  const { orders } = useMyOrder({ status: undefined });
  const { updateOrderStatus } = useOrder();

  useEffect(() => {
    setTimeout(() => {
      updateOrderStatus({
        id: orders?.data.orders[0].id ?? 0,
        data: { status: 'on_the_way' },
      });
    }, 10000);

    setTimeout(() => {
      updateOrderStatus({
        id: orders?.data.orders[0].id ?? 0,
        data: { status: 'done' },
      });
    }, 10000);
  }, [orders, updateOrderStatus]);

  return (
    <section className='min-h-full px-4 md:px-[500px] flex justify-center items-center flex-col gap-[28px]'>
      {/* Title */}
      <div className='flex flex-row gap-4 items-center mt-28'>
        <img src='/icon/logo.svg' alt='logo' height={42} width={42} />
        <span className='font-extrabold text-display-md text-neutral-950'>
          Foody
        </span>
      </div>

      {/* Bill */}
      <div className='flex flex-col rounded-[16px] p-4 md:p-5 gap-4 bg-white shadow-[0_0_20px_0_#CBCACA40] w-full max-w-[430px]'>
        {/* Order Success */}
        <div className='flex flex-col items-center justify-center gap-[2px]'>
          <img
            src='/icon/success-check.svg'
            alt='Success Icon'
            height={64}
            width={64}
          />
          <span className='font-extrabold text-lg md:text-xl text-neutral-950'>
            Payment Success
          </span>
          <span className='font-regular text-sm md:text-md text-neutral-950'>
            Your payment has been successfully processed.
          </span>
        </div>

        {/* Line */}
        <div className='w-full border border-neutral-300 border-dashed' />

        {/* Date */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Date
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {dayjs(orders?.data.orders[0].createdAt).format(
              'DD MMMM YYYY, HH:mm'
            )}
          </span>
        </div>

        {/* Date */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Payment Method
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {orders?.data.orders[0].paymentMethod}
          </span>
        </div>

        {/* Total Item */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Price ( {orders?.data.orders[0].restaurants[0].items.length} item
            {orders &&
              orders?.data.orders[0].restaurants[0].items.length > 1 &&
              's'}
            )
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {formatCurrency(orders?.data.orders[0].pricing.subtotal ?? 0)}
          </span>
        </div>

        {/* Delivery Fee */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Delivery Fee
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {formatCurrency(10000)}
          </span>
        </div>

        {/* Service Fee */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Service Fee
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {formatCurrency(1000)}
          </span>
        </div>

        {/* Line */}
        <div className='w-full border border-neutral-300 border-dashed' />

        {/* Delivery Fee */}
        <div className='flex items-center justify-between'>
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            Total
          </span>
          <span className='font-bold text-sm md:text-md text-neutral-950'>
            {formatCurrency(orders?.data.orders[0].pricing.totalPrice ?? 11000)}
          </span>
        </div>

        {/* See Order */}
        <Link to='/order'>
          <Button className='h-11 md:h-12'>See My Orders</Button>
        </Link>
      </div>
    </section>
  );
};

export default Success;

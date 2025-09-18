import useCartWithOptimistic from '@/hooks/useCartWithOptimistic';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button } from './ui/button';
import formatCurrency from '@/lib/formatCurrency';
import type { RestaurantCart } from '@/types/cart';

type CartCardProps = {
  handleCheckout?: () => void;
  data: RestaurantCart;
  isCheckout?: boolean;
};

const CartCard: React.FC<CartCardProps> = ({
  handleCheckout,
  data,
  isCheckout = false,
}) => {
  const { optimisticUpdateItem, optimisticRemoveItem } =
    useCartWithOptimistic();

  return (
    <div className='flex flex-col gap-3 md:gap-5 p-4 md:p-5 rounded-[16px] bg-white shadow-[0_0_20px_0_#CBCACA40]'>
      {/* Restaurant Detail */}

      <Link to={`/restaurant/${data.restaurant.id}`}>
        <div className='group flex gap-1 md:gap-2 items-center'>
          <img src='/icon/cart-restaurant-icon.svg' alt='Cart Icon' />
          <span className='font-bold text-md md:text-lg text-neutral-950 group-hover:text-primary-100 cursor-pointer'>
            {data.restaurant.name} &gt;
          </span>
        </div>
      </Link>

      {/* Menu List */}
      <div className='flex flex-col gap-3 md:gap-5'>
        {data.items.map((item) => {
          const handleUpdatePlusItem = () => {
            const newQuantity = item.quantity + 1;
            optimisticUpdateItem(
              data.restaurant.id,
              item.menu.id,
              newQuantity,
              item.id
            );
          };

          const handleUpdateMinusItem = () => {
            const newQuantity = item.quantity - 1;
            optimisticUpdateItem(
              data.restaurant.id,
              item.menu.id,
              newQuantity,
              item.id
            );
          };

          const handleDeleteItem = () => {
            optimisticRemoveItem(data.restaurant.id, item.menu.id, item.id);
          };

          return (
            <div className='flex items-center justify-between group'>
              {/* Menu Name */}
              <div className='flex gap-4 items-center'>
                <img
                  src={item.menu.image}
                  alt='Food Imgae'
                  onError={(e) => {
                    e.currentTarget.src = '/images/home-front.png';
                  }}
                  className='h-16 w-16 md:h-20 md:w-20 rounded-[12px] object-center object-cover'
                />

                <div className='flex flex-col overflow-hidden'>
                  <span className='font-medium text-sm md:text-md text-neutral-950 group-hover:text-primary-100 truncate line-clamp-1'>
                    {item.menu.foodName}
                  </span>
                  <span className='font-extrabold text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                    {formatCurrency(item.menu.price)}
                  </span>
                </div>
              </div>

              {/* Handle Quantity */}
              <div className='flex items-center gap-4'>
                <Button
                  variant='blank'
                  size='blank'
                  className='flex justify-center items-center size-9 md:size-10 rounded-full border border-neutral-300 font-extrabold text-neutral-950'
                  onClick={
                    item.quantity === 1
                      ? () => handleDeleteItem()
                      : () => handleUpdateMinusItem()
                  }
                >
                  -
                </Button>
                <p className='font-semibold text-md text-neutral-950 group-hover:text-primary-100'>
                  {item.quantity}
                </p>
                <Button
                  variant='blank'
                  size='blank'
                  className='flex justify-center items-center size-9 md:size-10 rounded-full border border-primary-100 bg-primary-100 font-extrabold text-white'
                  onClick={() => handleUpdatePlusItem()}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {isCheckout === false && (
        <>
          {/* Line */}
          <div className='w-full border border-neutral-300 border-dashed' />

          {/* Total */}
          <div className='flex flex-col md:flex-row md:justify-between gap-4 md:items-center'>
            <div className='flex flex-col'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Total
              </span>
              <span className='font-extrabold text-lg md:text-xl text-neutral-950'>
                {formatCurrency(data.subtotal)}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className='h-11 md:h-12 md:max-w-[240px]'
            >
              Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartCard;

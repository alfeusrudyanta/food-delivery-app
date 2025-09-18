import useCart from '@/hooks/useCart';
import useCartWithOptimistic from '@/hooks/useCartWithOptimistic';
import formatCurrency from '@/lib/formatCurrency';
import type { MenuItem } from '@/types/cart';
import type { GetRestoIdRes } from '@/types/restaurant';
import React from 'react';
import { Button } from './ui/button';

type MenuCardProps = {
  menu: MenuItem;
  restoId: number;
  restoData: GetRestoIdRes | undefined;
};

const MenuCard: React.FC<MenuCardProps> = ({ menu, restoId, restoData }) => {
  const { cart, loading } = useCart();
  const { optimisticAddItem, optimisticUpdateItem, optimisticRemoveItem } =
    useCartWithOptimistic();

  const currentQuantity = cart?.data.cart
    .flatMap((resto) => resto.items)
    .find((item) => item.menu.id === menu.id)?.quantity;

  const handleAddItem = () => {
    if (restoId && restoData) {
      optimisticAddItem(
        {
          restaurantId: restoId,
          menuId: menu.id,
          quantity: 1,
        },
        { id: restoId, name: menu.foodName, logo: restoData?.data.logo },
        {
          foodName: menu.foodName,
          id: menu.id,
          image: menu.image,
          price: menu.price,
          type: menu.type,
        }
      );
    }
  };

  const handleUpdatePlusItem = () => {
    const cartItem = cart?.data.cart
      .flatMap((resto) => resto.items)
      .find((item) => item.menu.id === menu.id);

    if (cartItem) {
      const newQuantity = cartItem.quantity + 1;
      optimisticUpdateItem(restoId, menu.id, newQuantity, cartItem.id);
    } else {
      console.log(restoId, menu.id);
    }
  };

  const handleUpdateMinusItem = () => {
    const cartItem = cart?.data.cart
      .flatMap((resto) => resto.items)
      .find((item) => item.menu.id === menu.id);

    if (cartItem) {
      const newQuantity = cartItem.quantity - 1;
      optimisticUpdateItem(restoId, menu.id, newQuantity, cartItem.id);
    }
  };

  const handleDeleteItem = () => {
    const cartItem = cart?.data.cart
      .flatMap((resto) => resto.items)
      .find((item) => item.menu.id === menu.id);

    if (cartItem) {
      optimisticRemoveItem(restoId, menu.id, cartItem.id);
    }
  };
  return (
    <div
      key={menu.id}
      className='group bg-white shadow-[0_0_20px_0_rgba(203,202,202,0.25)] rounded-[16px] flex flex-col overflow-hidden h-[305px] md:h-[380px]'
    >
      {/* Image */}
      <div className='flex-3 overflow-hidden'>
        <img
          src={menu.image}
          alt={menu.foodName}
          onError={(e) => {
            e.currentTarget.src = '/images/home-front.png';
          }}
          className='h-full w-full group-hover:scale-105 transition-all duration-300 ease-in-out object-center object-cover'
        />
      </div>

      {/* Detail */}
      <div className='flex-2 md:flex-1 p-3 md:p-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center'>
        {/* Menu & Price */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          <p className='font-medium text-sm md:text-md text-neutral-950 group-hover:text-primary-100 truncate'>
            {menu.foodName}
          </p>
          <p className='font-extrabold text-md md:text-lg text-neutral-950 group-hover:text-primary-100'>
            {formatCurrency(menu.price)}
          </p>
        </div>

        {/* Button */}
        {cart?.data.cart.some((resto) =>
          resto.items.some((item) => item.menu.id === menu.id)
        ) ? (
          <div className='flex gap-4 items-center flex-1 max-h-[36px] md:max-h-[40px]'>
            <Button
              variant='blank'
              size='blank'
              disabled={loading.deleteCart || loading.deleteCart}
              className='flex justify-center items-center size-9 md:size-10 rounded-full border border-neutral-300 font-extrabold text-neutral-950'
              onClick={
                currentQuantity === 1
                  ? () => handleDeleteItem()
                  : () => handleUpdateMinusItem()
              }
            >
              -
            </Button>
            <p className='font-semibold text-md text-neutral-950 group-hover:text-primary-100'>
              {currentQuantity}
            </p>
            <Button
              variant='blank'
              size='blank'
              disabled={loading.deleteCart || loading.deleteCart}
              className='flex justify-center items-center size-9 md:size-10 rounded-full border border-primary-100 bg-primary-100 font-extrabold text-white'
              onClick={() => handleUpdatePlusItem()}
            >
              +
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleAddItem()}
            className='flex-1 md:max-w-[80px] max-h-[36px] md:max-h-[40px]'
          >
            Add
          </Button>
        )}
      </div>
    </div>
  );
};

export default MenuCard;

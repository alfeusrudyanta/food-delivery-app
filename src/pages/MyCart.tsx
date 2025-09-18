import React from 'react';
import useCart from '@/hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CartCard from '@/components/CartCard';

const MyCart: React.FC = () => {
  const { cart, deleteCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className='px-4 md:px-[320px] pt-20 md:pt-[128px] pb-10 md:pb-[100px] flex flex-col gap-4 md:gap-8 bg-neutral-25'>
      <span className='font-extrabold text-display-xs md:text-display-md text-neutral-950'>
        My Cart
      </span>

      {/* Cart List */}
      <div className='flex flex-col gap-5'>
        {cart?.data.cart.length === 0 && (
          <div className='flex flex-col items-center justify-center gap-6 md:gap-8 mt-24 text-center'>
            <div className='bg-neutral-50 rounded-[16px] flex flex-col items-center gap-2 w-full md:w-[400px]'>
              <img
                src='/images/cart-empty.png'
                alt='Empty Cart'
                className='h-[180px] md:h-[220px] object-contain'
              />
              <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                Your cart is empty
              </span>
              <p className='text-neutral-500 text-sm md:text-md'>
                Looks like you haven’t added anything yet.
                <br />
                Let’s get you started!
              </p>
              <Link className='w-full' to='/'>
                <Button className='max-w-[400px]'>Browse Products </Button>
              </Link>
            </div>
          </div>
        )}

        {cart?.data.cart.map((resto) => {
          const handleCheckOut = () => {
            cart.data.cart.forEach((restaurantCart) => {
              if (restaurantCart.restaurant.id !== resto.restaurant.id) {
                restaurantCart.items.forEach((item) => {
                  deleteCart(item.id);
                });
              }
            });

            navigate('/checkout');
          };

          return (
            <CartCard
              key={resto.restaurant.id}
              data={resto}
              handleCheckout={handleCheckOut}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MyCart;

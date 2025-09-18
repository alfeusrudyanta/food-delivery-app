import { Button } from '@/components/ui/button';
import useCart from '@/hooks/useCart';
import React, { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import CartCard from '@/components/CartCard';
import bankMenu from '@/constant/checkout-bank-menu';
import formatCurrency from '@/lib/formatCurrency';
import { useOrder } from '@/hooks/useOrder';
import { useNavigate } from 'react-router-dom';

const CheckOut: React.FC = () => {
  const { profile } = useAuth();
  const { cart } = useCart();
  const { addOrder, loading } = useOrder();
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = useState<string>(
    'Bank Negara Indonesia'
  );

  const handleCheckout = () => {
    const data = {
      paymentMethod: selectedBank,
      deliveryAddress: 'Jl. Sudirman No. 25, Jakarta Pusat, 10220',
      notes: 'Please ring the doorbell',
    };

    addOrder(data);
    navigate('/success');
  };

  return (
    <section className='px-4 md:px-[220px] pt-20 md:pt-[128px] pb-12 md:pb-[100px] flex flex-col gap-4 md:gap-8 bg-neutral-25'>
      <span className='font-extrabold text-display-xs md:text-display-md text-neutral-950'>
        Checkout
      </span>

      <div className='flex flex-col md:flex-row gap-4 md:gap-5'>
        {/* Column 1 */}
        <div className='md:flex-3 flex flex-col gap-4 md:gap-5 w-full'>
          {/* Map */}
          <div className='p-4 flex flex-col gap-4 md:gap-5 w-full bg-white rounded-[16px] shadow-[0_0_20px_0_#CBCACA40]'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <img
                  src='/icon/home-location.svg'
                  alt='Location Icon'
                  className='h-6 w-6 md:h-8 md:w-8'
                />
                <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                  Delivery Address
                </span>
              </div>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Jl. Sudirman No. 25, Jakarta Pusat, 10220
              </span>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                {profile?.data.phone}
              </span>
            </div>

            <Button
              variant='blank'
              size='blank'
              className='h-9 md:h-10 w-[120px] border border-neutral-300 rounded-[100px] gap-2 p-2 font-bold text-sm md:text-md text-neutral-950'
            >
              Change
            </Button>
          </div>

          {/* Cart Item */}
          <div>
            {cart?.data.cart.map((resto) => (
              <CartCard data={resto} isCheckout={true} />
            ))}
          </div>
        </div>

        {/* Column 2 */}
        <div className='md:flex-2 p-4 md:p-5 flex flex-col gap-3 md:gap-4 bg-white rounded-[16px] shadow-[0_0_20px_0_#CBCACA40]'>
          <span className='font font-extrabold text-md md:text-lg text-neutral-950'>
            Payment Method
          </span>

          <div className='flex flex-col gap-3 md:gap-4'>
            {/* Bank */}
            {bankMenu.map((bank, index) => (
              <div key={bank.name} className='flex flex-col gap-3 md:gap-4'>
                <div className='flex gap-2 items-center'>
                  <img src={bank.image} alt='Bank Logo' />
                  <span className='font-regular text-sm md:text-md text-neutral-950 w-full truncate overflow-hidden'>
                    {bank.name}
                  </span>

                  <input
                    type='radio'
                    name='distance'
                    value={bank.name}
                    disabled={loading.addOrder}
                    checked={selectedBank === bank.name}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className='h-5 w-5 accent-primary-100'
                  />
                </div>

                {/* Line */}
                {index + 1 < bankMenu.length && (
                  <div className='w-full border border-neutral-300' />
                )}
              </div>
            ))}
          </div>

          {/* Line */}
          <div className='w-full border border-neutral-300 border-dashed' />

          {/* Summary */}
          <div className='flex flex-col gap-3 md:gap-4'>
            <span className='font-extrabold text-md md:text-lg text-neutral-950'>
              Payment Summary
            </span>
            {/* Price */}
            <div className='flex justify-between items-center gap-4'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Price ({cart?.data.summary.totalItems} item
                {cart && cart?.data.summary.totalItems > 2 && 's'})
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {formatCurrency(cart?.data.summary.totalPrice ?? 0)}
              </span>
            </div>

            {/* Delivery Fee */}
            <div className='flex justify-between items-center gap-4'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Delivery Fee
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {formatCurrency(10000)}
              </span>
            </div>

            {/* Service Fee */}
            <div className='flex justify-between items-center gap-4'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Service Fee
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {formatCurrency(1000)}
              </span>
            </div>

            {/* Service Fee */}
            <div className='flex justify-between items-center gap-4'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Total
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {formatCurrency(
                  (cart?.data.summary.totalPrice ?? 0) + 10000 + 1000
                )}
              </span>
            </div>
          </div>

          <Button
            disabled={loading.addOrder}
            onClick={handleCheckout}
            className='h-11 md:h-12'
          >
            {loading.addOrder ? (
              <div className='h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto' />
            ) : (
              'Buy'
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;

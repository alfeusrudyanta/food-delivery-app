import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import orderType from '@/constant/order-status';
import { cn } from '@/lib/utils';
import { Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyOrder } from '@/hooks/useOrder';
import type { DeliveryStatus } from '@/types/order';
import formatCurrency from '@/lib/formatCurrency';
import { useReview, useMyReview } from '@/hooks/useReview';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Order = () => {
  const { addReview } = useReview();
  const { data } = useMyReview({
    page: 1,
    limit: 50,
  });

  const [status, setStatus] = useState<DeliveryStatus>(undefined);
  const [page, setPage] = useState<number>(1);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [star, setStar] = useState<number>(5);
  const [comment, setComment] = useState<string>('');

  const { orders } = useMyOrder({
    status,
    page,
    limit: 10,
  });

  useEffect(() => {
    setPage(1);
  }, [status]);

  return (
    <section className='px-4 md:px-[220px] pt-20 md:pt-[128px] pb-12 md:pb-[100px] flex md:gap-8 bg-neutral-25 min-h-[600px]'>
      {/* Profile Card */}
      <ProfileCard />

      {/* Order */}
      <div className='flex flex-col gap-4 md:gap-6 w-full'>
        <span className='font-extrabold text-display-xs md:text-display-md text-neutral-950'>
          My Orders
        </span>
        <div className='bg-white rounded-[16px] shadow-[0_0_20px_0_#CBCACA40] w-full p-4 gap-5 md:p-6 flex flex-col'>
          {/* Search Bar */}
          <div className='relative'>
            <Input
              placeholder='Search'
              className='px-[42px] h-11 md:h-12 max-w-[600px] w-full font-medium text-sm md:text-md text-neutral-950 rounded-full'
            />
            <Search
              height={20}
              width={20}
              className='absolute -translate-y-1/2 top-1/2 left-[14px] text-neutral-500 cursor-pointer'
            />
          </div>

          {/* Status List */}
          <div className='flex gap-2 md:gap-3 items-center'>
            <span className='font-bold text-sm md:text-lg text-neutral-950'>
              Status
            </span>

            <div className='flex gap-2 md:gap-3 items-center overflow-x-auto'>
              {orderType.map((type) => (
                <Button
                  variant='blank'
                  size='blank'
                  key={type.value}
                  value={type.value}
                  onClick={() => setStatus(type.value as DeliveryStatus)}
                  className={cn(
                    'px-4 border border-neutral-300 rounded-[100px] h-10 md:h-[46px] hover:text-primary-100 hover:border-primary-100 ',
                    status === type.value &&
                      'text-primary-100 border-primary-100 bg-[#FFECEC]'
                  )}
                >
                  {type.display}
                </Button>
              ))}
            </div>
          </div>

          {/* Order List */}
          <div className='flex flex-col gap-5'>
            {orders?.data.orders.map((order) => {
              const addReviewParams = {
                transactionId: order.transactionId,
                restaurantId: order.restaurants[0].restaurantId,
                star: star,
                comment: comment,
              };

              const handleAddReview = () => {
                addReview(addReviewParams);
                setIsOpen(false);
                setStar(5);
                setComment('');
              };

              return (
                <div
                  key={order.id}
                  className='bg-white shadow-[0_0_20px_0_#CBCACA40] rounded-[16px] p-4 md:p-5 flex flex-col gap-4 md:gap-5'
                >
                  {order.restaurants.map((resto) => (
                    <div
                      key={resto.restaurantId}
                      className='flex flex-col gap-3 md:gap-4'
                    >
                      {/* Restaurant */}
                      <Link to={`/restaurant/${resto.restaurantId}`}>
                        <div className='flex items-center gap-2'>
                          <img
                            src='/icon/home-all-food.svg'
                            alt='Restaurant'
                            height={32}
                            width={32}
                          />
                          <span className='font-bold text-sm md:text-lg text-neutral-950'>
                            {resto.restaurantName}
                          </span>
                        </div>
                      </Link>

                      {/* Item */}
                      <div className='flex flex-col gap-3 md:gap-4'>
                        {resto.items.map((item) => (
                          <div
                            key={item.menuId}
                            className='flex gap-3 md:gap-4 items-center'
                          >
                            {/* Image */}
                            <img
                              src='/images/order-item.png'
                              alt='Menu Image'
                              className='size-8 md:size-10 rounded-[12px]'
                            />
                            {/* Name */}
                            <div className='flex flex-col'>
                              <span className='font-medium text-sm md:text-md text-neutral-950'>
                                {item.menuName}
                              </span>
                              <span className='font-extrabold text-sm md:text-md text-neutral-950'>
                                {item.quantity} X {formatCurrency(item.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Line */}
                      <div className='w-full border border-neutral-300' />
                    </div>
                  ))}

                  <div className='flex flex-col md:flex-row md:justify-between ,items-center gap-4'>
                    <div className='flex flex-col'>
                      <span className='font-medium text-sm md:text-md text-neutral-950'>
                        Total
                      </span>
                      <span className='font-extrabold text-md md:text-xl text-neutral-950'>
                        {formatCurrency(order.pricing.totalPrice)}
                      </span>
                    </div>

                    {order.status === 'done' &&
                      !data?.data.reviews.find(
                        (review) =>
                          review.restaurant.id ===
                          order.restaurants[0].restaurantId
                      ) && (
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                          <DialogTrigger asChild>
                            <Button className='h-11 md:h-12 md:max-w-[240px]'>
                              Give Review
                            </Button>
                          </DialogTrigger>

                          <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                              <DialogTitle className='font-extrabold text-xl md:text-display-xs text-neutral-950'>
                                Give Review
                              </DialogTitle>
                            </DialogHeader>

                            <div className='flex flex-col'>
                              <span className='font-extrabold text-md md:text-lg text-neutral-950 text-center'>
                                Give Rating
                              </span>
                              <div className='flex items-center justify-center p-2 gap-3 md:gap-4'>
                                {Array.from({ length: 5 }, (_, index) => (
                                  <Star
                                    key={index}
                                    height={40}
                                    width={40}
                                    onClick={() => setStar(index + 1)}
                                    className={cn(
                                      'cursor-pointer',
                                      index < star
                                        ? 'text-transparent fill-accent-yellow'
                                        : 'text-transparent fill-neutral-400'
                                    )}
                                  />
                                ))}
                              </div>
                            </div>

                            <textarea
                              className='h-[235px] w-full border border-neutral-300 rounded-[12px] py-2 px-3 font-regular text-sm md:text-md text-neutral-950'
                              placeholder='Please share your thoughts about our service!.'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />

                            <DialogFooter>
                              <Button onClick={handleAddReview} type='submit'>
                                Send
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination */}
        {orders?.data.pagination && (
          <div className='flex justify-center items-center gap-3 md:gap-4'>
            <Button
              variant='blank'
              size='blank'
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className='rounded-full border border-neutral-300 h-11 md:h-12 px-4 cursor-pointer disabled:cursor-not-allowed text-neutral-950 disabled:text-neutral-500 hover:text-primary-100 hover:border-primary-100'
            >
              Previous
            </Button>

            <span className='font-medium text-sm md:text-md text-neutral-950'>
              Page {page} of {orders.data.pagination.totalPages}
            </span>

            <Button
              variant='blank'
              size='blank'
              disabled={page === orders.data.pagination.totalPages}
              onClick={() =>
                setPage((prev) =>
                  prev < orders.data.pagination.totalPages ? prev + 1 : prev
                )
              }
              className='rounded-full border border-neutral-300 h-11 md:h-12 px-4 cursor-pointer disabled:cursor-not-allowed text-neutral-950 disabled:text-neutral-500 hover:text-primary-100 hover:border-primary-100'
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;

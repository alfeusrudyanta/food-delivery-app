import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestoId } from '@/hooks/useRestaurant';
import useWindowWidth from '@/hooks/useWindowWidth';
import { Circle, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/RestaurantCard';
import MenuCard from '@/components/MenuCard';
import type { GetRestoIdRes } from '@/types/restaurant';
import dayjs from 'dayjs';
import useCart from '@/hooks/useCart';
import formatCurrency from '@/lib/formatCurrency';

type MenuType = 'all' | 'food' | 'drink';

const Restaurant: React.FC = () => {
  const { id } = useParams();
  const { cart } = useCart();
  const isMobile = useWindowWidth();

  const [delayPassed, setDelayPassed] = useState(false);
  const [menuType, setMenuType] = useState<MenuType>('all');
  const [imageNumber, setImageNumber] = useState<number>(0);
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const [showMoreReview, setShowMoreReview] = useState<boolean>(false);

  const { restoData, isLoading } = useRestoId(Number(id), {
    limitMenu: 50,
    limitReview: 50,
  });

  const openMaps = () => {
    const url = `https://www.google.com/maps?q=${restoData?.data.coordinates.lat},${restoData?.data.coordinates.long}&z=15`;
    window.open(url, '_blank');
  };

  const displayMenu = ['All Menu', 'Food', 'Drink'];

  useEffect(() => {
    if (isMobile) {
      setImageNumber(0);
    }
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayPassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!delayPassed || isLoading) {
    return (
      <div className='py-48 md:py-72'>
        <div className='h-10 w-10 rounded-full border-2 border-primary-100 border-t-transparent animate-spin mx-auto' />
      </div>
    );
  }

  return (
    <section className='pt-20 pb-10 px-4 md:px-[120px] md:pt-[128px] md:pb-12 flex flex-col gap-4 md:gap-8 bg-neutral-25'>
      {/* Images */}
      <ImagesList
        data={restoData}
        imageNumber={imageNumber}
        setImageNumber={setImageNumber}
      />

      {/* Title & Share */}
      <div className='flex justify-between items-center'>
        {restoData !== undefined && (
          <RestaurantCard
            key={restoData?.data.id}
            logo={restoData?.data.logo}
            name={restoData?.data.name}
            star={restoData?.data.star}
            place={restoData?.data.place}
            isList={false}
          />
        )}

        <Button
          variant='blank'
          size='blank'
          onClick={openMaps}
          className='p-3 md:px-[32px] md:py-[10px] border border-neutral-300 hover:border-primary-100 rounded-[100px] flex items-center justify-center md:gap-3 group'
        >
          <Share2
            height={20}
            width={20}
            className='group-hover:text-primary-100'
          />
          {!isMobile && (
            <p className='font-bold text-md text-neutral-950 group-hover:text-primary-100'>
              Share
            </p>
          )}
        </Button>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Menu List */}
      <div className='flex flex-col gap-4 md:gap-6'>
        {/* Menu Type */}
        <div className='flex gap-2 md:gap-3 h-10 md:h-[46px]'>
          {(['all', 'food', 'drink'] as const).map((type, index) => (
            <Button
              key={type}
              variant='blank'
              size='blank'
              onClick={() => setMenuType(type)}
              className={cn(
                'w-full max-w-[90px] md:max-w-[98px] text-sm md:text-md border rounded-[100px]',
                menuType === type
                  ? 'font-bold text-primary-100 border-primary-100 bg-[#FFECEC]'
                  : 'font-semibold text-neutral-950 border-neutral-300'
              )}
            >
              {displayMenu[index]}
            </Button>
          ))}
        </div>

        {/* Menu */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 md:gap-y-6'>
          {restoData?.data.menus
            .filter((menu) => {
              if (menuType === 'all') return true;
              if (menuType === 'food') return menu.type !== 'drink';
              if (menuType === 'drink') return menu.type === 'drink';
              return false;
            })
            .slice(0, showMoreMenu ? undefined : 8)
            .map((menu) => (
              <MenuCard
                key={menu.id}
                restoId={Number(id)}
                menu={menu}
                restoData={restoData}
              />
            ))}
        </div>
      </div>

      {/* Show More Menu */}
      {restoData &&
        restoData?.data.menus.filter((menu) => {
          if (menuType === 'all') return true;
          if (menuType === 'food') return menu.type !== 'drink';
          if (menuType === 'drink') return menu.type === 'drink';
          return false;
        }).length > 8 &&
        showMoreMenu === false && (
          <Button
            variant='blank'
            size='blank'
            onClick={() => setShowMoreMenu(true)}
            className='h-10 md:h-12 mx-auto w-[160px] rounded-[100px] border border-neutral-300 gap-2 p-2 font-bold text-sm md:text-md text-neutral-950'
          >
            Show More
          </Button>
        )}

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Review */}
      <div className='flex flex-col gap-4 md:gap-6'>
        <div className='flex flex-col gap-2 md:gap-3'>
          {/* Review Title */}
          <p className='font-extrabold text-display-xs md:text-display-lg text-neutral-950'>
            Review
          </p>
          <div className='flex gap-1 items-center'>
            <Star
              height={24}
              width={24}
              className='md:h-[24px] md:w-[34px] fill-[#FFAB0D] text-transparent'
            />
            <p className='font-extrabold text-md md:text-xl text-neutral-950'>
              {restoData?.data.averageRating.toFixed(1)} (
              {restoData?.data.totalReviews} Ulasan)
            </p>
          </div>
        </div>

        {/* Review List */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5'>
          {restoData?.data.reviews
            .slice(0, showMoreReview ? undefined : 6)
            .map((review) => (
              <div
                key={review.id}
                className='flex flex-col gap-4 p-4 bg-white shadow-[0_0_20px_0_#CBCACA40] rounded-[16px] '
              >
                {/* Profile */}
                <div className='flex gap-3 items-center'>
                  <img
                    src='/images/user.png'
                    alt='User profile picture'
                    height={58}
                    width={58}
                    className='md:h-16 md:w-16 rounded-full'
                  />
                  <div className='flex-flex-col'>
                    <p className='font-extrabold text-md md:text-lg text-neutral-950'>
                      {review.user.name}
                    </p>
                    <p className='font-regular text-sm md:text-md text-neutral-950'>
                      {dayjs(review.createdAt).format('DD MMMM YYYY, HH:mm')}
                    </p>
                  </div>
                </div>

                {/* Review */}
                <div className='flex flex-col gap-2'>
                  <div className='flex'>
                    {Array.from({ length: review.star }, (_, index) => (
                      <Star
                        key={index}
                        className='fill-[#FFAB0D] text-transparent'
                      />
                    ))}
                  </div>

                  <p className='font-regular text-sm md:text-md text-neutral-950'>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Show More Menu */}
        {restoData &&
          restoData?.data.totalReviews > 6 &&
          showMoreReview === false && (
            <Button
              variant='blank'
              size='blank'
              onClick={() => setShowMoreReview(true)}
              className='h-10 md:h-12 mx-auto w-[160px] rounded-[100px] border border-neutral-300 gap-2 p-2 font-bold text-sm md:text-md text-neutral-950'
            >
              Show More
            </Button>
          )}
      </div>
      {cart && cart?.data.summary.totalItems !== 0 && (
        <div className='fixed bottom-0 left-0 h-[64px] md:h-20 w-full bg-white shadow-[0_0_20px_0_#CBCACA40] flex items-center justify-between px-4 md:px-[120px]'>
          <div className='flex flex-col'>
            <div className='flex gap-1 md:gap-2 items-center'>
              <img
                src='/icon/restaurant-bag.svg'
                alt='Restaurant Bag'
                className='h-5 w-5 md:h-6 md:w-6'
              />
              <span className='font-regular text-sm md:text-md text-neutral-950'>
                {cart.data.summary.totalItems} item
                {cart.data.summary.totalItems > 1 && 's'}
              </span>
            </div>
            <span className='font-extrabold text-md md:text-xl text-neutral-950'>
              {formatCurrency(cart.data.summary.totalPrice)}
            </span>
          </div>
          <Button className='h-11 md:h-12 max-w-[160px]'>Checkout</Button>
        </div>
      )}
    </section>
  );
};

export default Restaurant;

type ImageList = {
  data: GetRestoIdRes | undefined;
  imageNumber: number;
  setImageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const ImagesList: React.FC<ImageList> = ({
  data,
  imageNumber,
  setImageNumber,
}) => {
  const [randomIndex] = useState(() => Math.floor(Math.random() * 3));

  return (
    <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5 md:h-[470px] overflow-hidden'>
      {/* Main Images */}
      <div className='flex-1 hidden md:block overflow-hidden rounded-[16px] h-full'>
        <img
          src={data?.data.images[randomIndex]}
          alt='Restaurant Menu'
          loading='lazy'
          onError={(e) => {
            e.currentTarget.src = '/images/home-front.png';
          }}
          className='h-full w-full hover:scale-105 transition-all duration-300 ease-in-out object-center object-cover'
        />
      </div>

      <div className='w-full md:flex-1 flex flex-col gap-5 h-full'>
        {/* Image 1 */}
        <div className='flex-1 overflow-hidden rounded-[16px] md:h-1/2'>
          <img
            src={data?.data.images[imageNumber]}
            alt='Restaurant Menu'
            loading='lazy'
            onError={(e) => {
              e.currentTarget.src = '/images/home-front.png';
            }}
            className='h-full w-full hover:scale-105 transition-all duration-300 ease-in-out object-center object-cover'
          />
        </div>

        <div className='flex-1 hidden md:flex md:gap-5 md:h-1/2'>
          {/* Image 2 */}
          <div className='flex-1 overflow-hidden rounded-[16px]'>
            <img
              src={data?.data.images[1]}
              alt='Restaurant Menu'
              loading='lazy'
              onError={(e) => {
                e.currentTarget.src = '/images/home-front.png';
              }}
              className='h-full w-full hover:scale-105 transition-all duration-300 ease-in-out object-center object-cover'
            />
          </div>
          {/* Image 3 */}
          <div className='flex-1 overflow-hidden rounded-[16px]'>
            <img
              src={data?.data.images[2]}
              alt='Restaurant Menu'
              loading='lazy'
              onError={(e) => {
                e.currentTarget.src = '/images/home-front.png';
              }}
              className='h-full w-full hover:scale-105 transition-all duration-300 ease-in-out object-center object-cover'
            />
          </div>
        </div>
      </div>

      {/* Image Controller */}
      <div className='mx-auto flex gap-1 md:hidden'>
        {[0, 1, 2].map((imgNum) => (
          <Circle
            key={imgNum}
            height={8}
            width={8}
            onClick={() => setImageNumber(imgNum)}
            className={cn(
              'fill-[#D9D9D9] text-[#D9D9D9] cursor-pointer',
              imageNumber === imgNum && 'fill-primary-100 text-primary-100'
            )}
          />
        ))}
      </div>
    </div>
  );
};

import { useAppDispatch } from '@/features/store';
import useRestaurantFilterWithRedux from '@/hooks/useRestaurantFilterWithRedux';
import {
  setPriceMax,
  setPriceMin,
  setRange,
  setRating,
} from '@/features/filters/filtersSlice';
import React, { useEffect, useState } from 'react';
import { Star, ListFilter } from 'lucide-react';
import RestaurantCard from '@/components/RestaurantCard';
import { Link } from 'react-router-dom';
import useWindowWidth from '@/hooks/useWindowWidth';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Filter: React.FC = () => {
  const isMobile = useWindowWidth();
  const { restaurantFilterData } = useRestaurantFilterWithRedux();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <section className='flex px-4 md:px-[120px] pt-20 pb-10 md:pt-[128px] md:pb-[100px] bg-neutral-25'>
      <div className='flex flex-col gap-4 md:gap-8 w-full'>
        <p className='font-extrabold text-display-xs md:text-display-md text-neutral-950'>
          All Restaurant
        </p>

        <div className='flex flex-col md:flex-row gap-10 w-full'>
          <div className='flex justify-between items-center md:items-start md:justify-start md:flex-col gap-[10px]'>
            {/* Filter */}
            <p className='font-extrabold text-md md:text-lg text-neutral-950'>
              FILTER
            </p>
            {isMobile ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                {/* Trigger */}
                <SheetTrigger asChild>
                  <ListFilter
                    height={20}
                    width={20}
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={cn(
                      'transition-all duration-300 ease-in-out',
                      isOpen && 'rotate-180'
                    )}
                  />
                </SheetTrigger>

                {/* Content */}
                <SheetContent side='left' className='bg-white'>
                  <span className='px-4 pt-8 font-bold text-md text-neutral-950'>
                    Filter
                  </span>
                  <FilterData />
                </SheetContent>
              </Sheet>
            ) : (
              <FilterData />
            )}
          </div>

          {/* Restaurant List */}
          <div className='w-full flex flex-col items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full'>
              {restaurantFilterData?.data.restaurants.map((resto) => (
                <Link to={`/restaurant/${resto.id}`}>
                  <RestaurantCard
                    key={resto.id}
                    logo={resto.logo}
                    name={resto.name}
                    place={resto.place}
                    star={resto.star}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filter;

const FilterData = () => {
  const isMobile = useWindowWidth();

  const distances = [
    { value: '0', label: 'Nearby' },
    { value: '1', label: 'Within 1 km' },
    { value: '3', label: 'Within 3 km' },
    { value: '5', label: 'Within 5 km' },
  ];
  const ratingValueList = [
    { value: 'all', label: 'All' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  const dispatch = useAppDispatch();

  const [selectedDistance, setSelectedDistance] = useState<string>(
    distances[0].value
  );
  const [minimumPrice, setMinimumPrice] = useState<number | undefined>(
    undefined
  );
  const [maximumPrice, setMaximumPrice] = useState<number | undefined>(
    undefined
  );
  const [ratingValue, setRatingValue] = useState<string>(
    ratingValueList[0].value
  );

  useEffect(() => {
    dispatch(setRange(Number(selectedDistance)));
    dispatch(setPriceMin(minimumPrice));
    dispatch(setPriceMax(maximumPrice));

    if (ratingValue === 'all') {
      dispatch(setRating(undefined));
    } else {
      dispatch(setRating(Number(ratingValue)));
    }
  }, [selectedDistance, dispatch, minimumPrice, maximumPrice, ratingValue]);

  return (
    <div
      className={cn(
        'flex flex-col gap-6 w-full bg-white rounded-[12px] p-4',
        !isMobile && 'max-w-[266px] shadow-[0_0_20px_0_#CBCACA40]'
      )}
    >
      <div className='flex flex-col gap-[10px]'>
        {/* Distance */}
        <p className='font-extrabold text-md md:text-lg text-neutral-950'>
          Distance
        </p>
        <div className='flex flex-col'>
          {distances.map((item) => (
            <label
              key={item.value}
              className='flex items-center gap-2 cursor-pointer group'
            >
              <input
                type='radio'
                name='distance'
                value={item.value}
                checked={selectedDistance === item.value}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className='h-5 w-5 accent-primary-100'
              />
              <span className='font-regular text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Price */}
      <div className='flex flex-col gap-[10px]'>
        <p className='font-extrabold text-md md:text-lg text-neutral-950'>
          Price
        </p>

        {/* Minimum Price */}
        <div className='border border-neutral-300 p-2 flex items-center gap-2 rounded-[8px]'>
          <div className='bg-neutral-100 w-[38px] h-[38px] rounded-[4px] py-[5px] px-2 md:p-2 gap-2 flex justify-center items-center'>
            <p className='font-bold text-sm md:text-md text-neutral-950'>Rp</p>
          </div>
          <input
            type='number'
            min={0}
            placeholder='Minimum Price'
            value={minimumPrice ?? ''}
            onChange={(e) => {
              const value = e.target.value;

              if (value === '') {
                setMinimumPrice(undefined);
              } else {
                setMinimumPrice(Number(value));
              }
            }}
            className='focus:outline-none focus:border-transparent font-regular text-sm md:text-md text-neutral-950'
          />
        </div>

        {/* Maximum Price */}
        <div className='border border-neutral-300 p-2 flex items-center gap-2 rounded-[8px]'>
          <div className='bg-neutral-100 w-[38px] h-[38px] rounded-[4px] py-[5px] px-2 md:p-2 gap-2 flex justify-center items-center'>
            <p className='font-bold text-sm md:text-md text-neutral-950'>Rp</p>
          </div>
          <input
            type='number'
            min={0}
            placeholder='Maximum Price'
            value={maximumPrice ?? ''}
            onChange={(e) => {
              const value = e.target.value;

              if (value === '') {
                setMaximumPrice(undefined);
              } else {
                setMaximumPrice(Number(value));
              }
            }}
            className='focus:outline-none focus:border-transparent font-regular text-sm md:text-md text-neutral-950'
          />
        </div>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Rating */}
      <div className='flex flex-col gap-[10px]'>
        <p className='font-extrabold text-md md:text-lg text-neutral-950'>
          Rating
        </p>
        <div className='flex flex-col'>
          {ratingValueList.map((item) => (
            <label
              key={item.value}
              className='flex items-center gap-2 cursor-pointer group'
            >
              <input
                type='radio'
                name='rating'
                value={item.value}
                checked={ratingValue === item.value}
                onChange={(e) => setRatingValue(e.target.value)}
                className='h-5 w-5 accent-primary-100'
              />
              <div className='flex gap-2 items-center'>
                {item.value !== 'all' && (
                  <Star
                    height={24}
                    width={24}
                    className='fill-[#FFAB0D] text-transparent'
                  />
                )}
                <span className='font-regular text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                  {item.label}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

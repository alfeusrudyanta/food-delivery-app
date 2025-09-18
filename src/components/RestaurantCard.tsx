import React from 'react';
import { Star, Dot } from 'lucide-react';
import { cn } from '@/lib/utils';

type RestaurantCardProps = {
  logo: string;
  name: string;
  star: number;
  place: string;
  isList?: boolean;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  logo,
  name,
  star,
  place,
  isList = true,
}) => {
  return (
    <div
      className={cn(
        'group rounded-[16px] p-3 md:p-4 flex gap-2 md:gap-3',
        isList === true && 'bg-white shadow-[0_0_20px_0_#CBCACA40] '
      )}
    >
      {/* Image */}
      <div
        className={cn(
          'max-h-[90px] max-w-[90px] md:max-h-[120px] md:max-w-[120px] overflow-hidden',
          isList === false ? 'rounded-full' : 'rounded-[12px]'
        )}
      >
        <img
          src={logo}
          alt={name}
          loading='lazy'
          className='h-full w-full group-hover:scale-105 transition-all duration-300 ease-in-out'
        />
      </div>

      <div className='flex flex-col gap-[2px] justify-center'>
        {/* Name */}
        <span
          className={cn(
            'font-extrabold text-md md:text-lg text-neutral-950',
            isList === true && 'group-hover:text-primary-100'
          )}
        >
          {name}
        </span>

        {/* Rating */}
        <div className='flex gap-1 items-center'>
          <Star
            height={24}
            width={24}
            fill='#FFAB0D'
            className='text-transparent'
          />
          <span className='font-medium text-sm md:text-md text-neutral-950'>
            {star.toFixed(1)}
          </span>
        </div>

        {/* Location */}
        <div className='flex items-center gap-1'>
          <span className='font-regular text-sm md:text-md text-neutral-950'>
            {place}
          </span>
          <Dot height={10} width={10} />
          <span className='font-regular text-sm md:text-md text-neutral-950'>
            2.4 km
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

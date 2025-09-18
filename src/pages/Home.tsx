import { Input } from '@/components/ui/input';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import iconMenu from '@/constant/home-icon-menu';
import {
  useRecommendedRestaurant,
  useRestaurantFilter,
} from '@/hooks/useRestaurant';
import { Button } from '@/components/ui/button';
import RestaurantCard from '@/components/RestaurantCard';
import useWindowWidth from '@/hooks/useWindowWidth';

const Home: React.FC = () => {
  const { recommendedResto, isError, isLoading } = useRecommendedRestaurant();
  const isMobile = useWindowWidth();

  const [search, setSearch] = useState<string>('');
  const [showMore, setShowMore] = useState(false);

  const filterParams = useMemo(
    () => ({
      location: undefined,
      range: undefined,
      priceMin: undefined,
      priceMax: undefined,
      rating: undefined,
      limit: 50,
      page: 1,
    }),
    []
  );

  const { restaurantFilterData } = useRestaurantFilter(filterParams);

  const searchTerm = search.toLowerCase();
  const limit = useMemo(() => (isMobile ? 5 : 9), [isMobile]);

  const recommendations = useMemo(
    () => recommendedResto?.data?.recommendations ?? [],
    [recommendedResto]
  );

  const guestFilteredRestaurants = useMemo(() => {
    const restaurants = restaurantFilterData?.data?.restaurants ?? [];
    return restaurants.filter((data) =>
      data.name.toLowerCase().includes(searchTerm)
    );
  }, [restaurantFilterData, searchTerm]);

  const filteredRestaurants = useMemo(() => {
    return recommendations.filter(
      (data) =>
        data.name.toLowerCase().includes(searchTerm) ||
        data.sampleMenus?.some((menu) =>
          menu.foodName.toLowerCase().includes(searchTerm)
        )
    );
  }, [recommendations, searchTerm]);

  const displayedRestaurants = showMore
    ? filteredRestaurants
    : filteredRestaurants.slice(0, limit);
  const hasMoreToShow = filteredRestaurants.length > limit && !showMore;

  const guestDisplayedRestaurants = showMore
    ? guestFilteredRestaurants
    : guestFilteredRestaurants.slice(0, limit);

  return (
    <section className='flex flex-col gap-0 md:gap-12 justify-center mb-12 md:mb-[100px] bg-neutral-25'>
      <div className="min-h-[648px] md:min-h-[827px] w-full flex items-center justify-center bg-cover bg-center bg-[linear-gradient(180deg,rgba(0,0,0,0)_-59.98%,rgba(0,0,0,0.8)_110.09%),url('/images/home-front.png')] px-[22px]">
        <div className='text-center flex items-center flex-col gap-6 md:gap-10'>
          <div className='flex flex-col gap-1 md:gap-2'>
            <h1 className='font-bold text-display-lg md:text-display-2xl text-white'>
              Explore Culinary Experiences
            </h1>
            <p className='font-bold text-lg md:text-display-xs text-white'>
              Search and refine your choice to discover the perfect restaurant.
            </p>
          </div>

          <div className='relative max-w-[604px] w-full'>
            <Search className='absolute text-neutral-500 cursor-pointer top-1/2 -translate-y-1/2 left-4 md:left-6 size-5 hover:scale-105' />
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search restaurants, food and drink'
              className='h-12 md:h-[56px] w-full bg-white gap-[6px] rounded-full py-2 pr-4 pl-[42px] md:pl-[50px] md:pr-6'
            />
          </div>
        </div>
      </div>

      <div className='px-4 py-6 md:py-0 md:px-[120px] w-full grid grid-cols-3 md:grid-cols-6 gap-5'>
        {iconMenu.map((icon) => (
          <Link key={icon.name} to={icon.link}>
            <div className='flex flex-col items-center gap-1 md:gap-[6px] cursor-pointer group'>
              <div className='h-[100px] max-w-[161px] rounded-[16px] w-full flex justify-center items-center shadow-[0_0_20px_0_#CBCACA40]'>
                <img
                  src={icon.image}
                  alt={icon.name}
                  loading='lazy'
                  decoding='async'
                  className='size-12 md:size-[65px] group-hover:scale-105 transition-all duration-300 ease-in-out'
                />
              </div>
              <p className='text-center font-bold text-sm md:text-lg text-neutral-950 group-hover:text-primary-100'>
                {icon.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className='flex flex-col gap-4 md:gap-8 px-4 md:px-[120px]'>
        <div className='flex justify-between items-center'>
          <h2 className='w-full font-extrabold text-display-xs md:text-display-md text-neutral-950'>
            Recommended
          </h2>
          <Link to='/filter'>
            <Button
              variant='blank'
              size='blank'
              className='font-extrabold text-md md:text-lg text-primary-100 cursor-pointer justify-end'
            >
              See All
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className='h-10 w-10 rounded-full border-2 border-primary-100 border-t-transparent animate-spin mx-auto' />
        )}

        {isError && guestDisplayedRestaurants ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5'>
            {guestDisplayedRestaurants.map((resto) => (
              <Link key={resto.id} to={`/restaurant/${resto.id}`}>
                <RestaurantCard
                  logo={resto.logo}
                  name={resto.name}
                  star={resto.star}
                  place={resto.place}
                />
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5'>
              {displayedRestaurants.map((resto) => (
                <Link key={resto.id} to={`/restaurant/${resto.id}`}>
                  <RestaurantCard
                    logo={resto.logo}
                    name={resto.name}
                    star={resto.star}
                    place={resto.place}
                  />
                </Link>
              ))}
            </div>

            {hasMoreToShow && (
              <Button
                variant='blank'
                size='blank'
                onClick={() => setShowMore(true)}
                className='h-10 md:h-12 mx-auto w-[160px] rounded-[100px] border border-neutral-300 gap-2 p-2 font-bold text-sm md:text-md text-neutral-950'
              >
                Show More
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

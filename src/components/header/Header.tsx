import { Link, useLocation, useNavigate } from 'react-router-dom';
import useWindowWidth from '@/hooks/useWindowWidth';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { FileText, LogOut, MapPin, Menu } from 'lucide-react';
import useCart from '@/hooks/useCart';

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMobile = useWindowWidth();
  const navigate = useNavigate();
  const { isLoggedIn, logout, profile } = useAuth();
  const { cart } = useCart();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMenuProfileOpen, setIsMenuProfileOpen] = useState<boolean>(false);

  const handleLogOut = () => {
    logout();
    navigate('/auth');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
      setIsMenuProfileOpen(false);
    }
  }, [isMobile]);

  return (
    <div
      className={cn(
        'fixed h-[64px] md:h-20 py-3 px-4 md:py-4 md:px-[120px] z-50 w-full transition-all duration-300 ease-in-out',
        isScrolled && 'bg-white'
      )}
    >
      <div className='flex justify-between items-center'>
        {/* Icon */}
        <Link to='/'>
          <div className='flex items-center gap-4'>
            <img
              src={
                isHome && isScrolled === false
                  ? '/icon/logo-white.svg'
                  : '/icon/logo.svg'
              }
              alt='Foody Icon'
              className='h-10 w-10 md:h-[42px] md:w-[42px]'
            />
            {isMobile === false && (
              <span
                className={cn(
                  'font-extrabold text-3xl text-neutral-950',
                  isHome && isScrolled === false && 'text-neutral-25'
                )}
              >
                Foody
              </span>
            )}
          </div>
        </Link>

        {/* Not Logged In */}
        {isLoggedIn === false && isMobile && (
          <div className='relative'>
            <Menu
              height={24}
              width={24}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={cn(
                'hover:text-primary-100 text-neutral-950',
                isHome && isScrolled === false && 'text-white'
              )}
            />
            {isMenuOpen && (
              <div className='absolute -bottom-[80px] right-0 bg-white rounded-[10px] p-2 w-[150px] flex flex-col gap-3'>
                <Link to='/auth'>
                  <Button
                    variant='blank'
                    size='blank'
                    className='h-6 hover:text-primary-100 hover:border-primary-100 font-bold text-sm text-neutral-950'
                  >
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to='/auth' state={{ authOption: 'signUp' }}>
                  <Button
                    variant='blank'
                    size='blank'
                    className='h-6 bg-white font-bold text-sm text-neutral-950 hover:text-primary-100 hover:border-primary-100'
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {isLoggedIn === false && !isMobile && (
          <div className='flex items-center md:gap-3 gap-4'>
            <Link to='/auth'>
              <Button
                variant='blank'
                size='blank'
                className={cn(
                  'h-12 flex justify-center items-center text-center rounded-[100px] px-[56px] border-[2px] border-neutral-300 hover:text-primary-100 hover:border-primary-100 font-bold text-md text-neutral-950',
                  isHome && isScrolled === false && ' text-white hover:bg-white'
                )}
              >
                Sign In
              </Button>
            </Link>
            <Link to='/auth' state={{ authOption: 'signUp' }}>
              <Button
                variant='blank'
                size='blank'
                className='h-12 flex justify-center items-center text-center rounded-[100px] px-[56px] border-[2px] border-neutral-300 bg-white font-bold text-md text-neutral-950 hover:text-primary-100 hover:border-primary-100'
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {/* Logged In */}
        {isLoggedIn && (
          <div className='flex gap-4 md:gap-6 items-center relative'>
            {/* Cart */}
            <Link to='/mycart'>
              <div className='relative'>
                <img
                  src={
                    isHome && isScrolled === false
                      ? '/icon/restaurant-bag-white.svg'
                      : '/icon/restaurant-bag.svg'
                  }
                  alt='Shopping Cart'
                  className='size-[28px] md:size-8'
                />

                {cart && cart.data.summary.totalItems > 0 && (
                  <div className='absolute -top-1 -right-1 bg-primary-100 rounded-full h-5 w-5 flex justify-center items-center'>
                    <span className='font-bold text-xs text-white'>
                      {cart.data.summary.totalItems}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            {/* Profile */}
            <Button
              variant='blank'
              size='blank'
              onClick={() => setIsMenuProfileOpen((prev) => !prev)}
              className='cursor-pointer flex items-center gap-4'
            >
              <img
                src='/images/user.png'
                alt='User Profile Picture'
                className='rounded-full size-10 md:size-12'
              />
              {!isMobile && (
                <span
                  className={cn(
                    'font-semibold text-lg text-neutral-950 hover:text-primary-100',
                    isHome && isScrolled === false && 'text-white'
                  )}
                >
                  {profile?.data.name}
                </span>
              )}
            </Button>

            {isMenuProfileOpen && (
              <div className='absolute top-[50px] md:top-[65px] right-0 p-4 bg-white shadow-[0_0_20px_0_#CBCACA40] rounded-[16px] gap-4 flex flex-col w-[200px]'>
                {/* Profile Picture */}
                <Link to='/profile'>
                  <div className='flex gap-2 items-center group'>
                    <img
                      src='/images/user.png'
                      alt='User Profile Picture'
                      className='rounded-full size-9 md:size-10'
                    />
                    <span className='font-bold text-md text-neutral-950 group-hover:text-primary-100'>
                      {profile?.data.name}
                    </span>
                  </div>
                </Link>

                {/* Line */}
                <div className='w-full border border-neutral-200' />

                {/* Delivery Address */}
                <Link to='/profile'>
                  <div className='flex items-center gap-2 group'>
                    <MapPin
                      height={20}
                      width={20}
                      className='group-hover:text-primary-100'
                    />
                    <span className='font-medium text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                      Delivery Address
                    </span>
                  </div>
                </Link>

                {/* Delivery Address */}
                <Link to='/order'>
                  <div className='flex items-center gap-2 group'>
                    <FileText
                      height={20}
                      width={20}
                      className='group-hover:text-primary-100'
                    />
                    <span className='font-medium text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                      My Orders
                    </span>
                  </div>
                </Link>

                {/* Logout */}
                <Button
                  variant='blank'
                  size='blank'
                  onClick={handleLogOut}
                  className='flex items-center gap-2 group justify-start'
                >
                  <LogOut
                    height={20}
                    width={20}
                    className='group-hover:text-primary-100'
                  />
                  <span className='font-medium text-sm md:text-md text-neutral-950 group-hover:text-primary-100'>
                    Logout
                  </span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

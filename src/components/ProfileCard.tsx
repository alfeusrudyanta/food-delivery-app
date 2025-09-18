import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { FileText, LogOut, MapPin } from 'lucide-react';

const ProfileCard = () => {
  const navigate = useNavigate();
  const { profile, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className='hidden md:flex flex-col gap-6 p-5 bg-white rounded-[16px] shadow-[0_0_20px_0_#CBCACA40] max-w-[240px] w-full'>
      <div className='flex items-center gap-2'>
        <img
          src='/images/user.png'
          alt='User Profile Picture'
          height={48}
          width={48}
          className='rounded-full'
        />
        <span className='font-bold text-lg text-neutral-950'>
          {profile?.data.name}
        </span>
      </div>

      {/* Line */}
      <div className='w-full border border-neutral-300' />

      {/* Delivery Address */}
      <div className='flex gap-2 items-center group cursor-pointer'>
        <MapPin
          height={24}
          width={24}
          className='group-hover:text-primary-100'
        />
        <span className='font-medium text-md text-neutral-950 group-hover:text-primary-100'>
          Delivery Address
        </span>
      </div>

      {/* Orders */}
      <Link to='/order'>
        <div className='flex gap-2 items-center group cursor-pointer'>
          <FileText
            height={24}
            width={24}
            className='group-hover:text-primary-100'
          />
          <span className='font-medium text-md text-neutral-950 group-hover:text-primary-100'>
            My Orders
          </span>
        </div>
      </Link>

      {/* Log Out */}
      <button
        onClick={handleLogout}
        className='flex gap-2 items-center group cursor-pointer'
      >
        <LogOut
          height={24}
          width={24}
          className='group-hover:text-primary-100'
        />
        <span className='font-medium text-md text-neutral-950 group-hover:text-primary-100'>
          Logout
        </span>
      </button>
    </div>
  );
};

export default ProfileCard;

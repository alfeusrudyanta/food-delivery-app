import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';

const Profile = () => {
  const { profile } = useAuth();

  return (
    <section className='px-4 md:px-[220px] pt-20 md:pt-[128px] pb-12 md:pb-[100px] flex md:gap-8 bg-neutral-25 min-h-[600px]'>
      {/* Profile Card */}
      <ProfileCard />

      {/* Profile */}
      <div className='flex flex-col gap-4 md:gap-6 w-full max-w-[525px] mx-auto md:mx-0'>
        <span className='font-extrabold text-display-xs md:text-display-md text-neutral-950'>
          Profile
        </span>

        <div className='flex flex-col gap-6 p-4 md:p-5 bg-white rounded-[16px] shadow-[0_0_20px_0_#CBCACA40] max-w-[525px] w-full'>
          <div className='flex flex-col gap-2 md:gap-3'>
            {/* Image */}
            <img
              src='/images/user.png'
              alt='User Profile Picture'
              height={64}
              width={64}
              className='rounded-full'
            />

            {/* Name */}
            <div className='flex justify-between items-center'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Name
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {profile?.data.name}
              </span>
            </div>

            {/* Email */}
            <div className='flex justify-between items-center'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Name
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {profile?.data.email}
              </span>
            </div>

            {/* Phone Number */}
            <div className='flex justify-between items-center'>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Phone Number
              </span>
              <span className='font-bold text-sm md:text-md text-neutral-950'>
                {profile?.data.phone}
              </span>
            </div>
          </div>
          <Button className='h-11 md:h-12'>Update Profile</Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;

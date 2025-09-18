import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { profile, updateProfile, error } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleUpdateProfile = () => {
    if (!name || !phoneNumber || !newPassword || !currentPassword) {
      setErrorMsg('Please fill all fields');
      return;
    }

    if (name.length < 5) {
      setErrorMsg('Name must be at least 5 characters long');
      return;
    }

    if (phoneNumber.length < 12) {
      setErrorMsg('Phone Number must be at least 12 characters long');
      return;
    }

    if (newPassword.length < 8 || currentPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    updateProfile({
      name: name,
      phone: phoneNumber,
      currentPassword: currentPassword,
      newPassword: newPassword,
    });
  };

  useEffect(() => {
    if (isOpen === false) {
      setName('');
      setPhoneNumber('');
      setCurrentPassword('');
      setNewPassword('');
      setErrorMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (error.updateProfile) {
      setErrorMsg('Update failed. Please review your input.');
    }
  }, [error.updateProfile]);

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

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className='h-11 md:h-12'>Update Profile</Button>
            </DialogTrigger>

            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle className='font-extrabold text-xl md:text-display-xs text-neutral-950'>
                  Update Profile
                </DialogTitle>
              </DialogHeader>

              <div className='flex flex-col'>
                <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                  Name
                </span>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  placeholder='Name'
                  className='h-10 md:h-11 font-regular text-sm md:text-md text-neutral-950'
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                  Phone Number
                </span>
                <Input
                  type='string'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                  placeholder='Phone Number'
                  className='h-10 md:h-11 font-regular text-sm md:text-md text-neutral-950'
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                  Current Password
                </span>
                <Input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                  placeholder='Current Password'
                  className='h-10 md:h-11 font-regular text-sm md:text-md text-neutral-950'
                />
              </div>

              <div className='flex flex-col'>
                <span className='font-extrabold text-md md:text-lg text-neutral-950'>
                  New Password
                </span>
                <Input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.currentTarget.value)}
                  placeholder='New Password'
                  className='h-10 md:h-11 font-regular text-sm md:text-md text-neutral-950'
                />
              </div>

              <span className='font-regular text-sm md:text-md text-primary-100'>
                {errorMsg}
              </span>

              <DialogFooter>
                <Button onClick={handleUpdateProfile}>Update</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Profile;

import { exploreList, helpList, iconList } from '@/constant/footer';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className='bg-neutral-950 px-4 md:px-[120px] py-10 md:py-20 w-full'>
      <div className='flex flex-col gap-6 md:gap-[210px] md:flex-row md:justify-between md:max-w-none mx-auto'>
        <div className='flex flex-col gap-4 md:gap-10'>
          {/* Detail */}
          <div className='flex flex-col gap-[22px]'>
            <div className='flex gap-4 items-center'>
              <img src='/icon/logo.svg' alt='logo' height={42} width={42} />
              <span className='font-extrabold text-display-md text-white'>
                Foody
              </span>
            </div>

            <span className='font-regular text-sm md:text-md text-neutral-25'>
              Enjoy homemade flavors & chef’s signature dishes, freshly prepared
              every day. Order online or visit our nearest branch.
            </span>
          </div>

          {/* Social Media */}
          <div className='flex flex-col gap-5'>
            <span className='font-bold text-sm md:text-md text-neutral-25'>
              Follow on Social Media
            </span>

            <div className='flex items-center gap-3'>
              {iconList.map((icon) => (
                <div
                  key={'Icon' + icon.name}
                  className='h-10 w-10 border border-neutral-800 rounded-full flex justify-center items-center'
                >
                  <img src={icon.link} alt={icon.name} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex gap-4 md:gap-10 justify-between w-full md:ml-16'>
          {/* Explore */}
          <div className='flex flex-col gap-4 md:gap-5'>
            <span className='font-extrabold text-sm md:text-md text-neutral-25'>
              Explore
            </span>
            <div className='flex flex-col gap-4 md:gap-5'>
              {exploreList.map((value) => (
                <Link to={value.link}>
                  <span
                    key={'Explore:' + value.display}
                    className='font-regular text-sm md:text-md text-neutral-25 hover:text-primary-100'
                  >
                    {value.display}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className='flex flex-col gap-4 md:gap-5'>
            <span className='font-extrabold text-sm md:text-md text-neutral-25'>
              Help
            </span>
            <div className='flex flex-col gap-4 md:gap-5'>
              {helpList.map((value) => (
                <Link to={value}>
                  <span
                    key={'Help:' + value}
                    className='font-regular text-sm md:text-md text-neutral-25 hover:text-primary-100'
                  >
                    {value}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';

function Footer() {
  return (
    <footer className='bg-orange-50'>
      <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <a href='/' className='flex items-center'>
              <img src='/icons/ezvlogo.ico' className='h-8 mr-3' alt='EZV Logo' />
            </a>
          </div>
          <div className='grid grid-cols-2 lg:gap-20  gap-6 sm:grid-cols-2'>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase '>Menu</h2>
              <ul className='text-gray-600 dark:text-gray-400 font-medium'>
                <li className='mb-4'>
                  <a href='/' className='hover:underline'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='/dashboard/list' className='hover:underline'>
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase '>Service</h2>
              <ul className='text-gray-600 dark:text-gray-400 font-medium'>
                <li className='mb-4'>
                  <a href='/create' className='hover:underline'>
                    Create
                  </a>
                </li>
                <li>
                  <a href='/maps' className='hover:underline'>
                    Maps
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © 2023{' '}
            <a href='/' className='hover:underline'>
              EZV™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

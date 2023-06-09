import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex justify-between py-5  px-10 shadow bg-orange-50'>
      <Link to='/'>
        <img src='/icons/ezvlogo.ico' alt='logo' className=' lg:h-10 lg:w-[80px] w-[70px] h-8 cursor-pointer' />
      </Link>
      <div className='relative z-10 cursor-pointer'>
        <img src='/icons/Hamburger.png' alt='hamburger' className='h-7 cursor-pointer' onClick={toggleMenu} />

        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50'>
            <div className='py-1'>
              <a href='/' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Home
              </a>
              <a href='/dashboard/list' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                Dashboard
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

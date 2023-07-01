import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='flex justify-between py-5  px-10 shadow bg-orange-50'>
      <Link to='/' className='flex gap-1 items-center'>
        <img src='/icons/ezvlogo.ico' className='h-8 mr-3 cursor-pointer' alt='EZV Logo' />
      </Link>
      <div className='flex gap-5'>
        <Link
          to='/create'
          className=' text-sm font-semibold capitalize text-orange-500 border rounded-[5px] border-orange-500 mr-2 py-1 px-3 scale-90 hover:scale-100 hover:bg-orange-500 hover:text-white duration-100 transition transform ease-in hover:border-none '
        >
          <div>List your property</div>
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
                <div className='flex items-center gap-2 text-gray-800 hover:bg-gray-100 py-2'>
                  <FontAwesomeIcon icon={faHome} style={{ width: '20px', height: '20px', color: 'orange' }} className='ml-3' />
                  <a href='/' className='block  '>
                    Home
                  </a>
                </div>
                <div className='flex items-center gap-2 text-gray-800 hover:bg-gray-100 py-2'>
                  <FontAwesomeIcon icon={faGauge} style={{ width: '20px', height: '20px', color: 'orange' }} className='ml-3' />
                  <a href='/dashboard/list' className='block  '>
                    Dashboard
                  </a>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

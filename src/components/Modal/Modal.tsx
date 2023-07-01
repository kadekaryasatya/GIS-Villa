import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ModalCreate = (props: { closeModal: any }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10'>
      <div className='bg-orange-50  flex w-[1000px] '>
        <div className='w-1/2 p-10 flex flex-col justify-between'>
          <div>
            <h2 className='text-2xl font-bold mb-1'>
              <span className='text-orange-500'>Create</span> new villa
            </h2>
            <p className='text-gray-500 text-sm'>Tell us all about your villa by filling out the form provided</p>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCircleCheck} style={{ width: '30px', height: '30px', color: 'orange' }} />
            <div>
              <p className='font-semibold'>Basic Information</p>
              <p className='text-sm text-gray-500'>name, location ,image, description , price ,etc.</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCircleCheck} style={{ width: '30px', height: '30px', color: 'orange' }} />
            <div>
              <p className='font-semibold'>Category Information</p>
              <p className='text-sm text-gray-500'>your villa category , ex: farms, natural, etc.</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCircleCheck} style={{ width: '30px', height: '30px', color: 'orange' }} />
            <div>
              <p className='font-semibold'>Rules Information</p>
              <p className='text-sm text-gray-500'>your villa rules , ex: no smoking, pets, etc.</p>
            </div>
          </div>
          <div className='flex gap-4 items-center'>
            <FontAwesomeIcon icon={faCircleCheck} style={{ width: '30px', height: '30px', color: 'orange' }} />
            <div>
              <p className='font-semibold'>Rules Information</p>
              <p className='text-sm text-gray-500'>your villa rules , ex: no smoking, pets, etc.</p>
            </div>
          </div>

          <button className='mt-4 px-4 py-2 bg-orange-500 hover:bg-gray-500 text-white rounded-md' onClick={props.closeModal}>
            Got it
          </button>
        </div>
        <div className='w-1/2'>
          <img src='/create.jpg' alt='background' className='w-full h-[500px] object-cover' />
        </div>
      </div>
    </div>
  );
};

export default ModalCreate;

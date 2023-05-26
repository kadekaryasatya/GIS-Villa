import React from 'react';

function CreateVilla() {
  return (
    <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
      <h1 className='font-semibold text-2xl  '>Tell us about your Villa</h1>
      <form>
        {/* Villa Name */}
        <div className='mb-6 mt-10'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Villa Name</label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Example : Villa Cyan'
            required
          ></input>
        </div>

        {/* Location */}
        <div className='mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Location</label>
          <input
            type='text'
            id='location'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          ></input>
        </div>
        {/* Categ
        ory */}
        <div className=' mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Category </label>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>Amazing Views</label>
          </div>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>Beachfront</label>
          </div>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>Mansions</label>
          </div>
        </div>

        {/* Description */}
        <div className='mb-6 mt-10'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Description</label>
          <textarea
            id='description'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
          ></textarea>
        </div>

        {/* House Rules */}
        <div className=' mb-6'>
          <label className='block mb-2 font-medium text-lg text-gray-900 '>House Rules </label>
          <div className='flex mb-2'>
            <label className='text-sm  text-gray-900 mr-2'>Gatherings Allowed</label>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
          </div>
          <div className='flex mb-2'>
            <label className='text-sm  text-gray-900 mr-2'>Smoking Allowed</label>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
          </div>
          <div className='flex mb-2'>
            <label className='text-sm  text-gray-900 mr-2'>Pets Allowed</label>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
          </div>
          <div className='flex mb-2'>
            <label className='text-sm  text-gray-900 mr-2'>Suitable for infants (under 2 years)</label>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
          </div>
          <div className='flex mb-2'>
            <label className='text-sm  text-gray-900 mr-2'>Children friendly home (2-12 years)</label>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className=' mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Facilities </label>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>TV</label>
          </div>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>Parking</label>
          </div>
          <div className='flex mb-2'>
            <div className='flex items-center h-5'>
              <input
                id='remember'
                type='checkbox'
                value=''
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                required
              ></input>
            </div>
            <label className='ml-2 text-sm  text-gray-900 '>Swimming Pool</label>
          </div>
        </div>

        {/* Room */}
        <div className='mb-6 mt-10'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Room</label>
          <div>
            <label className='text-sm  text-gray-900 mr-2'>Room name</label>
            <input
              type='text'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Example : Double Standard'
              required
            ></input>
          </div>
          <div className='flex gap-2'>
            <div className='w-full'>
              <label className='text-sm  text-gray-900 mr-2'>Bed</label>
              <input
                type='number'
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              ></input>
            </div>
            <div className='w-full'>
              <label className='text-sm  text-gray-900 mr-2'>Bathroom</label>
              <input
                type='number'
                id='name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              ></input>
            </div>
          </div>

          <div>
            <label className='text-sm  text-gray-900 mr-2'>Price</label>
            <input
              type='number'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Example : 275000'
              required
            ></input>
          </div>
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateVilla;

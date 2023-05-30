import React from 'react';
import { getVillaList } from '../../utils/api';
import { useEffect, useState } from 'react';
import { IVilla } from '../../utils/data';

function Listing(): JSX.Element {
  const [villaList, setVillaList] = useState<Array<IVilla>>([]);

  useEffect(() => {
    async function fetchData() {
      const records = await getVillaList();
      setVillaList(records);
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg py-5 px-[50px] max-w-[1366px] mx-auto'>
        <div className='flex justify-between mb-5'>
          <h1 className='text-2xl font-semibold '>Your Listings</h1>
          <a
            href={`/create`}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Create +
          </a>
        </div>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Villa name
              </th>
              <th scope='col' className='px-6 py-3'>
                Location
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {villaList.map((item) => (
              <tr className='bg-white border-b  dark:border-gray-700 text-gray-900' key={item.id}>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
                  {item.name}
                </th>
                <td className='px-6 py-4'>{item.location}</td>
                <td className='px-6 py-4'>
                  {item.price.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </td>
                <td className='px-6 py-4'>
                  <a href={`/villa/${item.id}`} key={item.id} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2 '>
                    Edit
                  </a>
                  <a href='#' className='font-medium text-red-600  hover:underline'>
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Listing;
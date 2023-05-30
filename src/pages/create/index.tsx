import React, { useState, useEffect } from 'react';
import { getCategoryList, getFacilitiesList, getHouseRulesList, postVillaDetail } from '../../utils/api';
import MapComponent from '../../components/Map/Maps';
import { ICategory, IFacilities, IHouseRules } from '../../utils/data';

function CreateVilla() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [categoryList, setCategoryList] = useState<Array<ICategory>>([]);
  const [houseRulesList, setHouseRulesList] = useState<Array<IHouseRules>>([]);
  const [facilitiesList, setFacilitiesList] = useState<Array<IFacilities>>([]);

  const handleLocationSelected = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = () => {
    postVillaDetail(name, description, latitude, longitude);
  };

  useEffect(() => {
    async function fetchData() {
      const records = await getCategoryList();
      setCategoryList(records);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const records = await getHouseRulesList();
      setHouseRulesList(records);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const records = await getFacilitiesList();
      setFacilitiesList(records);
    }
    fetchData();
  }, []);

  return (
    <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
      <h1 className='font-semibold text-2xl  '>Tell us about your Villa</h1>
      <form>
        {/* Villa Name */}
        <div className='mb-6 mt-10'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Villa Name</label>
          <input
            type='text'
            onChange={(e) => setName(e.target.value)}
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
        <MapComponent onLocationSelected={handleLocationSelected} />

        {/* Category */}
        <div className=' mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Category </label>
          {categoryList.map((item) => (
            <div className='flex mb-2' key={item.id}>
              <div className='flex items-center h-5'>
                <input
                  id={item.id}
                  type='checkbox'
                  value={item.name}
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                ></input>
              </div>
              <label className='ml-2 text-sm  text-gray-900 '>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className='mb-6 mt-10'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id='description'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder=''
            required
          ></textarea>
        </div>

        {/* HouseRules */}
        <div className=' mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>House Rules </label>
          {houseRulesList.map((item) => (
            <div className='flex mb-2' key={item.id}>
              <div className='flex items-center h-5'>
                <input
                  id={item.id}
                  type='checkbox'
                  value={item.name}
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                ></input>
              </div>
              <label className='ml-2 text-sm  text-gray-900 '>{item.name}</label>
            </div>
          ))}
        </div>

        {/* Facilities */}
        <div className=' mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Facilities</label>
          {facilitiesList.map((item) => (
            <div className='flex mb-2' key={item.id}>
              <div className='flex items-center h-5'>
                <input
                  id={item.id}
                  type='checkbox'
                  value={item.name}
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                ></input>
              </div>
              <label className='ml-2 text-sm  text-gray-900 '>{item.name}</label>
            </div>
          ))}
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
          onClick={handleSubmit}
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
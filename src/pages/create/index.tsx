import React, { useState, useEffect } from 'react';
import { getCategoryList, getFacilitiesList, getHouseRulesList, postCategoryVilla, postFacilitiesVilla, postHouseRules, postVillaDetail } from '../../utils/api';
import MapComponent from '../../components/Map/Maps';
import { ICategory, IFacilities, IHouseRules } from '../../utils/data';
import { toast } from 'react-toastify';
const cities = ['Denpasar', 'Kuta', 'Ubud', 'Seminyak', 'Canggu                                                                                                         ']; // Example city data

function CreateVilla() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [categoryList, setCategoryList] = useState<Array<ICategory>>([]);
  const [houseRulesList, setHouseRulesList] = useState<Array<IHouseRules>>([]);
  const [facilitiesList, setFacilitiesList] = useState<Array<IFacilities>>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const handleLocationSelected = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const store = async (idVilla: any) => {
    try {
      for (const category of selectedCategories) {
        await postCategoryVilla(idVilla, category);
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const allRules = houseRulesList.map((item) => item.id);
      const selectedRulesSet = new Set(selectedRules);

      for (const ruleId of allRules) {
        const allowed = selectedRulesSet.has(ruleId);
        await postHouseRules(idVilla, ruleId, allowed);
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      for (const facilities of selectedFacilities) {
        await postFacilitiesVilla(idVilla, facilities);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = () => {
    const create = async () => {
      try {
        const createdVilla = await postVillaDetail(name, description, latitude, longitude, selectedCity);
        const id_villa = createdVilla.id;
        store(id_villa);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    create();
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

  const handleCategoryChange = (value: string) => {
    const updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(value)) {
      const index = updatedCategories.indexOf(value);
      updatedCategories.splice(index, 1);
    } else {
      updatedCategories.push(value);
    }

    setSelectedCategories(updatedCategories);
  };

  const handleCityChange = (event: any) => {
    setSelectedCity(event.target.value);
  };

  const handleRuleChange = (value: any) => {
    const updatedRules = [...selectedRules];

    if (updatedRules.includes(value)) {
      const index = updatedRules.indexOf(value);
      updatedRules.splice(index, 1);
    } else {
      updatedRules.push(value);
    }

    setSelectedRules(updatedRules);
  };

  const handleFacilitiesChange = (value: string) => {
    const updatedFacilities = [...selectedFacilities];

    if (updatedFacilities.includes(value)) {
      const index = updatedFacilities.indexOf(value);
      updatedFacilities.splice(index, 1);
    } else {
      updatedFacilities.push(value);
    }

    setSelectedFacilities(updatedFacilities);
  };

  console.log('selectedFacilities :>> ', selectedFacilities);
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
          <div>
            <label htmlFor='city' className='block mb-2 text-lg font-medium text-gray-900'>
              Select City
            </label>
            <select
              id='city'
              name='city'
              value={selectedCity}
              onChange={handleCityChange}
              className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              <option value=''>-- Select a city --</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Location on Map */}
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
                  value={item.id}
                  checked={selectedCategories.includes(item.id)}
                  onChange={(e) => handleCategoryChange(e.target.value)}
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
                  onChange={(e) => handleRuleChange(e.target.value)}
                  id={item.id}
                  type='checkbox'
                  value={item.id}
                  checked={selectedRules.includes(item.id)}
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
                  onChange={(e) => handleFacilitiesChange(e.target.value)}
                  checked={selectedFacilities.includes(item.id)}
                  id={item.id}
                  type='checkbox'
                  value={item.id}
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

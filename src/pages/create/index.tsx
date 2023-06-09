import React, { useState, useEffect, useCallback } from 'react';
import { getCategoryList, getFacilitiesList, getHouseRulesList, postCategoryVilla, postFacilitiesVilla, postHouseRules, postPhotoRoom, postPhotoVilla, postRoomDetail, postVillaDetail } from '../../utils/api';
import MapComponent from '../../components/Map/Maps';
import { ICategory, IFacilities, IHouseRules } from '../../utils/data';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
const cities = ['Denpasar', 'Kuta', 'Ubud', 'Seminyak', 'Canggu']; // Example city data

interface Photo {
  file: File;
  preview: string;
}

interface RoomPhoto {
  file: File;
  preview: string;
}

function CreateVilla() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceStart, setPriceStart] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [categoryList, setCategoryList] = useState<Array<ICategory>>([]);
  const [houseRulesList, setHouseRulesList] = useState<Array<IHouseRules>>([]);
  const [facilitiesList, setFacilitiesList] = useState<Array<IFacilities>>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [roomPhotos, setRoomPhotos] = useState<RoomPhoto[]>([]);
  const [roomName, setRoomName] = useState('');
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  <Toaster position='top-right' reverseOrder={false} />;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: Photo[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(0, 6));
  }, []);

  const onDropRoom = useCallback((acceptedFiles: File[]) => {
    const newPhotos: RoomPhoto[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setRoomPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(0, 6));
  }, []);

  const {
    getRootProps: getRootPropsPhotos,
    getInputProps: getInputPropsPhotos,
    isDragActive: isDragActivePhotos,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    minSize: 0,
    maxSize: 5242880, // 5MB in bytes
    multiple: true,
    disabled: photos.length >= 6,
  });

  const {
    getRootProps: getRootPropsRoom,
    getInputProps: getInputPropsRoom,
    isDragActive: isDragActiveRoom,
  } = useDropzone({
    onDrop: onDropRoom,
    accept: {
      'image/*': [],
    },
    minSize: 0,
    maxSize: 5242880, // 5MB in bytes
    multiple: true,
    disabled: roomPhotos.length >= 6,
  });

  const deletePhoto = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const deleteRoomPhoto = (index: number) => {
    const updatedPhotos = [...roomPhotos];
    updatedPhotos.splice(index, 1);
    setRoomPhotos(updatedPhotos);
  };

  const thumbs = photos.map((photo, index) => (
    <div key={index} className='w-32 h-32 m-2 relative z-10'>
      <img src={photo.preview} alt={`Preview ${index}`} className='w-full h-full object-cover' />
      <div className='absolute top-0 right-0 p-2'>
        <FontAwesomeIcon
          icon={faTrash}
          size={'2xs'}
          onClick={() => deletePhoto(index)}
          className='bg-black text-white p-2 rounded-md hover:bg-[#FF7400] duration-100 transition transform scale-105 hover:scale-125 cursor-pointer absolute top-0 right-1 lg:right-0 mt-2 mr-3'
        />
      </div>
    </div>
  ));

  const Roomthumbs = roomPhotos.map((photo, index) => (
    <div key={index} className='w-32 h-32 m-2 relative z-10'>
      <img src={photo.preview} alt={`Preview ${index}`} className='w-full h-full object-cover' />
      <div className='absolute top-0 right-0 p-2'>
        <FontAwesomeIcon
          icon={faTrash}
          size={'2xs'}
          onClick={() => deleteRoomPhoto(index)}
          className='bg-black text-white p-2 rounded-md hover:bg-[#FF7400] duration-100 transition transform scale-105 hover:scale-125 cursor-pointer absolute top-0 right-1 lg:right-0 mt-2 mr-3'
        />
      </div>
    </div>
  ));

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

    try {
      for (const villa_photos of photos) {
        await postPhotoVilla(idVilla, villa_photos.file);
      }
    } catch (error: any) {
      toast.error(error.message);
    }

    try {
      const createdRoom = await postRoomDetail(roomName, idVilla, bed, bath, price);
      const id_room = createdRoom.id;

      for (const room_photo of roomPhotos) {
        await postPhotoRoom(id_room, room_photo.file);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const create = async () => {
      try {
        const createdVilla = await postVillaDetail(name, description, latitude, longitude, selectedCity, priceStart);
        const id_villa = createdVilla.id;
        await store(id_villa);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    const save = create();

    toast
      .promise(save, {
        loading: 'Saving your villa',
        success: 'Successfuly create villa',
        error: 'Error when saving',
      })
      .then(() => {
        navigate('/dashboard/list');
      });

    setName('');
    setDescription('');
    setLatitude(0);
    setLongitude(0);
    setSelectedCity('');
    setSelectedCategories(['']);
    setSelectedFacilities(['']);
    setSelectedRules(['']);
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

  return (
    <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
      <Toaster />
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
        <div className='mb-6'>
          <MapComponent onLocationSelected={handleLocationSelected} />
        </div>

        {/* Villa price */}
        <div className='mb-5'>
          <label className='text-sm  text-gray-900 mr-2'>Price</label>
          <input
            onChange={(e) => setPriceStart(parseInt(e.target.value))}
            type='number'
            id='roomPrice'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Example : 275000'
            required
          ></input>
        </div>

        {/* Villa Photo */}
        <div className='mb-6'>
          <label className='block mb-2 text-lg font-medium text-gray-900 '>Add Villa Photos</label>
          <div className='border-2 p-5'>
            <div {...getRootPropsPhotos()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-gray-100 ${isDragActivePhotos ? 'border-blue-500' : 'border-gray-300'}`}>
              <input {...getInputPropsPhotos()} disabled={photos.length >= 6} />
              <p>Drag and drop some files here, or click to select files (Maks 6 photo)</p>
            </div>
            {thumbs.length > 0 && <div className='flex flex-wrap mt-4'>{thumbs}</div>}
            {photos.length >= 6 && <p className='mt-4 text-red-500'>You have reached the maximum limit of 6 photos.</p>}
          </div>
        </div>

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
              onChange={(e) => setRoomName(e.target.value)}
              type='text'
              id='roomName'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Example : Double Standard'
              required
            ></input>
          </div>
          <div className='flex gap-2'>
            <div className='w-full'>
              <label className='text-sm  text-gray-900 mr-2'>Bed</label>
              <input
                onChange={(e) => setBed(parseInt(e.target.value))}
                type='number'
                id='roomBed'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              ></input>
            </div>
            <div className='w-full'>
              <label className='text-sm  text-gray-900 mr-2'>Bathroom</label>
              <input
                onChange={(e) => setBath(parseInt(e.target.value))}
                type='number'
                id='roomBath'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              ></input>
            </div>
          </div>

          <div>
            <label className='text-sm  text-gray-900 mr-2'>Price</label>
            <input
              onChange={(e) => setPrice(parseInt(e.target.value))}
              type='number'
              id='roomPrice'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Example : 275000'
              required
            ></input>
          </div>

          {/* Room Photo */}
          <div className='mb-6'>
            <label className='block mb-2 text-lg font-medium text-gray-900 mt-3'>Add Room Photos</label>
            <div className='border-2 p-5'>
              <div {...getRootPropsRoom()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-gray-100 ${isDragActiveRoom ? 'border-blue-500' : 'border-gray-300'}`}>
                <input {...getInputPropsRoom()} disabled={roomPhotos.length >= 6} />
                <p>Drag and drop some files here, or click to select files (Maks 6 photo)</p>
              </div>
              {Roomthumbs.length > 0 && <div className='flex flex-wrap mt-4'>{Roomthumbs}</div>}
              {roomPhotos.length >= 6 && <p className='mt-4 text-red-500'>You have reached the maximum limit of 6 photos.</p>}
            </div>
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

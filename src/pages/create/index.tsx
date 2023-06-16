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
    <>
      <div className='fixed top-0 right-0 z-50'>
        <Toaster position='top-right' />
      </div>
      <div className='py-5 px-[50px] max-w-[1366px] mx-auto shadow-lg bg-white-50 mt-5 drop-shadow-2xl bg-white mb-5'>
        <h1 className='font-semibold text-2xl  '>Villa Information</h1>
        <form>
          {/* Villa Name */}
          <div className='mb-6 mt-5'>
            <label className='block mb-2 text-medium font-medium text-gray-900 '>
              Villa Name<span className='text-orange-500'>*</span>
            </label>
            <input
              type='text'
              onChange={(e) => setName(e.target.value)}
              id='name'
              className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
              placeholder='Example : Villa Cyan'
              required
            ></input>
          </div>

          {/* Location */}
          <div className='mb-6'>
            <div>
              <label htmlFor='city' className='block mb-2 text-medium font-medium text-gray-900'>
                Select City<span className='text-orange-500'>*</span>
              </label>
              <select
                id='city'
                name='city'
                value={selectedCity}
                onChange={handleCityChange}
                className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
              >
                <option value='' className='text-gray-100'>
                  -- Select a city --
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location on Map */}
          <div>
            <label htmlFor='map' className='block mb-2 text-medium font-medium text-gray-900'>
              Choose location on map<span className='text-orange-500'>*</span>
            </label>
            <div className='mb-6 border-orange-300 border-2 rounded-lg'>
              <MapComponent onLocationSelected={handleLocationSelected} />
            </div>
          </div>

          {/* Villa price */}
          <div className='mb-5'>
            <label className='text-sm  text-gray-900 mr-2'>
              Price<span className='text-orange-500'>*</span>
            </label>
            <input
              onChange={(e) => setPriceStart(parseInt(e.target.value))}
              type='number'
              id='roomPrice'
              className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
              placeholder='Example : 275000'
              required
            ></input>
          </div>

          {/* Villa Photo */}
          <div className='mb-6'>
            <label className='block mb-2 text-medium font-medium text-gray-900 '>
              Add Villa Photos<span className='text-orange-500'>*</span>
            </label>
            <div className='border p-5   text-gray-900 text-sm rounded-lg  focus:border-orange-500 hover:border-2 focus:ring-orange-500 outline-none block w-full  border-orange-300 dark:placeholder-gray-400 '>
              <div
                {...getRootPropsPhotos()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-orange-100 border-orange-300 hover:border-orange-500 ${isDragActivePhotos ? 'border-blue-500' : 'border-gray-300'}`}
              >
                <input {...getInputPropsPhotos()} disabled={photos.length >= 6} />
                <p>Drag and drop some files here, or click to select files (Min / Max 6 photo)</p>
              </div>
              {thumbs.length > 0 && <div className='flex flex-wrap mt-4'>{thumbs}</div>}
              {photos.length >= 6 && <p className='mt-4 text-red-500'>You have reached the maximum limit of 6 photos.</p>}
            </div>
          </div>

          {/* Category */}
          <div className='mb-6'>
            <label className='block mb-2 text-medium font-medium text-gray-900'>
              Category<span className='text-orange-500'>*</span>
            </label>
            {categoryList.map((item) => (
              <div className='flex mb-2' key={item.id}>
                <div className='flex items-center h-5'>
                  <input
                    id={item.id}
                    type='checkbox'
                    value={item.id}
                    checked={selectedCategories.includes(item.id)}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className={`w-4 h-4 rounded text-orange-500 form-checkbox focus:ring-3 focus:ring-blue-300 accent-orange-500 
            dark:text-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800`}
                  />
                </div>
                <label
                  className={`ml-2 text-sm text-gray-900 
          ${selectedCategories.includes(item.id) ? 'text-orange-500' : ''}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className='mb-6 mt-10'>
            <label className='block mb-2 text-medium font-medium text-gray-900'>
              Description<span className='text-orange-500'>*</span>
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              id='description'
              placeholder='write desription about your villa'
              required
              className='border text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5 border-orange-300 dark:placeholder-gray-400 resize-none h-40'
            ></textarea>
          </div>

          {/* HouseRules */}
          <div className=' mb-6'>
            <label className='block mb-2 text-medium font-medium text-gray-900 '>
              House Rules<span className='text-orange-500'>*</span>
            </label>
            {houseRulesList.map((item) => (
              <div className='flex mb-2' key={item.id}>
                <div className='flex items-center h-5'>
                  <input
                    onChange={(e) => handleRuleChange(e.target.value)}
                    id={item.id}
                    type='checkbox'
                    value={item.id}
                    checked={selectedRules.includes(item.id)}
                    className={`w-4 h-4 rounded text-orange-500 form-checkbox focus:ring-3 focus:ring-blue-300 accent-orange-500 
                dark:text-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800`}
                  />
                </div>
                <label
                  className={`ml-2 text-sm text-gray-900 
          ${selectedRules.includes(item.id) ? 'text-orange-500' : ''}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>

          {/* Facilities */}
          <div className=' mb-6'>
            <label className='block mb-2 text-medium font-medium text-gray-900 '>
              Facilities<span className='text-orange-500'>*</span>
            </label>
            {facilitiesList.map((item) => (
              <div className='flex mb-2' key={item.id}>
                <div className='flex items-center h-5'>
                  <input
                    onChange={(e) => handleFacilitiesChange(e.target.value)}
                    checked={selectedFacilities.includes(item.id)}
                    id={item.id}
                    type='checkbox'
                    value={item.id}
                    className={`w-4 h-4 rounded text-orange-500 form-checkbox focus:ring-3 focus:ring-blue-300 accent-orange-500 
                  dark:text-orange-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800`}
                  ></input>
                </div>
                <label
                  className={`ml-2 text-sm text-gray-900 
          ${selectedFacilities.includes(item.id) ? 'text-orange-500' : ''}`}
                >
                  {item.name}
                </label>
              </div>
            ))}
          </div>

          {/* Room */}
          <div className='mb-6 mt-10'>
            <label className='block mb-2 text-lg font-semibold text-gray-900 '>Room Information</label>
            <div>
              <label className='text-medium  text-gray-900 mr-2'>
                Room name<span className='text-orange-500'>*</span>
              </label>
              <input
                onChange={(e) => setRoomName(e.target.value)}
                type='text'
                id='roomName'
                className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
                placeholder='Example : Double Standard'
                required
              ></input>
            </div>
            <div className='flex gap-2'>
              <div className='w-full'>
                <label className='text-medium  text-gray-900 mr-2'>
                  Bed<span className='text-orange-500'>*</span>
                </label>
                <input
                  onChange={(e) => setBed(parseInt(e.target.value))}
                  type='number'
                  id='roomBed'
                  className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
                  required
                ></input>
              </div>
              <div className='w-full'>
                <label className='text-medium  text-gray-900 mr-2'>
                  Bathroom<span className='text-orange-500'>*</span>
                </label>
                <input
                  onChange={(e) => setBath(parseInt(e.target.value))}
                  type='number'
                  id='roomBath'
                  className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
                  required
                ></input>
              </div>
            </div>

            <div>
              <label className='text-medium  text-gray-900 mr-2'>
                Price<span className='text-orange-500'>*</span>
              </label>
              <input
                onChange={(e) => setPrice(parseInt(e.target.value))}
                type='number'
                id='roomPrice'
                className='border  text-gray-900 text-sm rounded-lg  focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5  border-orange-300 dark:placeholder-gray-400 '
                placeholder='Example : 275000'
                required
              ></input>
            </div>

            {/* Room Photo */}
            <div className='mb-6'>
              <label className='block mb-2 text-medium font-medium text-gray-900 mt-3'>
                Add Room Photos<span className='text-orange-500'>*</span>
              </label>
              <div className='border p-5   text-gray-900 text-sm rounded-lg  focus:border-orange-500 hover:border-2 focus:ring-orange-500 outline-none block w-full  border-orange-300 dark:placeholder-gray-400 '>
                <div {...getRootPropsRoom()} className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-orange-100 border-orange-300 hover:border-orange-500 ${isDragActiveRoom ? 'border-blue-500' : 'border-gray-300'}`}>
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
    </>
  );
}

export default CreateVilla;

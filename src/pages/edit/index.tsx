import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICategory, IVilla } from '../../utils/data';
import { getCategoryList, getVillaDetail, postPhotoRoom, postRoomDetail, updateVillaCategory, updateVillaDescription, updateVillaLocation, updateVillaMaps, updateVillaName, updateVillaPrice } from '../../utils/api';
import Badge from '../../components/Badge/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, Toaster } from 'react-hot-toast';
import Slider from '@mui/material/Slider';
import MapComponent from '../../components/Map/Maps';
import MapVillaEdit from '../../components/Map/MapVillaEdit';
import { useDropzone } from 'react-dropzone';
const cities = ['Denpasar', 'Kuta', 'Ubud', 'Seminyak', 'Canggu', 'Tabanan', 'Singaraja', 'Klungkung', 'Gianyar']; // Example city data

interface RoomPhoto {
  file: File;
  preview: string;
}

const VillaDetailEdit = () => {
  const { id } = useParams();

  // const villa = data.find((l) => l.id === (id || ''));

  const [villa, setVilla] = useState<IVilla | null>(null);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const data = await getVillaDetail(id);
        setVilla(data);
      } catch (error) {}
    };
    fetchVilla();
  }, [id]);

  useEffect(() => {
    // Extract the image URLs from the villa object and update the state
    if (villa && villa.photo) {
      const urls = villa.photo.map((item: any) => `https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/${item.id}/${item.path_photo}`);
      setImageUrls(urls);
    }
  }, [villa]);

  //Edit Villa Name
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(villa?.name);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedName(villa?.name); // Reset the edited name to the original villa name
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(villa?.name); // Reset the edited name to the original villa name
  };

  const handleNameChange = (e: any) => {
    setEditedName(e.target.value);
  };

  const handleSaveClick = async () => {
    try {
      await updateVillaName(id, editedName);
      setIsEditing(false);
      toast.success('Successfully updated villa name');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa name');
    }
  };

  //Edit Villa Description
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(villa?.description);

  const handleEditClickDescription = () => {
    setIsEditingDescription(true);
    setEditedDescription(villa?.description); // Reset the edited name to the original villa name
  };

  const handleCancelClickDescription = () => {
    setIsEditingDescription(false);
    setEditedDescription(villa?.description); // Reset the edited name to the original villa name
  };

  const handleDescriptionChange = (e: any) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveClickDescription = async () => {
    try {
      await updateVillaDescription(id, editedDescription);
      setIsEditingDescription(false);
      toast.success('Successfully updated villa description');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa description');
    }
  };

  //Edit Location
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [editedCity, setEditedCity] = useState(villa?.location);

  const handleEditClickCity = () => {
    setIsEditingCity(true);
  };

  const handleSaveClickCity = async () => {
    try {
      await updateVillaLocation(id, editedCity);
      setIsEditingCity(false);
      toast.success('Successfully updated villa location');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa location');
    }
  };

  const handleCancelClickCity = () => {
    setIsEditingCity(false);
    setEditedCity(villa?.location); // Reset the edited city to the original value
  };

  const handleCityChange = (e: any) => {
    setEditedCity(e.target.value);
  };

  //Edit location on Map
  const [isEditingMarker, setIsEditingMarker] = useState(false);
  const [latitude, setLatitude] = useState(villa?.lat);
  const [longitude, setLongitude] = useState(villa?.lng);

  const handleEditClickMarker = () => {
    setIsEditingMarker(true);
  };

  const handleSaveClickMarker = async () => {
    try {
      await updateVillaMaps(id, latitude, longitude);
      setIsEditingMarker(false);
      toast.success('Successfully updated villa location on Map');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa location on Map');
    }
    // Additional logic to handle the saved changes
  };

  const handleCancelClickMarker = () => {
    setIsEditingMarker(false);
  };

  const handleLocationSelected = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  //Edit Price
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([villa?.price || 0, villa?.price_end || 0]);

  const handleEditClickPrice = () => {
    setIsEditingPrice(true);
  };

  const handleSaveClickPrice = async () => {
    try {
      await updateVillaPrice(id, priceRange[0], priceRange[1]);
      setIsEditingPrice(false);
      toast.success('Successfully updated villa price');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa price');
    }
  };

  const handleCancelClickPrice = () => {
    setIsEditingPrice(false);
  };

  const handlePriceChange = (event: any, newValue: any) => {
    setPriceRange(newValue);
  };

  //Edit Category
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryList, setCategoryList] = useState<Array<ICategory>>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  // const [selectedCategories, setSelectedCategories] = useState<string[]>(villa?.category.map((item: any) => item.expand.detail_category.id));

  useEffect(() => {
    async function fetchData() {
      const records = await getCategoryList();
      setCategoryList(records);
    }
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(categoryId)) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  const handleEditClickCategory = () => {
    setIsEditingCategory(true);
  };

  const handleSaveClickCategory = async () => {
    try {
      const updatedCategoryIds = selectedCategories.map((item) => item.id);
      await updateVillaCategory(villa?.category.id, id, updatedCategoryIds);
      setIsEditingCategory(false);
      toast.success('Successfully updated villa category');
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      toast.error('Error when saving villa category');
    }
  };

  const handleCancelClickCategory = () => {
    setIsEditingCategory(false);
  };

  //Add room

  const [roomPhotos, setRoomPhotos] = useState<RoomPhoto[]>([]);
  const [isAddRoom, setIsAddRoom] = useState(false);

  const [roomName, setRoomName] = useState('');
  const [bed, setBed] = useState(0);
  const [bath, setBath] = useState(0);
  const [price, setPrice] = useState(0);

  const handleClickAddRoom = () => {
    setIsAddRoom(true);
  };

  const handleSaveAddRoom = async () => {
    try {
      const createdRoom = await postRoomDetail(roomName, id, bed, bath, price);
      const id_room = createdRoom.id;

      for (const room_photo of roomPhotos) {
        await postPhotoRoom(id_room, room_photo.file);
      }
      setIsAddRoom(false);
      toast.success('Successfully Add new room');
      window.location.reload(); // Reload the page after saving
    } catch (error: any) {
      toast.error('Error when add new Room');
    }

    // Additional logic to handle the saved changes
  };

  const handleCancelClickAddRoom = () => {
    setIsAddRoom(false);
  };

  const onDropRoom = useCallback((acceptedFiles: File[]) => {
    const newPhotos: RoomPhoto[] = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setRoomPhotos((prevPhotos) => [...prevPhotos, ...newPhotos].slice(0, 6));
  }, []);

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
  const deleteRoomPhoto = (index: number) => {
    const updatedPhotos = [...roomPhotos];
    updatedPhotos.splice(index, 1);
    setRoomPhotos(updatedPhotos);
  };

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

  return (
    <>
      <div className='fixed top-0 right-0 z-50'>
        <Toaster position='top-right' />
      </div>
      <div className='py-5 px-[50px] max-w-[1366px] mx-auto shadow-lg bg-white-50 mt-5 drop-shadow-2xl bg-white mb-5'>
        {villa && (
          <>
            <h1 className='font-semibold text-2xl  '>Villa Information</h1>

            {/* Villa Name */}
            <div className='mb-6 mt-5 '>
              {isEditing ? (
                <>
                  <label className='block mb-2 text-medium font-medium text-gray-900'>
                    Villa Name<span className='text-orange-500'>:</span>
                  </label>
                  <input
                    type='text'
                    id='villaName'
                    className='border text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5 border-orange-300 dark:placeholder-gray-400 mb-2'
                    value={editedName}
                    onChange={handleNameChange}
                    required
                  />
                  <div className='flex gap-2'>
                    <button className='px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600' onClick={handleSaveClick}>
                      Save
                    </button>
                    <button className='px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={handleCancelClick}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex gap-5 items-center'>
                  <label className='block text-medium font-medium text-gray-900'>
                    Villa Name<span className='text-orange-500'>:</span>
                  </label>
                  <p>{villa.name}</p>
                  <button className='px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600' onClick={handleEditClick}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Location */}
            <div className='mb-6 '>
              {isEditingCity ? (
                <>
                  <div>
                    <label htmlFor='city' className='block mb-2 text-medium font-medium text-gray-900'>
                      City<span className='text-orange-500'>:</span>
                    </label>
                  </div>
                  <select
                    id='city'
                    name='city'
                    className='border text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5 border-orange-300 dark:placeholder-gray-400 mb-2'
                    value={editedCity}
                    onChange={handleCityChange}
                    required
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
                  <div className='flex gap-2'>
                    <button className='px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600' onClick={handleSaveClickCity}>
                      Save
                    </button>
                    <button className='px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={handleCancelClickCity}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className='flex gap-5 items-center'>
                  <div>
                    <label htmlFor='city' className='block text-medium font-medium text-gray-900'>
                      City<span className='text-orange-500'>:</span>
                    </label>
                  </div>
                  <p>{villa.location}</p>
                  <button className='px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600' onClick={handleEditClickCity}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Location on map */}
            <div className='mb-6 '>
              {isEditingMarker ? (
                <>
                  <label className='block text-medium font-medium text-gray-900'>
                    Location on Map<span className='text-orange-500'>:</span>
                  </label>
                  <MapComponent onLocationSelected={handleLocationSelected} />

                  <div className='flex mt-2'>
                    <button className='bg-green-500 text-white px-4 py-1 rounded-md mx-2' onClick={handleSaveClickMarker}>
                      Save
                    </button>
                    <button className='bg-red-500 text-white px-4 py-1 rounded-md mx-2' onClick={handleCancelClickMarker}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className=' items-center gap-2'>
                  <div className='flex gap-3 mb-2'>
                    <label className='block text-medium font-medium text-gray-900'>
                      Location on Map<span className='text-orange-500'>:</span>
                    </label>
                    <button className='bg-blue-500 text-white px-4 py-1 rounded-md' onClick={handleEditClickMarker}>
                      Edit
                    </button>
                  </div>
                  <MapVillaEdit data={villa} />
                </div>
              )}
            </div>

            {/* Price */}
            <div className='mb-6  gap-2'>
              {isEditingPrice ? (
                <div className='mb-5'>
                  <label className='text-sm text-gray-900 mr-2'>
                    Price Range<span className='text-orange-500'>*</span> :
                  </label>
                  {priceRange[0].toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
                  <span> - </span>
                  {priceRange[1].toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
                  <Slider value={priceRange} onChange={handlePriceChange} valueLabelDisplay='auto' min={100000} max={5000000} step={100000} marks />
                  <div className='flex mt-3 gap-2'>
                    <button className='bg-green-500 text-white px-4 py-1 rounded-md ' onClick={handleSaveClickPrice}>
                      Save
                    </button>
                    <button className='bg-red-500 text-white px-4 py-1 rounded-md ' onClick={handleCancelClickPrice}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className='mb-6 flex gap-2 items-center'>
                  <div>
                    <label htmlFor='price' className='block text-medium font-medium text-gray-900'>
                      Price<span className='text-orange-500'>:</span>
                    </label>
                  </div>
                  <p className=''>
                    {villa.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    })}
                    <span> - </span>
                    {villa.price_end?.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    })}
                    <span className='text-sm text-black ml-1'> /night</span>
                  </p>
                  <button className='bg-blue-500 text-white px-4 py-1 rounded-md' onClick={handleEditClickPrice}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Category */}
            {/* <div className='flex gap-2 mb-5'>
              {isEditingCategory ? (
                <div>
                  <div className='mb-6'>
                    <label className='block mb-2 text-medium font-medium text-gray-900'>
                      Category<span className='text-orange-500'>:</span>
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
                  <div className='flex mt-3 gap-2'>
                    <button className='bg-green-500 text-white px-4 py-1 rounded-md ' onClick={handleSaveClickCategory}>
                      Save
                    </button>
                    <button className='bg-red-500 text-white px-4 py-1 rounded-md ' onClick={handleCancelClickCategory}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex gap-2 mb-5'>
                  <div>
                    <label htmlFor='category' className='block mb-2 text-medium font-medium text-gray-900'>
                      Category<span className='text-orange-500'>:</span>
                    </label>
                  </div>
                  {villa.category.map((item: any) => (
                    <div key={item.expand.detail_category.id}>
                      <Badge name={item.expand.detail_category.name} />
                    </div>
                  ))}
                  <button className='bg-blue-500 text-white px-4 py-1 rounded-md' onClick={handleEditClickCategory}>
                    Edit
                  </button>
                </div>
              )}
            </div> */}

            {/* Photo */}
            <div className='mb-6'>
              <div>
                <label htmlFor='photo' className='block mb-2 text-medium font-medium text-gray-900'>
                  Photo<span className='text-orange-500'>:</span>
                </label>
              </div>
              <div className='flex gap-3'>
                <div className=' h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[0]} />
                </div>
                <div className=' h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[1]} />
                </div>
                <div className=' h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[2]} />
                </div>
                <div className=' h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[3]} />
                </div>
                <div className='h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[4]} />
                </div>
                <div className=' h-[200px]'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[5]} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='mb-6 mt-5 '>
              {isEditingDescription ? (
                <>
                  <label className='block mb-2 text-medium font-medium text-gray-900'>
                    Villa Description<span className='text-orange-500'>:</span>
                  </label>
                  <textarea
                    onChange={handleDescriptionChange}
                    id='description'
                    value={editedDescription}
                    required
                    className='border mb-2 text-gray-900 text-sm rounded-lg focus:border-orange-500 focus:border-2 focus:ring-orange-500 outline-none block w-full p-2.5 border-orange-300 dark:placeholder-gray-400 resize-none h-40'
                  ></textarea>
                  <div className='flex gap-2'>
                    <button className='px-4 py-1 bg-green-500 text-white rounded-md hover:bg-green-600' onClick={handleSaveClickDescription}>
                      Save
                    </button>
                    <button className='px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600' onClick={handleCancelClickDescription}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className=' gap-5 items-center'>
                  <label className='block text-medium font-medium text-gray-900 mb-2'>
                    Villa Description<span className='text-orange-500'>:</span>
                  </label>
                  <p className='mb-1'>{villa.description}</p>
                  <button className='px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600' onClick={handleEditClickDescription}>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* House Rules */}
            {/* <div className='mb-6  gap-2'>
              <div>
                <label htmlFor='houserules' className='block mb-2 text-medium font-medium text-gray-900'>
                  House Rules<span className='text-orange-500'>:</span>
                </label>
              </div>
              <div className=''>
                {villa.house_rules.map((item: any) => (
                  <div key={item.expand.house_rules_detail.id} className=' '>
                    {item.allowed ? <h1 className=''>{item.expand.house_rules_detail.name}</h1> : <h1 className=' line-through'>{item.expand.house_rules_detail.name}</h1>}
                  </div>
                ))}
              </div>
            </div> */}

            {/* Room Information */}
            <div>
              <div className='my-5 '>
                <h1 className='text-lg font-semibold '>Room Information </h1>

                <div className=' gap-2 py-5 justify-between'>
                  {villa.room?.map((item: any) => (
                    <div key={item.id} className='mt-2'>
                      <div className='flex gap-2'>
                        <label htmlFor='roomName' className='block mb-2 text-medium font-medium text-gray-900'>
                          Room Name<span className='text-orange-500'>:</span>
                        </label>
                        <h1 className=''>{item.name}</h1>
                      </div>
                      <label htmlFor='houserules' className='block mb-2 text-medium font-medium text-gray-900'>
                        Room Photo<span className='text-orange-500'>:</span>
                      </label>
                      <div className=' flex gap-3'>
                        {item.expand['room_photo(room)']?.map((photo: any) => (
                          <div key={photo.id}>
                            <img src={`https://gis-api.pockethost.io/api/files/8vo79sa9oofehjs/` + photo.id + `/` + photo.path_room_photo} alt={item.name} className=' h-[150px] w-full shadow' />
                          </div>
                        ))}
                      </div>
                      <div className='flex flex-col justify-between '>
                        <div>
                          <div className='flex gap-2 items-center mt-1 text-xs'>
                            <FontAwesomeIcon icon={faBed} className='items-center' />
                            <h1 className='font-semibold '>Bed : {item.bed}</h1>
                          </div>
                          <div className='flex gap-2 items-center text-xs '>
                            <FontAwesomeIcon icon={faBath} className='items-center' />
                            <h1 className='font-semibold'>Bathroom : {item.bath}</h1>
                          </div>
                        </div>
                        <div className='mt-3 flex gap-2'>
                          <label htmlFor='roomName' className='block mb-2 text-medium font-medium text-gray-900'>
                            Room Price<span className='text-orange-500'>:</span>
                          </label>
                          <p className=' '>
                            {item.price_per_night.toLocaleString('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                            })}
                            <span className='text-sm text-black ml-1'> /night</span>
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>

              {isAddRoom ? (
                <div className='mb-6 mt-4'>
                  <label className='block mb-2 text-lg font-semibold text-gray-900 '>Add New room</label>
                  <>
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
                        <div
                          {...getRootPropsRoom()}
                          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-orange-100 border-orange-300 hover:border-orange-500 ${isDragActiveRoom ? 'border-blue-500' : 'border-gray-300'}`}
                        >
                          <input {...getInputPropsRoom()} disabled={roomPhotos.length >= 6} />
                          <p>Drag and drop some files here, or click to select files (Maks 6 photo)</p>
                        </div>
                        {Roomthumbs.length > 0 && <div className='flex flex-wrap mt-4'>{Roomthumbs}</div>}
                        {roomPhotos.length >= 6 && <p className='mt-4 text-red-500'>You have reached the maximum limit of 6 photos.</p>}
                      </div>
                    </div>
                  </>

                  {/* New Room */}

                  {/* <div className='flex justify-end'>
              <div onClick={addRoomForm} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'>
                Add Room +
              </div>
            </div> */}
                </div>
              ) : (
                <></>
              )}
              {isAddRoom ? (
                <div className='flex mt-2'>
                  <button className='bg-green-500 text-white px-4 py-1 rounded-md mx-2' onClick={handleSaveAddRoom}>
                    Save
                  </button>
                  <button className='bg-red-500 text-white px-4 py-1 rounded-md mx-2' onClick={handleCancelClickAddRoom}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className='bg-blue-500 text-white px-4 py-1 rounded-md' onClick={handleClickAddRoom}>
                  Add room +
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VillaDetailEdit;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IVilla } from '../../utils/data';
import { getVillaDetail } from '../../utils/api';
import Badge from '../../components/Badge/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <>
      <div className='py-5 px-[50px] max-w-[1366px] mx-auto shadow-lg bg-white-50 mt-5 drop-shadow-2xl bg-white mb-5'>
        {villa && (
          <>
            <h1 className='font-semibold text-2xl  '>Villa Information</h1>

            {/* Villa Name */}
            <div className='mb-6 mt-5 flex gap-2'>
              <label className='block mb-2 text-medium font-medium text-gray-900 '>
                Villa Name<span className='text-orange-500'>:</span>
              </label>
              <p className=''>{villa.name}</p>
            </div>

            {/* Location */}
            <div className='mb-6 flex gap-2'>
              <div>
                <label htmlFor='city' className='block mb-2 text-medium font-medium text-gray-900'>
                  City<span className='text-orange-500'>:</span>
                </label>
              </div>
              <p>{villa.location}</p>
            </div>

            {/* Price */}
            <div className='mb-6 flex gap-2'>
              <div>
                <label htmlFor='price' className='block mb-2 text-medium font-medium text-gray-900'>
                  Price<span className='text-orange-500'>:</span>
                </label>
              </div>
              <p className=''>
                {villa.price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
                <span className='text-sm text-black ml-1'> /night</span>
              </p>
            </div>

            {/* Category */}
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
            </div>

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
            <div className='mb-6 '>
              <div>
                <label htmlFor='description' className='block mb-2 text-medium font-medium text-gray-900'>
                  Description<span className='text-orange-500'>:</span>
                </label>
              </div>
              <p className=''>{villa.description}</p>
            </div>

            {/* House Rules */}
            <div className='mb-6  gap-2'>
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
            </div>

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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default VillaDetailEdit;

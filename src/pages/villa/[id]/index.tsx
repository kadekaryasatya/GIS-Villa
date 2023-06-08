import { useParams } from 'react-router-dom';
import { IVilla } from '../../../utils/data';
import { useState, useEffect } from 'react';
import { getVillaDetail } from '../../../utils/api';
import Badge from '../../../components/Badge/Badge';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Maps from '../../../components/Map/Map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';
import BoxInfo from '../../../components/BoxInfo/BoxInfo';

export default function VillaDetailPages() {
  // const { data } = props;
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
      {villa ? (
        <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
          <div className='container shadow-lg bg-white-50 py-5 px-5 mb-5 '>
            {/* Name and Location */}
            <div className='flex justify-between '>
              <h1 className='text-4xl font-semibold '>{villa.name}</h1>
            </div>
            <div className='flex gap-1 items-center mb-3 mt-2'>
              <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
              <p className='text-orange-500'>{villa.location}</p>
            </div>
            {/* Category */}
            {villa.category && (
              <>
                <div className='flex gap-2 mb-5'>
                  {villa.category.map((item: any) => (
                    <div key={item.expand.detail_category.id}>
                      <Badge name={item.expand.detail_category.name} />
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Photo */}
            {villa.photo && (
              <div className='-m-1 flex flex-wrap md:-m-2'>
                <div className='flex w-1/2 flex-wrap'>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[0]} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[1] ? imageUrls[1] : 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp'} />
                  </div>
                  <div className='w-full h-[250px] p-1 md:p-2'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[2] ? imageUrls[2] : 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp'} />
                  </div>
                </div>
                <div className='flex w-1/2 flex-wrap'>
                  <div className='w-full h-[250px] p-1 md:p-2'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[3] ? imageUrls[3] : 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp'} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[4] ? imageUrls[4] : 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp'} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[5] ? imageUrls[5] : 'https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp'} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='shadow-2xl bg-white-50 px-5 drop-shadow-2xl bg-white'>
            <div className='flex gap-10 '>
              {/* Left Content */}
              <div className='w-1/2'>
                {/* Description */}
                <>
                  <h1 className='text-2xl font-semibold mt-5'>Description</h1>
                  <h1 className=' mt-3 '>{villa.description}</h1>
                </>

                {/* House Rules */}
                {villa.house_rules && (
                  <>
                    <h1 className='text-2xl font-semibold mt-5'>House Rules </h1>
                    <div className='flex-col gap-2 mb-5 mt-3'>
                      {villa.house_rules.map((item: any) => (
                        <div key={item.expand.house_rules_detail.id} className=' bg-white-50 px-3 bg-white border shadow my-1'>
                          {item.allowed ? <h1 className='text-lg'>{item.expand.house_rules_detail.name}</h1> : <h1 className='text-lg line-through'>{item.expand.house_rules_detail.name}</h1>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right Content */}
              <div className='w-1/2 '>
                {/* Room */}
                {villa.room && (
                  <div className='my-5 shadow-lg  px-5 py-2 border rounded-2xl'>
                    <h1 className='text-lg font-semibold '>Room Available </h1>
                    <div className='flex-col gap-2 py-5 '>
                      {villa.room.slice(0, 3).map((item: any) => (
                        <div key={item.id} className='flex gap-5 mb-4 bg-orange-50 shadow py-2 px-4 rounded-2xl border'>
                          <div>
                            {item.expand['room_photo(room)']?.map((photo: any) => (
                              <img key={photo.id} src={`https://gis-api.pockethost.io/api/files/8vo79sa9oofehjs/` + photo.id + `/` + photo.path_room_photo} alt={item.name} className='w-[200px] h-[150px] rounded-xl shadow' />
                            ))}
                          </div>
                          <div className='flex flex-col justify-between'>
                            <div>
                              <h1 className='font-semibold text-lg'>{item.name}</h1>
                              <div className='flex gap-2 items-center mt-2'>
                                <FontAwesomeIcon icon={faBed} className='items-center' />
                                <h1 className='font-semibold text-sm'>Bed : {item.bed}</h1>
                              </div>
                              <div className='flex gap-2 items-center mt-2'>
                                <FontAwesomeIcon icon={faBath} className='items-center' />
                                <h1 className='font-semibold text-sm'>Bathroom : {item.bath}</h1>
                              </div>
                            </div>
                            <div>
                              <p className='font-semibold  mb-5  text-orange-600 '>
                                {item.price_per_night.toLocaleString('id-ID', {
                                  style: 'currency',
                                  currency: 'IDR',
                                })}
                                <span className='text-sm text-black ml-1'> /night</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Facilities */}
            {villa.facilities && (
              <>
                <h1 className='text-2xl font-semibold mt-5'>Facilities </h1>
                <div className='flex gap-2 mb-5 mt-3'>
                  {villa.facilities.map((item: any) => (
                    <div key={item.expand.facilities_name.id} className=''>
                      <BoxInfo name={item.expand.facilities_name.name}></BoxInfo>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className='mt-5'>
              <Maps />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
            <Skeleton height={400} className='mb-5' />
            <Skeleton height={500} className='' />
          </div>
        </>
      )}
    </>
  );
}

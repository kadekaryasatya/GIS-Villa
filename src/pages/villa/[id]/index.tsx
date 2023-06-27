import { useParams } from 'react-router-dom';
import { IVilla } from '../../../utils/data';
import { useState, useEffect } from 'react';
import { getVillaDetail } from '../../../utils/api';
import Badge from '../../../components/Badge/Badge';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed } from '@fortawesome/free-solid-svg-icons';
import BoxInfo from '../../../components/BoxInfo/BoxInfo';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MapVilla from '../../../components/Map/MapVilla';

export default function VillaDetailPages() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      <div className='py-5 px-[50px] max-w-[1366px] mx-auto'>
        <div className='container shadow-lg bg-white-50 py-5 px-5 mb-5 '>
          {/* Name  */}
          {villa ? (
            <div className='flex justify-between '>
              <h1 className='text-4xl font-semibold '>{villa.name}</h1>{' '}
            </div>
          ) : (
            <Skeleton height={50} width={300} className='mb-2' />
          )}

          {/* Location */}
          {villa ? (
            <div className='flex gap-1 items-center mb-3 mt-2'>
              <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
              <p className='text-orange-500'>{villa.location}</p>
            </div>
          ) : (
            <Skeleton width={250} className='mb-2' />
          )}

          {/* Category */}
          {villa ? (
            villa.category && (
              <>
                <div className='flex gap-2 mb-5'>
                  {villa.category.map((item: any) => (
                    <div key={item.expand.detail_category.id}>
                      <Badge name={item.expand.detail_category.name} />
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            <div className='flex gap-2 mb-5'>
              <Skeleton width={150} height={30} />
              <Skeleton width={150} height={30} />
              <Skeleton width={150} height={30} />
            </div>
          )}

          {/* Photo */}
          {villa ? (
            villa.photo && (
              <div className='-m-1 flex flex-wrap md:-m-2'>
                <div className='flex w-1/2 flex-wrap'>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[0]} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[1]} />
                  </div>
                  <div className='w-full h-[250px] p-1 md:p-2'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[2]} />
                  </div>
                </div>
                <div className='flex w-1/2 flex-wrap'>
                  <div className='w-full h-[250px] p-1 md:p-2'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[3]} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[4]} />
                  </div>
                  <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                    <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={imageUrls[5]} />
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className='-m-1 flex flex-wrap md:-m-2'>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                  <Skeleton height={180} />
                </div>
                <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                  <Skeleton height={180} />
                </div>
                <div className='w-full  p-1 md:p-2'>
                  <Skeleton height={180} />
                </div>
              </div>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-full p-1 md:p-2'>
                  <Skeleton height={180} />
                </div>
                <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                  <Skeleton height={180} />
                </div>
                <div className='w-1/2 p-1 md:p-2 h-[200px]'>
                  <Skeleton height={180} />
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
              {villa ? (
                <>
                  <h1 className='text-2xl font-semibold mt-5'>Description</h1>
                  <h1 className=' mt-3  '>{villa?.description}</h1>
                </>
              ) : (
                <Skeleton height={180} className='mt-2' />
              )}

              {/* House Rules */}
              {villa?.house_rules && (
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
              {villa ? (
                <div className='my-5 shadow-lg  px-5 py-2 border rounded-2xl'>
                  <h1 className='text-lg font-semibold '>Room Available </h1>
                  <div className='grid grid-cols-2 gap-2 py-5 justify-between'>
                    {villa.room?.map((item: any) => (
                      <div key={item.id} className='shadow-lg border '>
                        <div className='w-full'>
                          <Slider {...settings}>
                            {item.expand['room_photo(room)']?.map((photo: any) => (
                              <div key={photo.id}>
                                <img src={`https://gis-api.pockethost.io/api/files/8vo79sa9oofehjs/` + photo.id + `/` + photo.path_room_photo} alt={item.name} className=' h-[150px] w-full shadow' />
                              </div>
                            ))}
                          </Slider>
                        </div>
                        <div className='flex flex-col justify-between p-2'>
                          <div>
                            <h1 className='font-semibold text-lg'>{item.name}</h1>
                            <div className='flex gap-2 items-center mt-1 text-xs'>
                              <FontAwesomeIcon icon={faBed} className='items-center' />
                              <h1 className='font-semibold '>Bed : {item.bed}</h1>
                            </div>
                            <div className='flex gap-2 items-center text-xs '>
                              <FontAwesomeIcon icon={faBath} className='items-center' />
                              <h1 className='font-semibold'>Bathroom : {item.bath}</h1>
                            </div>
                          </div>
                          <div className='mt-3 flex justify-end'>
                            <p className='font-semibold  mb-2  text-orange-600 '>
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
              ) : (
                <Skeleton height={180} className='mt-2' />
              )}
            </div>
          </div>

          {/* Facilities */}
          {villa?.facilities && (
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
          <div className='mt-5 '>
            <h1 className='text-2xl font-semibold mt-5 mb-3'>Location on Map </h1>
            {villa && <MapVilla data={villa} />}
          </div>
        </div>
      </div>
    </>
  );
}

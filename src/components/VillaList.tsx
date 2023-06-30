import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVillaList } from '../utils/api';
import { IVilla } from '../utils/data';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function VillaList(): JSX.Element {
  const [villaList, setVillaList] = useState<Array<IVilla>>([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    async function fetchData() {
      const records = await getVillaList();
      setVillaList(records);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='px-10'>
        <img src='/background.jpg' alt='background' className='w-full h-[500px] rounded-xl object-cover' />
        <h1 className='absolute text-5xl  top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold mb-2 text-orange-500'>Explore villas</h1>
        <h1 className='absolute text-5xl  top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold mb-2'>that's perfect for you</h1>
      </div>

      <div className='lg:my-10 '>
        <div className='mt-24 mb-14 px-[100px] max-w-[1366px] mx-auto'>
          <h1 className='font-semibold text-orange-500 mb-3'>WHY CHOOSE EZV</h1>
          <div className='flex justify-between mb-5'>
            <div>
              <h1 className='text-4xl font-semibold '>Provides the most</h1>
              <h1 className='text-4xl font-semibold '>complete list of villa</h1>
            </div>
            <div>
              <h1 className='text-gray-500 '>Find the ideal villa that is most suitable for</h1>
              <h1 className='text-gray-500 '>you. Starting from houses minimalist,</h1>
              <h1 className='text-gray-500'>villa for sale that are exclusive and many more</h1>
            </div>
          </div>
        </div>

        <div className='flex justify-between mb-24 px-[100px] max-w-[1366px] mx-auto gap-2 '>
          <div className='p-8  w-full shadow-lg  rounded-lg'>
            <FontAwesomeIcon icon={faHome} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
            <h1 className='font-semibold text-xl'>Find your dream villa</h1>
          </div>
          <div className='p-8   w-full shadow-lg  rounded-lg '>
            <FontAwesomeIcon icon={faAddressBook} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
            <h1 className='font-semibold text-xl'>Find your dream villa</h1>
          </div>
          <div className='p-8   w-full shadow-lg  rounded-lg'>
            <FontAwesomeIcon icon={faPlusCircle} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
            <h1 className='font-semibold text-xl'>Create your own villa</h1>
          </div>
        </div>

        <div className='bg-gray-50'>
          <div className='px-[100px] max-w-[1366px] mx-auto py-10'>
            <h1 className='text-lg font-semibold text-orange-500 '>See our</h1>
            <h1 className='text-2xl font-semibold mb-5'>Popular villa</h1>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 '>
              {villaList.map((item: IVilla) => (
                <Link to={`/villa/${item.id}`} key={item.id}>
                  <div key={item.id} className='rounded-xl shadow-lg'>
                    <Slider {...settings}>
                      {item.photo?.map((villa: any) => (
                        <div key={villa.id} className=''>
                          <img src={`https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/` + villa.id + `/` + villa.path_photo} alt={villa.name} className='w-[300px] h-[200px] rounded-xl ' />
                        </div>
                      ))}
                    </Slider>
                    <div className='px-2 pb-2'>
                      <h2 className='font-semibold text-md mt-1'>{item.name}</h2>
                      <div className='flex gap-1 items-center'>
                        <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
                        <p className='text-sm'>{item.location}</p>
                      </div>
                      <p
                        className='text-sm font-semibold text-orange-500
          '
                      >
                        {item.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        })}
                        <span className='font-normal text-black'> /malam</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

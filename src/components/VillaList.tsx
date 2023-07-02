import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVillaList } from '../utils/api';
import { IVilla } from '../utils/data';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMagnifyingGlassLocation, faMapLocationDot, faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link as ScrollLink } from 'react-scroll';

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
      {/* Hero */}
      <div className='px-10'>
        <img src='/background.jpg' alt='background' className='w-full h-[500px] rounded-xl object-cover' />
        <h1 className='absolute text-5xl  top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold mb-2 text-orange-500'>Explore villas</h1>
        <h1 className='absolute text-5xl  top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold mb-2'>that's perfect for you</h1>
      </div>

      {/* Features */}
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
            <ScrollLink to='popular' smooth duration={500} offset={-50} className='cursor-pointer'>
              <FontAwesomeIcon icon={faHome} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
              <h1 className='font-semibold text-xl'>Find your dream villa</h1>
              <p className='text-gray-500 mt-5 '>Experience the efficiency and seamless </p>
              <p className='text-gray-500  '>navigation of our website as you explore</p>
              <p className='text-gray-500  '>and compare various villas.</p>
            </ScrollLink>
          </div>

          <div className='p-8   w-full shadow-lg  rounded-lg '>
            <ScrollLink to='maps' smooth duration={500} offset={-50} className='cursor-pointer'>
              <FontAwesomeIcon icon={faMapLocationDot} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
              <h1 className='font-semibold text-xl'>Explore villa on map</h1>
              <p className='text-gray-500 mt-5 '>Easily explore villas on our property website</p>
              <p className='text-gray-500  '> through an interactive map feature, allowing </p>
              <p className='text-gray-500  '>you to visualize their locations at a glance.</p>
            </ScrollLink>
          </div>

          <div className='p-8   w-full shadow-lg  rounded-lg'>
            <ScrollLink to='createvilla' smooth duration={500} offset={-50} className='cursor-pointer'>
              <FontAwesomeIcon icon={faPlusCircle} style={{ width: '50px', height: '50px', color: 'orange' }} className='mb-5' />
              <h1 className='font-semibold text-xl'>Create your own villa</h1>
              <p className='text-gray-500 mt-5 '>Unleash your creativity and design your own</p>
              <p className='text-gray-500  '> villa, and customizing every detail to match</p>
              <p className='text-gray-500  '> your unique vision.</p>
            </ScrollLink>
          </div>
        </div>

        {/* Popular Villa */}
        <div className='bg-gray-50' id='popular'>
          <div className='px-[100px] max-w-[1366px] mx-auto py-16'>
            <h1 className='text-lg font-semibold text-orange-500 '>See our</h1>
            <h1 className='text-2xl font-semibold mb-5'>Popular villa</h1>
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 '>
              {villaList.map((item: IVilla) => (
                <Link to={`/villa/${item.id}`} key={item.id}>
                  <div key={item.id} className='rounded-xl shadow-lg'>
                    <Slider {...settings}>
                      {item.photo?.map((villa: any) => (
                        <div key={villa.id} className=''>
                          <img src={`https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/` + villa.id + `/` + villa.path_photo} alt={villa.name} className=' rounded-xl w-full h-[250px] object-cover ' />
                        </div>
                      ))}
                    </Slider>
                    <div className='px-3 pb-4'>
                      <h2 className='font-semibold text-lg mt-1'>{item.name}</h2>
                      <div className='flex gap-1 items-center'>
                        <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
                        <p className='text-sm'>{item.location}</p>
                      </div>
                      <p className='text-sm font-semibold text-orange-500 mt-1'>
                        {item.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        })}
                        <span className='font-normal text-black'> / night</span>
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Maps */}
        <div className='mt-32 mb-32 px-[100px] max-w-[1366px] mx-auto' id='maps'>
          <div className='justify-between flex gap-20'>
            <div className='w-2/3  '>
              <img src='/maps.png' alt='background' className='w-full h-[400px] rounded-xl shadow-2xl border p-1' />
            </div>
            <div className='w-1/3 flex-col flex gap-5 py-10 mt-14'>
              <div>
                <h1 className='text-3xl font-semibold '>Explore Villa on map</h1>
                <h1 className='text-gray-500 mt-5 text-lg'>Search for villas around you based by the markers on the map</h1>
              </div>
              <Link
                to='/maps'
                className=' text-xl font-semibold capitalize text-orange-500 border rounded-[5px] border-orange-500  py-2  scale-90 hover:scale-100 hover:bg-orange-500 hover:text-white duration-100 transition transform ease-in hover:border-none w-[100px] flex justify-center gap-2 '
              >
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} className='text-orange hover:text-white' />
                <div>Go</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Create */}
        <div className='bg-gray-50 mb-20' id='createvilla'>
          <div className=' py-40 px-[100px] max-w-[1366px] mx-auto' id='maps'>
            <div className='justify-between flex gap-20'>
              <div className='w-1/3 flex-col flex gap-5 py-10'>
                <div>
                  <h1 className='text-3xl font-semibold '>Create your own villa</h1>
                  <h1 className='text-gray-500 mt-5 text-lg'>Tell us all about your stunning villa! The property villa information form below allows you to highlight its amenities and charm.</h1>
                </div>
                <Link
                  to='/create'
                  className=' text-xl font-semibold capitalize text-orange-500 border rounded-[5px] border-orange-500  py-2  scale-90 hover:scale-100 hover:bg-orange-500 hover:text-white duration-100 transition transform ease-in hover:border-none w-[150px] flex justify-center gap-2 items-center'
                >
                  <FontAwesomeIcon icon={faPlusCircle} className='text-orange hover:text-white' />
                  <div>Create</div>
                </Link>
              </div>
              <div className='w-2/3  '>
                <img src='/createImage.png' alt='background' className='w-full h-[300px] rounded-xl object-cover shadow-2xl ' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

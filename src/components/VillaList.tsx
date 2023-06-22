import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getVillaList } from '../utils/api';
import { IVilla } from '../utils/data';
import Slider from 'react-slick';

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
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 lg:my-10   '>
        {villaList.map((item: IVilla) => (
          <Link to={`/villa/${item.id}`} key={item.id}>
            <div key={item.id} className=''>
              <Slider {...settings}>
                {item.photo?.map((villa: any) => (
                  <div key={villa.id}>
                    <img src={`https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/` + villa.id + `/` + villa.path_photo} alt={villa.name} className='w-[300px] h-[200px] rounded-xl drop-shadow-xl' />
                  </div>
                ))}
              </Slider>
              <h2 className='font-semibold text-md mt-1'>{item.name}</h2>
              <div className='flex gap-1 items-center'>
                <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
                <p className='text-sm'>{item.location}</p>
              </div>
              <p
                className='text-sm font-semibold
          '
              >
                {item.price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
                <span className='font-normal'> /malam</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

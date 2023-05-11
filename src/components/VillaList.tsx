import { Link } from 'react-router-dom';
import { IVilla } from '../utils/data';
import { useEffect, useState } from 'react';
import { getVillaList } from '../utils/api';

export default function VillaList(): JSX.Element {
  const [villaList, setVillaList] = useState<Array<IVilla>>([]);

  useEffect(() => {
    async function fetchData() {
      const records = await getVillaList();
      setVillaList(records);
    }
    fetchData();
  }, []);

  console.log('villaList :>> ', villaList);
  return (
    <>
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 lg:my-10   '>
        {villaList.map((item) => (
          <Link to={`/villa/${item.id}`} key={item.id}>
            <div key={item.id} className=''>
              <img src={`https://gis-api.pockethost.io/api/files/784ca34x8mjab58/` + item.id + `/` + item.thumbnail} alt={item.name} className='w-[300px] h-[300px] rounded-xl drop-shadow-xl' />
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

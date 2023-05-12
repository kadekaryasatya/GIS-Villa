import { useParams } from 'react-router-dom';
import { IVilla } from '../../../utils/data';
import { useState, useEffect } from 'react';
import { getVillaDetail } from '../../../utils/api';

export default function VillaDetailPages() {
  // const { data } = props;
  const { id } = useParams();

  // const villa = data.find((l) => l.id === (id || ''));

  const [villa, setVilla] = useState<IVilla | null>(null);

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const data = await getVillaDetail(id);
        setVilla(data);
      } catch (error) {}
    };
    fetchVilla();
  }, [id]);

  return (
    <>
      {villa ? (
        <div className='py-5 px-[100px] max-w-[1366px] mx-auto'>
          <div className='flex justify-between'>
            <h1 className='text-4xl font-semibold '>{villa.name}</h1>
            <p className='text-lg font-semibold mt-2'>
              {villa.price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
              <span className='font-normal'> /malam</span>
            </p>
          </div>
          <div className='flex gap-1 items-center mb-5 mt-2'>
            <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
            <p className='text-orange-500'>{villa.location}</p>
          </div>
          <div className='container  py-2 l'>
            <div className='-m-1 flex flex-wrap md:-m-2'>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-1/2 p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
                <div className='w-1/2 p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
                <div className='w-full p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
              </div>
              <div className='flex w-1/2 flex-wrap'>
                <div className='w-full p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
                <div className='w-1/2 p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
                <div className='w-1/2 p-1 md:p-1'>
                  <img alt='gallery' className='block h-full w-full rounded-lg object-cover object-center' src={villa.photo} />
                </div>
              </div>
            </div>
          </div>
          <h1 className='text-2xl font-semibold mt-5'>Tentang Tempat ini </h1>
          <h1 className='text-lg mt-3 w-3/4'>{villa.description}</h1>
        </div>
      ) : (
        <>
          <p className='font-semibold text-4xl justify-center flex '>Sorry .... Villa Not found</p>
        </>
      )}
    </>
  );
}

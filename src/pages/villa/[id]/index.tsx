import { useParams } from 'react-router-dom';
import { IVilla } from '../../../utils/data';
import { useState, useEffect } from 'react';
import { getVillaDetail } from '../../../utils/api';
import Badge from '../../../components/Badge/Badge';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

          <hr />
          {/* Category */}
          {villa.category && (
            <>
              <div className='flex gap-2 py-5'>
                {villa.category.map((item: any) => (
                  <div key={item.expand.detail_category.id}>
                    <Badge name={item.expand.detail_category.name} />
                  </div>
                ))}
              </div>
            </>
          )}
          <hr className='mb-5' />

          {/* Photo */}
          {villa.photo && (
            <div className='py-2 grid grid-cols-4 gap-1 '>
              {villa.photo.map((item: any) => (
                <img key={item.id} src={`https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/` + item.id + `/` + item.path_photo} alt={item.name} className='w-[300px] h-[300px] rounded-xl drop-shadow-xl' />
              ))}
            </div>
          )}

          {/* Description */}
          <>
            <h1 className='text-2xl font-semibold mt-5'>Description</h1>
            <h1 className='text-lg mt-3 w-3/4'>{villa.description}</h1>
          </>

          {/* House Rules */}
          {villa.house_rules && (
            <>
              <h1 className='text-2xl font-semibold mt-5'>House Rules </h1>
              <div className='flex-col gap-2 py-5'>
                {villa.house_rules.map((item: any) => (
                  <div key={item.expand.house_rules_detail.id}>{item.allowed ? <h1 className='text-lg'>{item.expand.house_rules_detail.name}</h1> : <h1 className='text-lg line-through'>{item.expand.house_rules_detail.name}</h1>}</div>
                ))}
              </div>
            </>
          )}

          {/* Room */}
          {villa.room && (
            <>
              <h1 className='text-2xl font-semibold mt-5'>Room</h1>
              <div className='flex-col gap-2 py-5'>
                {villa.room.map((item: any) => (
                  <div key={item.id}>
                    <h1 className='text-lg'>{item.name}</h1>
                    <h1 className='text-lg'>{item.bed}</h1>
                    <p className='text-lg font-semibold mt-2'>
                      {item.price_per_night.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}
                      <span className='font-normal'> /malam</span>
                    </p>
                    {/* {item.expand.map((photo: any) => (
                      <div key={photo.id}> </div>
                    ))} */}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className='py-5 px-[100px] max-w-[1366px] mx-auto'>
            <Skeleton height={200} />
          </div>
        </>
      )}
    </>
  );
}

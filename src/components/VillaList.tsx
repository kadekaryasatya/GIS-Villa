import { Link } from 'react-router-dom';
import { IVilla } from '../utils/data';

export default function VillaList(props: { data: Array<IVilla | any> }): JSX.Element {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 lg:my-10   '>
      {props.data.map((item) => (
        <Link to={`/villa/${item.id}`}>
          <div key={item.id} className=''>
            <img src={item.photo} alt={item.name} className='w-[300px] h-[300px] rounded-xl drop-shadow-xl' />
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
  );
}

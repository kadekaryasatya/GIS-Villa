import { IVilla } from '../utils/data';

export default function VillaList(props: { data: Array<IVilla | any> }): JSX.Element {
  return (
    <div className='grid lg:grid-cols-4 gap-5 lg:my-10   '>
      {props.data.map((item) => (
        <div key={item.id}>
          <img src={item.photo} alt={item.name} className='w-[300px] h-[300px] rounded-xl' />
          <h2 className='font-semibold text-md mt-1'>{item.name}</h2>
          <p className='text-sm'>{item.location}</p>
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
      ))}
    </div>
  );
}

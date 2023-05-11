import { IVilla } from '../../utils/data';

const VillaInfo = (props: { data: IVilla }) => {
  const { data } = props;
  return (
    <div className=' border-lg w-[200px]'>
      <img src={`https://gis-api.pockethost.io/api/files/784ca34x8mjab58/` + data.id + `/` + data.thumbnail} alt={data.name} className='w-full h-[150px]  rounded-md drop-shadow-xl' />
      <div className='p-2'>
        <h2 className='text-lg'>{data.name}</h2>
        <p
          className='text-sm font-semibold
          '
        >
          {data.price.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
          <span className='font-normal'> /malam</span>
        </p>
        <p>{data.location}</p>
      </div>
    </div>
  );
};

export default VillaInfo;

import { IVilla } from '../../utils/data';
import Badge from '../Badge/Badge';

const VillaInfo = (props: { data: IVilla }) => {
  const { data } = props;
  return (
    <div className=' border-lg w-[200px] text-black'>
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
        <div className='flex gap-1 items-center'>
          <img src='/icons/location.png' alt='location' className='h-4 cursor-pointer' />
          <p className='text-sm mt-1'>{data.location}</p>
        </div>
        <p className='line-clamp-2 mt-1'>{data.description}</p>

        {/* Category */}
        {data.category && (
          <>
            <div className='py-2 flex gap-1'>
              {data.category.slice(0, 3).map((item: any) => (
                <div key={item.expand.detail_category.id}>
                  <Badge name={item.expand.detail_category.name} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VillaInfo;

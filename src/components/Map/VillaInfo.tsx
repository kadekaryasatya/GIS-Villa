import { IVilla } from '../../utils/data';
import Badge from '../Badge/Badge';
import Slider from 'react-slick';

const VillaInfo = (props: { data: IVilla }) => {
  const { data } = props;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className=' border-lg w-[200px] text-black'>
      {data.photo && (
        <Slider {...settings}>
          {data.photo.map((item: any) => (
            <div key={item.id}>
              <img src={`https://gis-api.pockethost.io/api/files/dvuh6i6d1rxa2so/` + item.id + `/` + item.path_photo} alt={item.name} className='w-[300px] h-[200px] rounded-xl drop-shadow-xl' />
            </div>
          ))}
        </Slider>
      )}
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

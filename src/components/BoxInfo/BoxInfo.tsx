import { faSwimmingPool, faCar, faFan, faTv, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BoxInfo(props: { name?: string; onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center justify-center px-[10px] shadow-[1px_1px_10px_rgb(63,62,62,0.16)] rounded-xl aspect-square w-[100px]`} onClick={() => props.onClick?.()}>
      <div>{props.name === 'Swimming Pool' && <FontAwesomeIcon icon={faSwimmingPool} style={{ width: '30px', height: '30px', color: 'orange' }} className='text-primary text-lg md:text-3xl' />}</div>
      <div>{props.name === 'Tv' && <FontAwesomeIcon icon={faTv} style={{ width: '30px', height: '30px', color: 'orange' }} className='text-primary text-lg md:text-3xl' />}</div>
      <div>{props.name === 'Parking' && <FontAwesomeIcon icon={faCar} style={{ width: '30px', height: '30px', color: 'orange' }} className='text-primary text-lg md:text-3xl' />}</div>
      <div>{props.name === 'Fan' && <FontAwesomeIcon icon={faFan} style={{ width: '30px', height: '30px', color: 'orange' }} className='text-primary text-lg md:text-3xl' />}</div>
      <div>{props.name === 'Wi-fi' && <FontAwesomeIcon icon={faWifi} style={{ width: '30px', height: '30px', color: 'orange' }} className='text-primary text-lg md:text-3xl' />}</div>

      <div className={`hidden lg:block`}>
        <p className={`text-center text-sm font-semibold`}>{props.name}</p>
      </div>
    </div>
  );
}

import { Button } from '../Button/DeafultButton';
import { SearchItemLabel, SearchItemText, SearchItemWrapper } from './SearchItem';

export default function SearchBar() {
  return (
    <div className='lg:flex justify-center gap-10'>
      <div className={`rounded-2xl flex items-center border border-neutral-300`}>
        <div className='relative'>
          <SearchItemWrapper>
            <>
              <SearchItemLabel>
                <p className='flex'>Where Are You Going?</p>
              </SearchItemLabel>
              <SearchItemText>
                <p className='flex'>Search location ,Villa?</p>
              </SearchItemText>
            </>
          </SearchItemWrapper>
        </div>

        <div className='relative w-36'>
          <SearchItemWrapper>
            <>
              <SearchItemLabel>
                <p className='flex'>Check In</p>
              </SearchItemLabel>
              <SearchItemText>
                <p className='flex'>Select Dates</p>
              </SearchItemText>
            </>
          </SearchItemWrapper>
        </div>

        <div className='relative w-36'>
          <SearchItemWrapper>
            <>
              <SearchItemLabel>
                <p className='flex'>Check Out</p>
              </SearchItemLabel>
              <SearchItemText>
                <p className='flex'>Select Dates</p>
              </SearchItemText>
            </>
          </SearchItemWrapper>
        </div>

        <div className='relative w-36'>
          <SearchItemWrapper>
            <>
              <SearchItemLabel>
                <p className='flex'>Price Range</p>
              </SearchItemLabel>
              <SearchItemText>
                <p className='flex'>Set Price</p>
              </SearchItemText>
            </>
          </SearchItemWrapper>
        </div>
      </div>
      <div className='rounded-2xl border bg-orange-500 w-28 cursor-pointer'>
        <Button isCustomButton className='flex mx-auto'>
          <p className=' text-white text-sm mt-4 '>Search</p>
        </Button>
      </div>
    </div>
  );
}

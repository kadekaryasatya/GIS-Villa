export default function Navbar() {
  return (
    <div className='flex justify-between py-5  px-10 shadow bg-orange-50'>
      <img src='/icons/ezvlogo.ico' alt='logo' className=' lg:h-10 lg:w-[80px] w-[70px] h-8 cursor-pointer' />
      <img src='/icons/Hamburger.png' alt='hamburger' className='h-7 cursor-pointer' />
    </div>
  );
}

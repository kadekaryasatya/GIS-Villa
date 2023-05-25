export default function BoxInfo(props: { name?: string; onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center justify-center px-[10px] shadow-[1px_1px_10px_rgb(63,62,62,0.16)] rounded-xl aspect-square w-[100px]`} onClick={() => props.onClick?.()}>
      <div>{/* <FontAwesomeIcon icon={props.icon as IconName} className='text-primary text-lg md:text-3xl' /> */}</div>
      <div className={`hidden lg:block`}>
        <p className={`text-center text-sm font-semibold`}>{props.name}</p>
      </div>
    </div>
  );
}

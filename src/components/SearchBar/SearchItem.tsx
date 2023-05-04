export function SearchItemWrapper(props: { children: JSX.Element; id?: string; isActive?: boolean; className?: string; onClick?: () => void }) {
  return (
    <div className={`relative p-2 px-8 rounded-xl  transition-all cursor-pointer ${props.isActive ? 'bg-white shadow-2xl border-orange-500 border' : 'hover:bg-neutral-300 '} ${props.className}`}>
      {props.onClick && <div id={props.id} className='absolute w-full h-full top-0 left-0' onClick={props.onClick}></div>}
      {props.children}
    </div>
  );
}

export function SearchItemLabel(props: { children: JSX.Element }) {
  return <div className='text-xs font-semibold  line-clamp-1   '>{props.children}</div>;
}

export function SearchItemText(props: { children: JSX.Element }) {
  return <div className='text-xs  text-slate-400 mt-1  text-left line-clamp-1'>{props.children}</div>;
}

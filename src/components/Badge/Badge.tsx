function Badge(props: { name?: string }) {
  return (
    <div className='rounded-3xl border py-1 px-2 border-orange-500'>
      <p className=''>{props.name}</p>
    </div>
  );
}

export default Badge;

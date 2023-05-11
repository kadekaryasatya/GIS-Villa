import SearchBar from '../../components/SearchBar/SearchBar';
import VillaList from '../../components/VillaList';

export default function VillaListPages() {
  return (
    <div className='App py-5 px-[100px] max-w-[1366px] mx-auto'>
      <SearchBar />
      <VillaList />
    </div>
  );
}

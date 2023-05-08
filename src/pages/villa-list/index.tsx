import SearchBar from '../../components/SearchBar/SearchBar';
import VillaList from '../../components/VillaList';
import { ListVilla } from '../../utils/data';

export default function VillaListPages() {
  return (
    <>
      <SearchBar />
      <VillaList data={ListVilla} />
    </>
  );
}

import SearchBar from './components/SearchBar/SearchBar';
import VillaList from './components/VillaList';
import { ListVilla } from './utils/data';

function App() {
  return (
    <div className='App py-5 px-[100px] max-w-[1366px] mx-auto'>
      <SearchBar />
      <VillaList data={ListVilla} />
    </div>
  );
}

export default App;

import Maps from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
// import VillaDetailPages from './pages/villa/[id]';
import { Route, Routes } from 'react-router-dom';
import VillaDetailPages from './pages/villa/[id]';
import CreateVilla from './pages/create';
import Listing from './pages/dashboard/list';
// import { ListVilla } from './utils/data';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Maps />} />
        <Route path='/villa-list' element={<VillaListPages />} />
        <Route path='/villa/:id' element={<VillaDetailPages />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/dashboard/list' element={<Listing />} />
        <Route path='/create' element={<CreateVilla />} />
      </Routes>
    </>
  );
}

export default App;

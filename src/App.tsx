import Maps from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
import { Route, Routes } from 'react-router-dom';
import VillaDetailPages from './pages/villa/[id]';
import CreateVilla from './pages/create';
import Listing from './pages/dashboard/list';
import VillaDetailEdit from './pages/edit';
// import { ListVilla } from './utils/data';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<VillaListPages />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/villa/:id' element={<VillaDetailPages />} />
        <Route path='/maps' element={<Maps />} />
        <Route path='/dashboard/list' element={<Listing />} />
        <Route path='/dashboard/villa/:id' element={<VillaDetailEdit />} />
        <Route path='/create' element={<CreateVilla />} />
      </Routes>
    </>
  );
}

export default App;

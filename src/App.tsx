import Maps from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
// import VillaDetailPages from './pages/villa/[id]';
import { Route, Routes } from 'react-router-dom';
// import VillaDetailPages from './pages/villa/[id]';
// import { ListVilla } from './utils/data';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<VillaListPages />} />
        <Route path='/villa-list' element={<VillaListPages />} />
        {/* <Route path='/villa/:id' element={<VillaDetailPages data={ListVilla} />} /> */}
        <Route path='/maps' element={<Maps />} />
      </Routes>
    </>
  );
}

export default App;

import Maps from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
// import VillaDetailPages from './pages/villa/[id]';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VillaDetailPages from './pages/villa/[id]';
import { ListVilla } from './utils/data';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VillaListPages />} />
          <Route path='/maps' element={<Maps />} />
          <Route path='/villa/:id' element={<VillaDetailPages data={ListVilla} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

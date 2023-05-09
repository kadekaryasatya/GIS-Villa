import Maps from './components/Map/Map';
import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
// import VillaDetailPages from './pages/villa/[id]';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VillaListPages />} />
          <Route path='/maps' element={<Maps />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

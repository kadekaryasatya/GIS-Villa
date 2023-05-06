import Navbar from './components/Navbar/Navbar';
import VillaListPages from './pages/villa-list';
// import VillaDetailPages from './pages/villa/[id]';

function App() {
  return (
    <div className='App py-5 px-[100px] max-w-[1366px] mx-auto'>
      <Navbar />
      <VillaListPages />
    </div>
  );
}

export default App;

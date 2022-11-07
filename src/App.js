import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';
import GeneratePage from './pages/GeneratePage';
import Header from './components/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/generate' element={<GeneratePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

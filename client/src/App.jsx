import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
//Se importan los componentes de las vistas y el navBar que es nuestra barra de navegacion
//import LandingPage from './views/landingPage/landingPage';
//import HomePage from './views/homePage/homePage';
//import DetailPage from './views/detailPage/detailPage';
//import NavBar from '../src/components/navBar/navBar';
//import CreatePage from './views/createPage/createPage';
//estilado
import './App.css'

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== '/'  }
      <NavBar />
      <Routes>
        <Route exact path="/home" element={<HomePage/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  )
};

export default App;
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
//Se importan los componentes de las vistas y el navBar que es nuestra barra de navegacion
import Home from '../src/views/home/home';
import Landing from '../src/views/landing/Landing';
import Detail from '../src/views/detail/Detail';
import NavBar from '../src/components/navBar/NavBar';
import Create from '../src/views/create/Create';

//estilado
import './App.css'

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
    <div className="App">
      {pathname !== '/' && <NavBar />}

      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route path="/" element={<Landing/>} />
        <Route path="/home/:id" element={<Detail />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </div>
    </>
  )
};

export default App;
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import LinksPage from './Pages/LinksPage'
import './App.css';

function App() {
  return (
    <main className="App" >
      <Header />
      <div className="App-menu">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='links' element={<LinksPage />} />
        </Routes>
      </div>
      

    </main>
  );
}

export default App;

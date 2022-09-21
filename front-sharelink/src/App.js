import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import LinksPage from './Pages/LinksPage'
import ValidateEmail from './components/ValidateEmail';
import MyLinks from './Pages/MyLinks';
import './App.css';
import NewLink from './components/NewLink';

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
          <Route path='users/validate/:registration_code' element={<ValidateEmail />} />
          <Route path='mylinks' element={<MyLinks />} />
          <Route path='/links/:id' element={<NewLink />} />
        </Routes>
      </div>
   

    </main>
  );
}

export default App;

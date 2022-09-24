import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Pages/HomePage/HomePage';
import Login from './Pages/LoginPage/LoginPage';
import SignUp from './Pages/SignUpPage/SignUpPage';
import LinksPage from './Pages/LinksPage/LinksPage'
import ValidateEmail from './components/ValidateEmail/ValidateEmail';
import MyLinksPage from './Pages/MyLinksPage/MyLinksPage';
import DeleteLink from './components/DeleteLink/DeleteLink';
import Footer from './components/Footer/Footer';
import { Suspense, useState } from 'react';
import EditLink from './components/EditLink/EditLink';
import Loading from './components/Loading/Loading';
import './App.css';

function App() {
  const [response, setResponse] = useState([]);
  return (
    <main className="App" >
      <Header />
      <div className="App-menu">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='links' element={<LinksPage response={response} setResponse={setResponse} />} />
            <Route path='users/validate/:registration_code' element={<ValidateEmail />} />
            <Route path='mylinks' element={<MyLinksPage />} />
            <Route path='mylinks/delete/:id' element={<DeleteLink />} />
            <Route path='mylinks/edit/:id' element={<EditLink />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />


    </main>
  );
}

export default App;

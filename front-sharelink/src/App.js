import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import './App.css';

function App() {
  return (
    <main className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
      </Routes>
    </main>
  );
}

export default App;

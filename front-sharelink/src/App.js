import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/HomePage/HomePage";
import Login from "./Pages/LoginPage/LoginPage";
import SignUp from "./Pages/SignUpPage/SignUpPage";
import Header from "./components/Header/Header";
import LinksPage from "./Pages/LinksPage/LinksPage";
import ValidateEmail from "./components/ValidateEmail/ValidateEmail";
import MyLinksPage from "./Pages/MyLinksPage/MyLinksPage";
import DeleteLink from "./components/DeleteLink/DeleteLink";
import Footer from "./components/Footer/Footer";
import { Suspense, useState } from "react";
import EditLink from "./components/EditLink/EditLink";
import Loading from "./components/Loading/Loading";
import GetUser from "./components/User/GetUser";
import EditUser from "./components/EditUser/EditUser";
import EditPass from "./components/Password/EditPass";
import RecoverPass from "./components/Password/RecoverPass";
import ErrorBoundary from "./ErrorBoundary";
import MessageStatus from "./components/MessageStatus/MessageStatus";
import RecoverNewPass from "./components/Password/RecoverNewPass";
import DeleteUser from "./components/DeleteUser/DeleteUser";
import "./App.css";

function App() {
  // búsqueda de links
  const [result, setResult] = useState();

  const [key, setKey] = useState(0);

  const reload = () => setKey((k) => k + 1);

  const location = useLocation();

  return (
    <main className="App">
      <Header />
      <div className="App-menu">
        <ErrorBoundary
          key={location.pathname}
          fallback={
            <MessageStatus
              message="¡ups! Algo a salido mal...prueba a logearte de nuevo"
              navigate="login"
            />
          }
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route
                path="links"
                element={
                  <LinksPage
                    fetchKey={key}
                    reload={reload}
                    setResult={setResult}
                    result={result}
                  />
                }
              />
              <Route
                path="users/validate/:registration_code"
                element={<ValidateEmail />}
              />
              <Route path="mylinks" element={<MyLinksPage />} />
              <Route path="mylinks/delete/:id" element={<DeleteLink />} />
              <Route path="mylinks/edit/:id" element={<EditLink />} />
              <Route path="users/:id" element={<GetUser />} />
              <Route path="users/edit/:id" element={<EditUser />} />
              <Route path="/users/:id/password" element={<EditPass />} />
              <Route path="/users/recover_password" element={<RecoverPass />} />
              <Route path="/deleteuser" element={<DeleteUser />} />
              <Route
                path="users/recover_password/recover_newpassword"
                element={<RecoverNewPass />}
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
      <Footer />
    </main>
  );
}

export default App;

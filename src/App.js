import { HashRouter, Routes, Route } from "react-router-dom";
//import LoginPage from "./pages/LoginPage";
//import Login0 from "./components/Login0";
import Bidones from "./pages/Bidones";
//import ProtectedRoutes from "./components/ProtectedRoutes";
//import Config from "./components/Config";
import NavBar from "./components/NavBar";
//import LoadingPage from "./components/LoadingPage";
//import { useSelector } from "react-redux";
import "./styles/styles.css";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";

function App() {
  //const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      <NavBar />

      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/bidones/" element={<Bidones />} />
          <Route path="/calendar/" element={<CalendarPage />} />
          <Route path="/kgCosechados/" element={<CalendarPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

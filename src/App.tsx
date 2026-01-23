import './App.css'
import {MainLogin} from "./pages/MainLogin.tsx";
import {Route, Routes} from "react-router-dom";
import {useAuth} from "./contexts/AuthContext.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";

function App() {
    const { isAuthenticated } = useAuth()
  return (
    <>
        <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <MainLogin/>}></Route>
        </Routes>
    </>
  )
}

export default App

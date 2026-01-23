import './App.css'
import {MainLogin} from "./pages/MainLogin.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "./pages/Dashboard.tsx";
import {PrivateRoute} from "./components/PrivateRoute.tsx";
import {useAuth} from "./contexts/AuthContext.tsx";

function App() {
    const { isAuthenticated } = useAuth()
  return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace/> : <Navigate to="/login" replace/>}></Route>
            <Route path="/login" element={<MainLogin/>}/>
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
        </Routes>
  )
}

export default App

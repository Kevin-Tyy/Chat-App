import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Test from './test'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Home/>}/>

        </Routes>      
      </BrowserRouter>
    
  </>
  )
}
export default App

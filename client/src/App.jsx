import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path='/home' exact element={<Home/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

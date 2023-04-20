import Login from "./Login"
import Register from "./Register"
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/register" exact element={<Register/>}/>
        <Route path="/login" exact element={<Login/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

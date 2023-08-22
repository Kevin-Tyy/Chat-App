import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
// import Test from './test'
import { BrowserRouter, Route, Routes , Navigate} from 'react-router-dom'
function App() {
  return (
    <>  
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Home/>}/>
          <Route path="/" element={<Navigate to="/dashboard"/>}/>

        </Routes>      
      </BrowserRouter>
    
  </>
  )
}
export default App

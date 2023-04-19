import Login from "./Login"
import Register from "./Register"
import axios from 'axios'
function App() {
  
  axios.defaults.baseURL = 'https://localhost:4000/api'
  axios.defaults.withCredentials = true  

  return (
    <Register/>
    // <Login/>
  )
}

export default App

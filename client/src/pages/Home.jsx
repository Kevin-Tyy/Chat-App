import axios from 'axios'
import React from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Home = () => {
    const navigate = useNavigate()

    const populateDashboard = async () => {
      const token = localStorage.getItem('token');
      const data  = await axios.get('http://localhost:4000/api/dashroute' , {
        headers : {
          'Authorization': 'Bearer ' + token
          
        }

      })
 
      console.log(data);

      
    }
    useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
        const user = jwt_decode(token)
          if(!user){
            localStorage.removeItem('token');
            navigate('/login');
            
          }else{
            populateDashboard();
            alert('token has been found in local storage');

          }
      }else{
        navigate('/login');
      }

    },[])
  return (
    <div>Home</div>
  )
}

export default Home
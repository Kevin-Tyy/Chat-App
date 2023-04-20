import React, { useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
const Home = () => {
    useEffect(()=>{
        const jwtCookie = document.cookie[0];
        if (jwtCookie){  
                return(
                    <h1>Home</h1>
                )
        } else {

          <Navigate to="/login"/>
        }
    }, [])
}

export default Home
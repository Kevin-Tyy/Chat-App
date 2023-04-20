import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
const Home = () => {
    const populateHome = async () =>{
        const { data } = await axios.get('http://localhost:4000/api/protectedroute');

        console.log(data);
    }
    useEffect(()=>{
        populateHome()
    }, [])
  return (
    <div>Home</div>
  )
}

export default Home
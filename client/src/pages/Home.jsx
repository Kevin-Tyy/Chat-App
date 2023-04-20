import React from 'react'

const Home = () => {
    const jwtCookie = document.cookie.split(';').find(cookie => cookie.startsWith('token='));
    if (jwtCookie && jwtCookie.split('=')[1]) {
        return (
            <div>Home</div>
        
          )
      } else {
        window.location.href = '/login';
      }

}

export default Home
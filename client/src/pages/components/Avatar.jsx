import React from 'react'
import { Avatar } from '@mui/material'


const AvatarComponent = ({userId, userName, online}) => {
    const colors = [
        '#ff5c5c09d','#ff63ff9d','#4f78e99d', '#009e9e9d', '#f7b7429d','#ffff539d', '#64fdcf9d'
    ];
    const userIdBase10 = parseInt(userId, 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];
  return (
    <div className='relative'>
      <Avatar sx={{ bgcolor : color , color: '#2c2c2c' , textTransform : 'uppercase' , fontSize: '15px', fontWeight: 'bold'}}>{userName[0]}</Avatar>
      {online 
          ? (<div className='w-4 h-4 absolute bg-green-500 right-0 bottom-0 rounded-full border border-white'></div>)
          : (<div className='w-4 h-4 absolute bg-gray-500 right-0 bottom-0 rounded-full border border-white'></div>)
      }
    </div>
  )
}

export default AvatarComponent
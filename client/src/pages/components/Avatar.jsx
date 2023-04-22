import React from 'react'
import { Avatar } from '@mui/material'


const AvatarComponent = ({userId, userName}) => {
    const colors = [
        '#ff5c5c09d','#ff63ff9d','#4f78e99d', '#009e9e9d', '#f7b7429d','#ffff539d', '#64fdcf9d'
    ];
    const userIdBase10 = parseInt(userId, 16);
    const colorIndex = userIdBase10 % colors.length;
    const color = colors[colorIndex];
  return (
    <Avatar sx={{ bgcolor : color , color: '#2c2c2c' , textTransform : 'uppercase' , fontSize: '15px', fontWeight: 'bold'}}>{userName[0]}</Avatar>
  )
}

export default AvatarComponent
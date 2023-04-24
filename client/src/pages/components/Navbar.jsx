import React from 'react'
import Logo from './logo'
import { Avatar, Button, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Navbar = ({username}) => {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div className='flex  justify-between items-center h-16 bg-gray-200 shadow-md'>
        <div className='ml-5 mt-3'>
           <Logo/>

        </div>
        <div className='flex justify-between items-center '>
            <div className=' pr-7 cursor-pointer'>

                <Tooltip title={`Logged in as ${username}`}>
                    <Avatar sx={{textTransform: 'capitalize'}}>
                        {username[0]}
                    </Avatar>

                </Tooltip>
            </div>
            <Button className="button" sx={{ textTransform : 'capitalize  ', }} onClick={logout}>
                Log out

            </Button>

        </div>
    </div>
  )
}

export default Navbar
import { Box, Toolbar, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import RequiredAuth from '../RequireAuth'
import { useAppDispatch } from '@/store/store'
import { useNavigate } from 'react-router-dom'
import { signOut } from '@/store/slices/authSlice'

const drawerWidth: number = 240

const Layout = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px')
  const [open, setOpen] = useState(isNonMobile ? true : false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const SignOut = () => {
    dispatch(signOut()).then((_) => {
      navigate('/signin', { replace: true })
    })
  }

  return (
    <Box className='flex'>
      <Header
        drawerWidth={drawerWidth}
        open={open}
        toggleDrawer={toggleDrawer}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        open={open}
        toggleDrawer={toggleDrawer}
        SignOut={SignOut}
      />
      <div className='flex flex-col w-full'>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <RequiredAuth/>
        </Box>
        <Footer />
      </div>
    </Box>
  )
}

export default Layout

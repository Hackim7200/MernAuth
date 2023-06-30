import React from 'react'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import  'react-toastify/dist/ReactToastify.css'






function App() {
  return (
    <>
    <Header/> 
    <ToastContainer/>
    <Container className='my-2'>
      <Outlet/> 
      {/* // where output is used you can use it to set the general design of the website e.g., header,footer */}

    </Container>
    </>



  )
}

export default App
import React, { useState } from 'react'
import Hero from '../components/Hero'
import Button from 'react-bootstrap/Button';





const HomeScreen = () => {

  const [count, setCount] = useState(0)
  return (
    <div>
        <Hero/> 

        {/* hero is a component that the viewer see first  */}

        <h2>Count {count}</h2>
        <Button variant="success" onClick={()=>setCount(count+1)}>+</Button>{' '}
        <Button variant="danger" onClick={()=>setCount(count-1)}>-</Button>{' '}



    </div>
  )
}

export default HomeScreen
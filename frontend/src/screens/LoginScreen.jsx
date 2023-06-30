import { useEffect, useState } from "react";
import { Form,Button, Row,Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";

import {useLoginMutation} from '../slices/userApiSlice'
import {setCredential} from '../slices/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";





const LoginScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail]= useState("") 
    const [password, setPassword]= useState("") 
    
    const [login,{isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state)=> state.auth);
    
    
    
    
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    
    },[userInfo,navigate])
    
    
    const submitHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await login({email,password}).unwrap();
            dispatch(setCredential({...res}));
            navigate('/')
            
        } catch (err) {
            toast.error(err?.data?.message || err.error) // this is the response from the api , since its a 401 bad req its considered error, the pass or email is incorrect

            
        }

    
    
    }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label> Email address</Form.Label>
                <Form.Control type="email"
                placeholder="enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label> Email address</Form.Label>
                <Form.Control type="password"
                placeholder="enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Group>

            {isLoading && <Loader/>}

            <Button type="submit" variant="primary" className="mt-3">Sign in</Button>

            <Row>
                <Col>
                New customer? <Link to="/register">Register</Link>
                </Col>
            </Row>

        </Form>

    </FormContainer>
    
  
  )
  
}

export default LoginScreen
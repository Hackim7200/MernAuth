import { useState } from "react";
import { Form,Button, Row,Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {useRegisterMutation} from '../slices/userApiSlice'
import {setCredential} from '../slices/authSlice'





const RegisterScreen = () => {
    const [name, setName]= useState("") 
    const [email, setEmail]= useState("") 
    const [password, setPassword]= useState("") 
    const [confirmpassword, setConfirmPassword]= useState("") 

    const [register,{isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state)=> state.auth);

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const submitHandler = async (e)=>{
        e.preventDefault();

        if(password !== confirmpassword){
            toast.error('passwords dont match')

        }else{

            try {
                const res = await register({name, email, password}).unwrap()
                dispatch(setCredential({...res}));
                navigate('/');
                
            } catch (err) {
                toast.error(err?.data?.message || err.error)
                
            }
        }
    }

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
                <Form.Label> Name</Form.Label>
                <Form.Control type="text"
                placeholder="enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
                <Form.Label> Email address</Form.Label>
                <Form.Control type="email"
                placeholder="enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-2" controlId="password">
                <Form.Label> password</Form.Label>
                <Form.Control type="password"
                placeholder="enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label> confirm password  </Form.Label>
                <Form.Control type="password"
                placeholder="confirm password"
                value={confirmpassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            {isLoading && <Loader/>}
            <Button type="submit" variant="primary" className="mt-3">Register now</Button>

            <Row>
                <Col>
                Already have an account? <Link to="/login">login</Link>
                </Col>
            </Row>

        </Form>

    </FormContainer>
    
  
  )
  
}

export default RegisterScreen
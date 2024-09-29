import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom'
import { useAuth } from '../../context/auth';

const Login = () => {
    const [auth,setAuth] = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    // form function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(
                `/api/v1/auth/login`,
                {email,password}
            );
            // console.log("Response",res.data);//Speacial Note the property is sucess
            // console.log("ResponseReport",res.data.success)
            if(res.data.success){
                toast.success(res.data.messsage)
                // console.log('yess')
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data));
                // console.log(localStorage.getItem('auth'))   
                navigate(location.state||'/'); 
            }
            else{
                toast.error(res.data.message)
            }
        }
        catch (error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout title={'Login-Page SB'}>
        <div className='register'>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
    
    <div className="mb-3">
        <input type="email" className="form-control"  placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
    </div>
    <div className="mb-3">
        <input type="password" className="form-control"  placeholder='Enter Your Password' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
    </div>
    <div className='mb-3'>
        <button type="submit" className="btn btn-primary">   Login      </button>
    </div>
    <button className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>

    </form>
        </div>
    </Layout>
  )
}

export default Login
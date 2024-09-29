import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")

    const navigate = useNavigate()

    // form function
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(
                `/api/v1/auth/forgot-password`,
                {email,newPassword,answer}
            );
            // console.log("Response",res.data);//Speacial Note the property is sucess
            // console.log("ResponseReport",res.data.success)
            if(res && res.data.success){
                toast.success(res.data && res.data.messsage)
                // console.log('yess')
                navigate("/login");
            }
            else{
                toast.error(res.data.messsage)
            }
        }
        catch (error){
            console.log(error)
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout title={'Forgot-Password - SB'}>
        <div className='register'>
        <h1>
            Reset Password
        </h1>
            <form onSubmit={handleSubmit}>
    
    <div className="mb-3">
        <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
    </div>
    <div className="mb-3">
        <input type="text" className="form-control" id="exampleInputAnswer" placeholder='Enter Your Answer' value={answer} onChange={(e)=>{setAnswer(e.target.value)}} required/>
    </div>
    <div className="mb-3">
        <input type="password" className="form-control" id="exampleInputNewPassword" placeholder='Enter Your New Password' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} required/>
    </div>
    <div className='mb-3'>
        <button type="submit" className="btn btn-primary"> Reset Password </button>
    </div>
    <button type="submit" className="btn btn-primary" onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>

    </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword
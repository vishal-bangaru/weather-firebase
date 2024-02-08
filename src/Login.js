import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate,Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "./firebaseconfig"
function Login() {
  
  let [err,setErr]=useState("");
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors}}=useForm();
   let submitForm= async(userObj)=>{
     try{
     const user=await signInWithEmailAndPassword(auth,userObj.username,userObj.password);
     if(user){
      localStorage.setItem("email",auth.currentUser.email)
     navigate('/homepage')
     }
    else
    setErr("Invalid credentials")
     }
     catch(error)
     {
       setErr(error.message)
     }
   }
 
  return (
    <div className='form' >
      <h1 className=" text-center text-white  bg-danger p-2 opacity-75 shadow rounded">WEATHER APP</h1>
      <div className="row ">
      {/* <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2">
      <div className="container  rounded w-2 bg-white">
        <div className="row"> */}
         
         <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2 ">
      <form onSubmit={handleSubmit(submitForm)} className="mt-5 fo me-auto shadow p-5 rounded">
      <h1 className="mb-3 text-dark opacity-75 fw-bold fs-1 display-5 mb-5 ">LOGIN </h1>
      { (err.length!=0 )?  <p className='text-danger fs-5'>{err}</p> : <p></p>}
      <input type="text" className="form-control mb-3 p-3 inp" placeholder="Email" 
        {...register("username",{required:true,minLength:"4"})}/>

        {errors.username?.type==="required" && <p className="text-danger fs-5 ">*Email is required</p>}
        {errors.username?.type==="minLength" && <p className="text-danger fs-5 ">*minimum 4 characters are required</p>}
        {errors.username?.type==="maxLength" && <p className="text-danger fs-5 ">*maximum 8 characters are required</p>}

        <input type="password" className="form-control mb-3 p-3 inp" placeholder="Password" 
        {...register("password",{required:true,minLength:"4"})}/>
        {errors.password?.type==="required" && <p className="text-danger fs-5 ">*Password is required</p>}
        {errors.password?.type==="minLength" && <p className="text-danger fs-5 ">*minimum 4 characters are required</p>}
        {errors.password?.type==="maxLength" && <p className="text-danger fs-5 ">*maximum 8 characters are required</p>}
        
        <div className=''>
        <button type="submit" className="btn btn-dark mt-3 opacity-75">LOGIN</button>
        <div className=''>
        <p className='mt-2 mb-1 fs-5 text-danger lead'>Don't Have An Account?</p>
        <Link className="reg"  to="/register">Register</Link>
        </div>
        </div>
        </form>

         </div>
        </div>
        
      </div>  
    
  )
}

export default Login
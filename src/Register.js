import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "./firebaseconfig"
import {db} from "./firebaseconfig"
import { collection,doc,addDoc} from "firebase/firestore";
import axios from 'axios';
function Register(props) {
  const navigate=useNavigate();
    let {register,handleSubmit,formState:{errors}}=useForm();
    let [err,SetErr]=useState("")
    const usersCollectionRef=collection(db,"users")
   let submitForm=async(userObj)=>{
            try{
            const fbuser=await createUserWithEmailAndPassword(auth,userObj.username,userObj.password);
           const dateString = fbuser.user.metadata.creationTime;
            const date = new Date(dateString);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
            await addDoc(usersCollectionRef,{username:userObj.name,status:"active",added_date:formattedDate})
            if(props.add==="true")
            SetErr("User Added")
            else if(fbuser)
            navigate('/');
            else
            SetErr("Invalid credentials")
            }
            catch(error)
            {
                SetErr(error.message)
            }    

        }  

  return (
    <div className='register' >
    <div className="row ">
    {/* <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2">
    <div className="container  rounded w-2 bg-white">
      <div className="row"> */}
     
       <div className="col-11 col-sm-8 col-md-8 mx-auto  mt-5 p-2">
 

    <form onSubmit={handleSubmit(submitForm)} className="mt-5 fo ms-auto shadow rounded p-5">
    <h1 className="mb-3 text-dark opacity-75 fw-bold fs-1 display-5 mb-5 ">REGISTER</h1>
     { (err.length!==0 )?  <p className='text-danger fs-5'>{err}</p> : <p></p>}
    <input type="text" className="form-control mb-3 p-3 inp" placeholder="Email" 
      {...register("username",{required:true,minLength:"4"})}/>

      {errors.username?.type==="required" && <p className="text-danger fs-5 ">*Email is required</p>}
      {errors.username?.type==="minLength" && <p className="text-danger fs-5 ">*minimum 4 characters are required</p>}
      {errors.username?.type==="maxLength" && <p className="text-danger fs-5 ">*maximum 8 characters are required</p>}

      <input type="text" className="form-control mb-3 p-3 inp" placeholder="Username" 
      {...register("name",{required:true})}/>
      <input type="password" className="form-control mb-3 p-3 inp" placeholder="Password" 
      {...register("password",{required:true,minLength:"4"})}/>
      {errors.password?.type==="required" && <p className="text-danger fs-5 ">*Password is required</p>}
      {errors.password?.type==="minLength" && <p className="text-danger fs-5 ">*minimum 4 characters are required</p>}
      {errors.password?.type==="maxLength" && <p className="text-danger fs-5 ">*maximum 8 characters are required</p>}
      
      <div className=''>
      <button type="submit" className="btn btn-dark mt-3 mb-5 opacity-75">Register</button>
      </div>
      </form>

       </div>
      </div>
    </div>  
   
  )
}

export default Register;
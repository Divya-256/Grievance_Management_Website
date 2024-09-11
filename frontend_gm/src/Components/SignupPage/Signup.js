import React, { useState } from 'react'
import axios from 'axios';
import './Signup.css';
export default function Signup() {
    const[formData,setFormData]=useState({
        'username':'',
        'email':'',
        'password':''
    })
    const[errorMessage,setErrorMessage]=useState(null);
    const[successMessage,setSuccessMessage]=useState(null);
    const handleChange=(e)=>{
         setFormData({...formData,[e.target.name]:[e.target.value]});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('/api/signup',formData);
            setSuccessMessage("Signup successful! You can now login.");
        }
        catch(error){
            if(error.response && error.status ==409){
                setErrorMessage("User already exist with the same email.Please log in.");
            }
            else{
                setErrorMessage("Signup failed.Please try again.");
            }
           
        }

    }

  return (
    <div className='signupForm'onSubmit={handleSubmit}>
      <h1>SIGNUP</h1>
      <div className='innerForm'>
       <form>
          <div className='formGroup'>
            <label>Name</label>
            <input type='text' name='username' value={formData.username} onChange={handleChange} required></input>
          </div>
          <div className='formGroup'>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} required></input>
          </div>
          <div className='formGroup'>
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} required></input>
          </div>
          <div className='formGroup'>
            <button type='submit'>Submit</button>
          </div>
          {successMessage && <div style={{color:'green'}}>{successMessage}</div>}
          {errorMessage && <div style={{color:'red'}}>{errorMessage}</div>}
       </form>

       </div>
    </div>
  )
}

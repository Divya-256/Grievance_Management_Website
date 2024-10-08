import React, { useState } from 'react'
import axios from 'axios';
import './Signup.css';
import { BASE_URL } from '../../Config/config';
import { Link } from 'react-router-dom';

export default function EmployeeSignup() {
    
    const[formData,setFormData]=useState({
        'name':'',
        'email':'',
        'password':'',
        'role':null
    })
    const[errorMessage,setErrorMessage]=useState(null);
    const[successMessage,setSuccessMessage]=useState(null);
    const handleChange=(e)=>{
         setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            console.log(formData);
            const response = await axios.post(`${BASE_URL}/api/users/signup`,formData,{
              headers: {
                  'Content-Type': 'application/json',
              },
              withCredentials: true,  // Optional: Only if cookies or credentials are needed
          });
            console.log(response);
            if(response.status=== 200){
                setSuccessMessage(
                    <>
                        Signup successful! You can now <Link to="/login" style={{ color: 'blue' }}>login</Link>.
                    </>
                );
            }
        }
        catch(error){
            if(error.response && error.status === 500){
                setErrorMessage(<>
                    User already exist with the same email.Please <Link to="/login" style={{ color: 'blue' }}>login</Link>.
                </>);
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
            <input type='text' name='name' value={formData.username} onChange={handleChange} required></input>
          </div>
          <div className='formGroup'>
            <label>Email</label>
            <input type='email' name='email' value={formData.email} onChange={handleChange} required></input>
          </div>
          <div className='formGroup'>
            <label>Password</label>
            <input type='password' name='password' value={formData.password} onChange={handleChange} required></input>
          </div>
          <div className="formGroup">
                        <label>Role: </label>
                        <select name='role' value={formData.role} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="SUPERVISOR">SuperVisor</option>
                            <option value="Technicians">Technicians</option>
                            <option value="Software_Engineers">Software Engineers</option>
                            <option value="Performance_Analysts">Performance Analysts</option>
                            <option value="Network_Administrators">Network Administrators</option>
                        </select>
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

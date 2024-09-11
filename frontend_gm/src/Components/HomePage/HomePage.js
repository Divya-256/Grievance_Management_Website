import React from 'react'
import './HomePage.css'
export default function HomePage() {
  return (
    <div className='homePage'>

            <h1> Grievance Management System</h1>
         
      
            <div className='aboutUs'>
                <h2>About Us</h2>
                <h3>Our system is designed to streamline the process of registering, tracking, and resolving any laptop-related complaints. Whether you're a student, employee, or IT support personnel, we aim to ensure that your technical issues are resolved swiftly and effectively.
                </h3>
            </div>
         <div className='homeLogin'>
            <div className='aboutUs2'>
                <h2>How It Works</h2>
                <ol>
                    <li> Sign Up: Create your account to access the system.</li>
                    <li> Log In: Log in to submit your grievances or manage your assigned tasks.</li>
                    <li> Submit a Grievance: Fill out a simple form with the details of your laptop issue.</li>
                    <li>Track Progress: Monitor the status of your complaint as it's reviewed, assigned, and resolved.</li>
                    <li> Receive Updates: Get notifications when your grievance status is updated or resolved.</li>
                </ol>
        
            </div>
            <div className='aboutUs3'>
                    <h2>Why Choose Us?</h2>
                    <ol>
                        <li>Efficient Resolution: Faster resolution of technical issues.</li>
                        <li>Transparent Process: Clear and transparent communication from complaint submission to resolution.</li>
                        <li> Responsive Support: Dedicated support team to help you with any concerns</li>
                    </ol>
                
                </div>
           </div>
        

            
        <div className='homeBottom'>
        <h2 className='startHeading'>Get Started</h2>
        <div className='homeBottom11'>
            <div className='homeBottom1'>
            <h2>Register Now to submit your first grievance or track existing complaints.</h2>
                <button className='register'><a href='/signup' >Register Now</a></button>
            </div>
            <div className='homeBottom2'>
            <h2>Already have an account? </h2><button className='register'><a href='/login'>Login Here.</a></button>
            </div>

        </div>
        </div>
    </div>
  )
}

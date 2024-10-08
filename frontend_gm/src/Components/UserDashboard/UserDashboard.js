import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Config/config';
import './UserDashboard.css';
import { UserContext } from '../UserContext/userContext';  
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [complaint, setComplaint] = useState('');
    const [submittedGrievances,setSubmittedGrievances]=useState([]);
      
    useEffect(() => {
        if(!user) navigate('/login');
        fetchSubmittedGrievances();
        setEmail(user);
    }, []);

    
    const fetchSubmittedGrievances = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/grievances/user/${user}`, { withCredentials: true });
            console.log(res.data);
            setSubmittedGrievances(res.data);
        } catch (error) {
            alert('Failed to fetch previous grievances!');
        }
    };

    const submitGrievance = async (e) => {
        e.preventDefault();
        try {
            // const token = localStorage.getItem('token'); 
            const res = await axios.post(`${BASE_URL}/grievances`, 
                { name, email, category, address, complaint },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,  // Optional: Only if cookies or credentials are needed
                }
            );
            fetchSubmittedGrievances();
            console.log(res);
            alert("Grievance submitted!");
        } catch (error) {
            alert('Failed to submit the grievance!',error);
        }
    };

    return (
        <div className='grievForm'>
            <h1>Grievance Management Website</h1>
            <h2>User Dashboard</h2>
            <div>
            <h3>Register your complaints here</h3>
            <div className='outerForm'>

            
            <form onSubmit={submitGrievance} className='compForm'>
                <div className="firstSet">
                <div className='row1'>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        {/* <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
                        <div>{user}</div>
                    </div>
                </div>
               <div className="row2">
                <div className="form-group">
                        <label>Address: </label>
                        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                                  
                                        <option value="Hardware Issue">Hardware Issue</option>
                                        <option value="Software Issue">Software Issue</option>
                                        <option value="Network Connectivity">Network Connectivity</option>
                                        <option value="Battery Issue">Battery Issue</option>
                                        <option value="Performance Issue">Performance Issue</option>
                                    </select>
                    </div>
               </div>
               </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea  value={complaint} onChange={(e) => setComplaint(e.target.value)} required />
                </div>
                <button type="submit">Submit Grievance</button>
            </form>
            </div>
            </div>
            <div className='prevGriev'>
                <h2>Previously Submitted Grievances</h2>
                <div className="grievance-list">
                    
                    {submittedGrievances.length>0?(
                        <table>
                        
                        <tr>
                                <tr>
                                <th>Grievance Id</th>    
                                <th>Category</th>
                                <th>Description</th>
                                <th>Submitted At</th>
                                <th>Status</th>
                                <th>Feedback</th>
                                </tr>
                            {submittedGrievances.map((grievance)=>(
                                
                                <tr key={grievance.id}>
                                    <td>{grievance.id}<br/></td>
                                    <td>{grievance.category} <br /></td>
                                    <td>{grievance.complaint}<br/></td>
                                    <td>{new Date(grievance.createdAt).toLocaleString()}</td>
                                    <td>{grievance.status} <br /></td>
                                    <td>{grievance.feedback?grievance.feedback:"No feedback yet"} <br /></td>
                                </tr>
                            ))}
                        
                        </tr>
                        </table>
                    ):(
                        <p>No grievances submitted yet.</p>
                    )}
                    
                        
                    
                </div>
            </div>
        </div>
    );
}

import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './UserDashboard.css';  

export default function UserDashboard() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submittedGrievances,setSubmittedGrievances]=useState([]);
      
    // useEffect(() => {
    //     fetchSubmittedGrievances();
    // }, []);

    //remove below useeffect to display by fetching actual data,this is provided for demo view of previously submitted grievance
    useEffect(() => {
       
        const mockGrievances = [
            {
                id: 1,
                category: 'Electricity Issue',
                status: 'Pending',
                createdAt: '2023-09-04T10:30:00'
            },
            {
                id: 2,
                category: 'Water Supply Issue',
                status: 'Resolved',
                createdAt: '2023-09-02T15:45:00'
            },
            {
                id: 3,
                category: 'Road Maintenance',
                status: 'In Progress',
                createdAt: '2023-09-01T09:00:00'
            }
        ];
        setSubmittedGrievances(mockGrievances);
       
    }, []);
    
    const fetchSubmittedGrievances = async () => {
        try {
            const token = localStorage.getItem('token'); 
            const response = await axios.get('/api/complaints/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubmittedGrievances(response.data);
        } catch (error) {
            alert('Failed to fetch previous grievances!');
        }
    };

    const submitGrievance = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); 
            await axios.post('/api/grievances', 
                { name, email, address, category, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchSubmittedGrievances();
            alert("Grievance submitted!");
        } catch (error) {
            alert('Failed to submit the grievance!');
        }
    };

    return (
        <div className='grievForm'>
            <h1>Grievance Management Website</h1>
            <h2>User Dashboard</h2>
            <h3>Register your complaints here</h3>
            <form onSubmit={submitGrievance} className='compForm'>
                <div className="form-group">
                    <label>Name: </label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Address: </label>
                    <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Category: </label>
                    <input type="text"  value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <button type="submit">Submit Grievance</button>
            </form>


            <h3>Previously Submitted Grievances</h3>
            <div className="grievance-list">
                {submittedGrievances.length>0?(
                     <ul>
                        {submittedGrievances.map((grievance)=>(
                            <li key={grievance.id}>
                                <strong>Category:</strong> {grievance.category} <br />
                                <strong>Status:</strong> {grievance.status} <br />
                                <strong>Submitted At:</strong> {new Date(grievance.createdAt).toLocaleString()}
                            </li>
                        ))}
                       
                     </ul>
                ):(
                    <p>No grievances submitted yet.</p>
                )}
                
                    
                
            </div>

        </div>
    );
}

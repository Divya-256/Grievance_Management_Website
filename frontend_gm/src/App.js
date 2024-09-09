import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import SuperVDashboard from './Components/SupervisorDashboard/SuperVDashboard';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
           <Route path='/userDashboard' element={<UserDashboard/>}/>
           <Route path='/supervDashboard' element={<SuperVDashboard/>}/>
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;

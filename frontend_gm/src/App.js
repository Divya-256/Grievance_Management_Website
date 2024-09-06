import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import UserDashboard from './Components/UserDashboard/UserDashboard';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
           <Route path='/userDashboard' element={<UserDashboard/>}/>
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;

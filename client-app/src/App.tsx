import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/General/Home/Home';
import Jobcodes from './Pages/Admin/Permissions/Jobcodes';
import Login from './Pages/General/Login/Login';
import Users from './Pages/Admin/Users/Users';


function App() {
  return (
    <Routes>
      {APP_ROUTE.map((rt,index) => (
        <Route key={index} path={rt.path} element={rt.element} />
      ))}
    </Routes>
  );
}

const APP_ROUTE = [
  { path: '', element: (<Home />) },
  { path: '/login', element: (<Login />) },
  { path: '/admin/jobcodes', element: (<Jobcodes />) },
  { path: '/admin/users', element: (<Users />) }
]

export default App;
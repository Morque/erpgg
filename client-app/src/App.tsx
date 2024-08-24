import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/General/Home/Home';
import Jobcodes from './Pages/Admin/Permissions/Jobcodes';
import Login from './Pages/General/Login/Login';
import Users from './Pages/Admin/Users/Users';
import { createContext } from 'react';
import useMessages from './Components/Messages/Messages';

// Context to use Messages Alerts
export const AlertsContext = createContext<IMessage>({} as IMessage);

interface IMessage {
  messageNodes: React.JSX.Element;
  showLoading: () => void;
  hideLoading: () => void;
  showErrorMessage: (errorMessage: string) => void;
  showConfirmMessage: (onAccept: VoidFunction | undefined) => void;
  showSucess: () => void;
  hideSucess: () => void;
  showInformationMessage: (message: string) => void;
}


// Main App
function App() {
  const messages = useMessages();

  return (
    <AlertsContext.Provider value={messages}>
      <Routes>
        {APP_ROUTE.map((rt, index) => (
          <Route key={index} path={rt.path} element={rt.element} />
        ))}
      </Routes>
    </AlertsContext.Provider>
  );
}

const APP_ROUTE = [
  { path: '', element: (<Home />) },
  { path: '/login', element: (<Login />) },
  { path: '/admin/jobcodes', element: (<Jobcodes />) },
  { path: '/admin/users', element: (<Users />) }
]

export default App;
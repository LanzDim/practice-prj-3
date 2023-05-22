import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 
import Register from './pages/register';
import Welcome from './pages/welcome';
import Login from './pages/login';

export const CredentialsContext = React.createContext(null);

function App() {
  const credentialsState = useState({
    username: "Lanz", //TEMP USER
    password: "lanz",
  });
  return (
    <CredentialsContext.Provider value={credentialsState}>
    <Router> 
      <Routes>
        <>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

        </>
      </Routes>
    </Router>
    </CredentialsContext.Provider>
  );
}

export default App;

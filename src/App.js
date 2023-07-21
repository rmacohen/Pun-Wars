import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider component
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CustomNavbar from './features/Navbar';
import store from './store'; // Update the import path for the Redux store
import './index.css'; 

const App = () => (
  <Provider store={store}> {/* Wrap the app with the Provider component */}
    <HelmetProvider>
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </HelmetProvider>
  </Provider>
);

export default App;

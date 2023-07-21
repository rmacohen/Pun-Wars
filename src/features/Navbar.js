import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../pages/Login';
import SignUpForm from '../pages/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/Auth';
import punWarsLogo from '../punwarslogo3.png';
import { Helmet } from 'react-helmet-async';

function CustomNavbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleSignUpClose = () => {
    setShowSignUpModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleNewGame = () => {
    // Add logic here to reset the page
    window.location.reload(); // Example: reload the page to reset it
  };

  return (
    <div className="custom-navbar-container">
       <Helmet>
        <style>
          {`
            body {
              font-family: 'Orbitron', sans-serif;
            }
          `}
        </style>
      </Helmet>
    <BootstrapNavbar
      collapseOnSelect
      expand="lg"
      variant="dark"
      bg="dark" 
      className="custom-navbar"
    >
      <Container fluid>
        <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BootstrapNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <button onClick={handleNewGame} className="new-game-button">
              New Game
            </button>
            <Nav.Link href="#features">Puns</Nav.Link>
            <Nav.Link href="#pricing">Rank</Nav.Link>
            <CustomNavDropdown title="Settings" id="collapsible-nav-dropdown" />
          </Nav>
          <BootstrapNavbar.Brand href="#home" className="punWars">
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img
              src={punWarsLogo}
              alt="Pun Wars Logo"
              className="navbar-logo"
              style={{ width: '350px', height:'65px', display: 'inline-block', marginRight: '305px' }} // Set the width and allow the height to adjust proportionally
            /> {/* Inserted image */}
          </div>
        </BootstrapNavbar.Brand>
          <Nav>
            {isAuthenticated ? (
              <Nav.Link href="#logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="#login" onClick={handleLoginClick}>
                  Login
                </Nav.Link>
                <Nav.Link href="#signup" onClick={handleSignUpClick}>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
      <Login show={showLoginModal} onClose={handleLoginClose} />
      <SignUpForm
        show={showSignUpModal}
        onClose={handleSignUpClose}
        onSignUpSuccess={() => setShowLoginModal(true)} // Open login modal after successful signup
      />
    </BootstrapNavbar>
    </div>
  );
}

function CustomNavDropdown({ title, id }) {
  return (
    <NavDropdown title={title} id={id}>
      <NavDropdown.Item href="#action/3.1">Single Player</NavDropdown.Item>
      <NavDropdown.Item href="#action/3.2">Multiplayer</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action/3.4">About Pun Wars</NavDropdown.Item>
    </NavDropdown>
  );
}

export default CustomNavbar;

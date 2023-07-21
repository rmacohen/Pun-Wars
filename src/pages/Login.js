import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../features/Auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ show, onClose }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: 'login' }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} name="login">
          {/* Input fields for username and password */}
          <Form.Group controlId="formBasicUsername" style={{ marginBottom: '2rem' }}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{ marginBottom: '2rem' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" name="password" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
      {error && <div>{error}</div>}
    </Modal>
  );
};

export default Login;

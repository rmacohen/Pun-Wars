import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../features/Auth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUpForm = ({ show, onClose }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    dispatch(authenticate({ username, password, email, method: 'signup' }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} name="signup">
          <Form.Group controlId="formBasicEmail" style={{ marginBottom: '2rem' }}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" required />
          </Form.Group>
          <Form.Group controlId="formBasicUsername" style={{ marginBottom: '2rem' }}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" name="username" required />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{ marginBottom: '2rem' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" name="password" required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
      {error && <div>{error}</div>}
    </Modal>
  );
};

export default SignUpForm;

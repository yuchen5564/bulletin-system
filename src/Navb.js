import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import Login from './Login';

import './main.css';

function LoginWindows(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
    </Modal>
  );

}

function Navb() {
  const [loginModalShow, setLoginModalShow] = useState(false);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ 'font-family': 'Inter-sb' }} fixed="top">
        <Container>
          <Navbar.Brand href="./">Bulletin System</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="./">Home</Nav.Link> */}
            <Nav.Link href="./news">News</Nav.Link>
            <Nav.Link href="./list">List</Nav.Link>
            <Nav.Link href="./post">Post</Nav.Link>
          </Nav>
          <Button variant="secondary" onClick={() => { setLoginModalShow(true) }}>Login</Button>
        </Container>
      </Navbar>
      <br /><br />
      <LoginWindows
        show={loginModalShow}
        onHide={() => setLoginModalShow(false)}
      />
    </>
  );
}

export default Navb;
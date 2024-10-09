import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

import Login from './Login';

import { signOut } from "firebase/auth";
import { auth } from "./firebaseAuth/firebase";
import { useContext } from "react";
import AuthContext from "./firebaseAuth/AuthContext";
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

const handleLogout = async () => {
  await signOut(auth);
};



function Navb() {
  const { user } = useContext(AuthContext);
  const [loginModalShow, setLoginModalShow] = useState(false);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ 'font-family': 'Inter-sb' }} fixed="top">
        <Container>
          <Navbar.Brand href="./">Bulletin System</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Nav.Link href="./">Home</Nav.Link> */}
            <Nav.Link href="./news">News</Nav.Link>
            {user? <Nav.Link href="./list">List</Nav.Link>:<p></p>}
            {user? <Nav.Link href="./post">Post</Nav.Link>:<p></p>}
            
          </Nav>
          {!user? <Button variant="primary" onClick={() => { setLoginModalShow(true) }}>Login</Button>:
          <Button variant="danger" onClick={handleLogout}>Logout</Button>}

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
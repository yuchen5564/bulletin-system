import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import './main.css';


function Login() {

    return (
        <>

            {/* {error ? <Alert variant='danger'>{error}</Alert> : <p></p>} */}
            <Form>
                <FloatingLabel controlId="floatingInput" label="Account" className="mb-3" requird>
                    <Form.Control required type="email" placeholder="name@example.com" /> {/*value={email} onChange={(e) => setEmail(e.target.value)}*/}
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" requird>
                    <Form.Control required type="password" placeholder="Password" /> {/*value={password} onChange={(e) => setPassword(e.target.value)} */}
                </FloatingLabel>
                <hr className="my-4" />
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>

        </>
    );
}
export default Login;
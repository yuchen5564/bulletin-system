import Navb from './Navb';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './main.css';

function Post() {

    return (
        <>
            <Navb />
            <Container fluid className='mt-5'>

                <Row className='justify-content-center'>
                    <Col md={7}>
                        <h1 style={{ 'font-family': 'Inter-sb' }}>Post</h1>
                        <hr className="my-4" />
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" placeholder="Your title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Content</Form.Label>
                                <Form.Control required as="textarea" placeholder="Write something here" rows={3} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select required aria-label="Default select example">
                                    <option Value="Sale">Sale</option>
                                    <option value="News">News</option>
                                    <option value="EProduct">Product</option>
                                    <option value="Other">Other</option>
                                    <option value="Test">Test</option>
                                </Form.Select>
                            </Form.Group>
                            <br />
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Appendix</Form.Label>
                                <Row>
                                    <Col><Form.Control type="file" accept="image/*" /></Col> {/*onChange={handleChange}*/}
                                </Row>
                                     
                            </Form.Group>
                            <hr className="my-4" />

                            <Button variant="primary" type="submit">Submit</Button>

                            {/* {error ? <Alert variant='danger'>Something worng, please try again. ({error})</Alert> : <p></p>}
                        {success ? <Alert variant='success'>Success!</Alert> : <p></p>}
                        {percent ? <Alert variant='info'>File Upload: {percent} % done</Alert> : <p></p>} */}


                        </Form>
                    </Col>


                </Row>

            </Container>
        </>
    );
}
export default Post;
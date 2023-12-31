import Table from 'react-bootstrap/Table';
import Navb from './Navb';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

import './main.css';

function DeleteWindows(props) {
    // var docId = props.doc.id;

    // const del = async () => {
    //     await deleteDoc(doc(db, 'announcement', docId));
    //     window.location.reload();
    // }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Post (post id{/*{props.doc.id}*/})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete ? <br /><br />
                    This action cannot be undo !
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" >Confirm</Button>  {/*onClick={del}*/}
            </Modal.Footer>
        </Modal>
    );

}

function EditWindows(props) {
    //const docRef = doc(db, "announcement", props.docId);
    //const docSnap = getDocs(docRef);
    //console.log("Document data:", docSnap.data());
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Post (post id{/*{props.doc.id}*/})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>【{props.doc.category}】{props.doc.title}</h4>
                <p>
                    <NewlineText text={props.doc.content} />
                    {props.doc.pic ? <p><img src={props.doc.pic} alt="pic" width="300" /><br /></p> : <p></p>}
                </p> */}
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" defaultValue="Test" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control required as="textarea" placeholder="Write something" defaultValue="123123" rows={3} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select required aria-label="Default select example" defaultValue="other" >
                            <option Value="Sale">Sale</option>
                            <option value="News">News</option>
                            <option value="EProduct">Product</option>
                            <option value="Other">Other</option>
                            <option value="Test">Test</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

function List() {
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    // const [document, setDoc] = useState("");
    return (
        <>

            <Navb />
            <Container fluid className='mt-5'>

                <Row className='justify-content-center'>
                    <Col md={7}>
                        <h1 style={{ 'font-family': 'Inter-sb' }}>List</h1><br />
                        <Table striped border hover>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Post Time</th>
                                </tr>
                            </thead>
                            {/* 以下之後會換成自動取得資料數量 */}
                            <tbody>
                                <tr>
                                    <td>
                                        <Button variant="outline-primary" onClick={() => { setEditModalShow(true) }}><Icon.PencilSquare /></Button>{' '} {/*  ; setDoc(item) */}
                                        <Button variant="outline-danger" onClick={() => { setDeleteModalShow(true) }}><Icon.Trash /></Button> {/*  ; setDoc(item) */}
                                    </td>
                                    <td>Ohter</td>
                                    <td>Test</td>
                                    <td>2023/08/08 11:52:58</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button variant="outline-primary"><Icon.PencilSquare /></Button>{' '}
                                        <Button variant="outline-danger"><Icon.Trash /></Button>
                                    </td>
                                    <td>Info</td>
                                    <td>Post 2</td>
                                    <td>2023/08/08 10:56:32</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Button variant="outline-primary"><Icon.PencilSquare /></Button>{' '}
                                        <Button variant="outline-danger"><Icon.Trash /></Button>
                                    </td>
                                    <td>Sale</td>
                                    <td>Post 1: Hello! React</td>
                                    <td>2023/08/07 23:11:20</td>
                                </tr>

                            </tbody>
                        </Table>
                    </Col>

                </Row>

            </Container>
            <DeleteWindows
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
            // doc={document}
            />
            <EditWindows
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
            // doc={document}
            />
        </>
    );
}

export default List;
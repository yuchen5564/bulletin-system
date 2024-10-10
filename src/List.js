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
import { collection, getDocs, query, orderBy, doc, setDoc, where, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import { db } from './firebaseAuth/firebase';

import './main.css';

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);

    return newText;
}

function DeleteWindows(props) {
    const docId = props.doc ? props.doc.id : '';

    const del = async () => {
        await deleteDoc(doc(db, 'announcement', docId));
        window.location.reload();
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Post ({docId})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete ? <br /><br />
                    This action cannot be undo !
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={del}>Confirm</Button>  {/*onClick={del}*/}
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
    const [document, setDoc] = useState(null);
    const [announcement, setAnnouncement] = useState([]);

    const fetchPost = async () => {
        //db.collection('cities').order('population', 'desc')
        await getDocs(query(collection(db, "announcement"), orderBy('ptime', 'desc')))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));

                setAnnouncement(newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

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
                            {
                                announcement?.map((item, i) => (
                                        <tr>
                                            <td>
                                                <Button variant="outline-primary" onClick={() => { setEditModalShow(true); setDoc(item) }}><Icon.PencilSquare /></Button>{' '}
                                                <Button variant="outline-danger" onClick={() => { setDeleteModalShow(true); setDoc(item) }}><Icon.Trash /></Button>
                                            </td>
                                            <td>{item.category}</td> 
                                            <td>{item.title}</td>  
                                            <td>{item.ptime}</td> 
                                    </tr>
                                ))
                            }
                            </tbody>
                            

                        </Table>
                    </Col>

                </Row>

            </Container>
            <DeleteWindows
                show={deleteModalShow}
                onHide={() => setDeleteModalShow(false)}
                doc={document}
            />
            <EditWindows
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                doc={document}
            />
        </>
    );
}

export default List;
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
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
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
    const docId = props.doc ? props.doc.id : '';
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (props.doc) {
            setTitle(props.doc.title);
            setContent(props.doc.content);
            setCategory(props.doc.category);
        }
    }, [props.doc]);

    const saveChanges = async () => {
        if (docId) {
            
            const docRef = doc(db, "announcement", docId);
            await updateDoc(docRef, {
                title,
                content,
                category
            });
            window.location.reload();
        } else {
            console.error("Document ID is invalid");
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Post ({docId})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Content</Form.Label>
                        <Form.Control required as="textarea" placeholder="Write something" value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select required aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Sale">Sale</option>
                            <option value="News">News</option>
                            <option value="Product">Product</option>
                            <option value="Other">Other</option>
                            <option value="Test">Test</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={saveChanges}>Save</Button>
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
        await getDocs(query(collection(db, "announcement"), orderBy('ptime', 'desc')))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAnnouncement(newData);
            });
    }

    useEffect(() => {
        fetchPost();
    }, []);

    const handleEditShow = (item) => {
        setDoc(item);
        setEditModalShow(true);
    };

    const handleDeleteShow = (item) => {
        setDoc(item);
        setDeleteModalShow(true);
    };

    return (
        <>
            <Navb />
            <Container fluid className='mt-5'>
                <Row className='justify-content-center'>
                    <Col md={7}>
                        <h1 style={{ 'fontFamily': 'Inter-sb' }}>List</h1><br />
                        <Table striped border hover>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Post Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcement?.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <Button variant="outline-primary" onClick={() => handleEditShow(item)}>
                                                <Icon.PencilSquare />
                                            </Button>{' '}
                                            <Button variant="outline-danger" onClick={() => handleDeleteShow(item)}>
                                                <Icon.Trash />
                                            </Button>
                                        </td>
                                        <td>{item.category}</td> 
                                        <td>{item.title}</td>  
                                        <td>{item.ptime}</td> 
                                    </tr>
                                ))}
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

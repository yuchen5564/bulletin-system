import Navb from './Navb';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import './main.css';
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, serverTimestamp, updateDoc, addDoc } from "firebase/firestore";
import { db, storage } from './firebaseAuth/firebase';
import dayjs from 'dayjs';


function Post() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Sale");
    const [picture, setPicture] = useState("");
    const [error, seterror] = useState("");
    const [success, setSuccess] = useState(false);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
    const [date, setDate] = useState("");


    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        var today = new Date();
        var date = dayjs(today).format('YYYYMMDDHHmmss');
        setDate(date);
        var datePost = dayjs(today).format('YYYY/MM/DD HH:mm:ss');
    
        // Define Firestore document reference
        const docRef = doc(db, "announcement", date.toString());
    
        if (file) {
            console.log("Find File");
            const storageRef = ref(storage, `/bulletin_image/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            // Monitor file upload progress
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => console.log(err),
                async () => {
                    try {
                        // Get file URL after upload
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log(url);
                        setPicture(url);
    
                        // Save document in Firestore with picture URL
                        await setDoc(docRef, {
                            ptime: datePost,
                            title: title,
                            content: content,
                            category: category,
                            pic: url,
                        });
    
                        setSuccess(true);
                        clearForm();
                    } catch (e) {
                        seterror(e);
                    }
                }
            );
        } else {
            // If no file, just create document without picture URL
            try {
                await setDoc(docRef, {
                    ptime: datePost,
                    title: title,
                    content: content,
                    category: category,
                    pic: "",
                });
    
                setSuccess(true);
                clearForm();
            } catch (e) {
                seterror(e);
            }
        }
    };
    
    const clearForm = () => {
        setTitle("");
        setContent("");
        setCategory("Sale"); // Reset to the default category
        setFile(""); // Reset the file state
        setPicture(""); // Reset the picture URL
        seterror(""); // Clear any error messages
        setDate(""); // Reset date if needed
    };

    return (
        <>
            <Navb />
            <Container fluid className='mt-5'>

                <Row className='justify-content-center'>
                    <Col md={7}>
                        <h1 style={{ 'font-family': 'Inter-sb' }}>Post</h1>
                        <hr className="my-4" />
                        <Form onSubmit={handleSubmit}> 
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" placeholder="Your title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Content</Form.Label>
                                <Form.Control required as="textarea" placeholder="Write something here" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Select required aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                    <Col><Form.Control type="file" onChange={handleChange} accept="image/*" /></Col>
                                </Row>
                                     
                            </Form.Group>
                            <hr className="my-4" />

                            <Button variant="primary" type="submit">Submit</Button>
                            {' '}
                            <Button variant="danger" type="clear" onClick={clearForm}>Clear</Button>
                            {error ? <Alert variant='danger'>Something worng, please try again. ({error.toString()})</Alert> : <p></p>}
                            {success ? <Alert variant='success'>Success!</Alert> : <p></p>}
                            {percent ? <Alert variant='info'>File Upload: {percent.toString()} % done</Alert> : <p></p>}


                        </Form>
                    </Col>


                </Row>

            </Container>
        </>
    );
}
export default Post;
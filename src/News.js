import Navb from "./Navb";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from './firebaseAuth/firebase';
import { useState, useEffect } from 'react';
import './main.css';

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map(str => <p>{str}</p>);

    return newText;
}

function News() {
    
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
                <h1 className='text-center' style={{ 'font-family': 'Inter-sb' }}>News</h1>
                <Row className='justify-content-center'>
                    <Col md={7}>
                        <Accordion defaultActiveKey="0">
                            <div className="announcement-content" >

                                {
                                    announcement?.map((item, i) => (

                                        <Accordion.Item eventKey={i}>
                                            <Accordion.Header><Badge bg="secondary">{item.category}</Badge><pre> </pre>{item.title}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.id}
                                                {/* <p>{item.content}</p> */}
                                                <NewlineText text={item.content} />
                                                {item.pic ? <p><img src={item.pic} alt="pic" width="300" /><br /></p> : <p></p>}

                                                ---<br />
                                                Release Date: {item.ptime}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))
                                }
                            </div>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default News;
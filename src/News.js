import Navb from "./Navb";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Badge from 'react-bootstrap/Badge';

import './main.css';

function News() {
    return (
        <>
            <Navb />
            <Container fluid className='mt-5'>
                <h1 className='text-center' style={{ 'font-family': 'Inter-sb' }}>News</h1>
                <Row className='justify-content-center'>
                    <Col md={7}>
                        <Accordion defaultActiveKey="0">
                            <div className="announcement-content" >
                                {/* 之後串DB */}
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header><Badge bg="secondary">Ohter</Badge>{'　'}Post 3</Accordion.Header>
                                    <Accordion.Body>
                                       123456 <br /><br />

                                        ---<br />
                                        Release Date: 2023/08/07 23:00:00
                                    </Accordion.Body>
                                </Accordion.Item>

                                {
                                    // announcement?.map((item, i) => (

                                    //     <Accordion.Item eventKey={i}>
                                    //         <Accordion.Header>【{item.category}】{item.title}</Accordion.Header>
                                    //         <Accordion.Body>
                                    //             {item.id}
                                    //             {/* <p>{item.content}</p> */}
                                    //             <NewlineText text={item.content} />
                                    //             {item.pic ? <p><img src={item.pic} alt="pic" width="300" /><br /></p> : <p></p>}

                                    //             ---<br />
                                    //             發布日期：{item.ptime}
                                    //         </Accordion.Body>
                                    //     </Accordion.Item>
                                    // ))
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
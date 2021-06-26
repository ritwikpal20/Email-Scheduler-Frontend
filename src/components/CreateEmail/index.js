import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";

const Inbox = () => {
    const [show, setShow] = useState(false);
    const [to, setRecepient] = useState("");
    const [cc, setCC] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const handleClose = () => {
        setShow(false);
    };
    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={2}>
                            <label htmlFor="to">To</label>
                        </Col>
                        <Col>
                            <input
                                id="to"
                                type="email"
                                placeholder=""
                                required
                                value={to}
                                onChange={(e) => setRecepient(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label htmlFor="CC">CC</label>
                        </Col>
                        <Col>
                            <input
                                id="CC"
                                type="text"
                                placeholder=""
                                value={cc}
                                onChange={(e) => setCC(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <label htmlFor="subject">Subject</label>
                        </Col>
                        <Col md={10}>
                            <input
                                id="subject"
                                rows="8"
                                type="text"
                                placeholder=""
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <input
                                id="content"
                                rows="8"
                                type="text"
                                placeholder=""
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Inbox;

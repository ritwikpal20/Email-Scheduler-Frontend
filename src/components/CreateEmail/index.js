import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateEmail = (props) => {
    // const [show, setShow] = useState(props.show);
    const [to, setRecepient] = useState("");
    const [cc, setCC] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const { token } = useSelector((state) => state.auth);

    const handler = () => {
        console.log(to, content, subject);
        axios
            .post(
                process.env.REACT_APP_API_LINK + "/send-email",
                {
                    receivers: to + "," + cc,
                    body: content,
                    subject: subject,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                alert("email sent");
            })
            .catch((err) => console.log(err));

        props.setShow(false);
    };

    const handleClose = () => {
        props.setShow(false);
    };
    return (
        <Container>
            <Modal
                scrollable
                size="lg"
                show={props.show}
                onHide={handleClose}
                dialogClassName={`${styles.dialogwm}`}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={2} xs={2}>
                            <label htmlFor="to">To</label>
                        </Col>
                        <Col md={10} xs={10}>
                            <input
                                id="to"
                                type="email"
                                placeholder=""
                                required
                                value={to}
                                style={{ width: "100%" }}
                                onChange={(e) => setRecepient(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} xs={2}>
                            <label htmlFor="CC">CC</label>
                        </Col>
                        <Col md={10} xs={10}>
                            <input
                                id="CC"
                                type="email"
                                placeholder=""
                                style={{ width: "100%" }}
                                value={cc}
                                onChange={(e) => setCC(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} xs={2}>
                            <label htmlFor="subject">Subject</label>
                        </Col>
                        <Col md={10} xs={10}>
                            <input
                                id="subject"
                                required
                                style={{ width: "100%" }}
                                placeholder=""
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            ></input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} xs={2}>
                            <label htmlFor="content">Content</label>
                        </Col>
                        <Col md={10} xs={10}>
                            <textarea
                                id="content"
                                rows="8"
                                placeholder=""
                                style={{ width: "100%" }}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handler}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CreateEmail;

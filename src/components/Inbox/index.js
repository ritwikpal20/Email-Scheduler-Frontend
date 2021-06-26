import { Col, Container, Row } from "react-bootstrap";
import styles from "./index.module.css";

const Inbox = () => {
    return (
        <Container>
            <Row>
                {/* {arr.map((mail) => (
                    <>
                        <Col md={4}>
                            <b>{mail.name}</b>
                        </Col>
                        <Col md={6}>
                            <p>{mail.content}</p>
                        </Col>
                        <Col md={2}>
                            <p>{mail.date}</p>
                        </Col>
                    </>
                ))} */}
            </Row>
        </Container>
    );
};

export default Inbox;

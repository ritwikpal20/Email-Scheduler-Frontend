import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const SentEmails = () => {
    const { token } = useSelector((state) => state.auth);
    const [arr, setArr] = useState([]);

    function myFunction(value, index, array) {
        if (index > 0) return value.email;
    }
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_LINK + "/sent-emails", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data, "emails");
                setArr(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Container>
            <Row>
                {arr.length === 0 && (
                    <>
                        <Container>
                            <Row>
                                <Col md={12} className="text-center">
                                    You have not sent any emails yet.
                                    <button className="btn btn-link pb-2">
                                        Send email now
                                    </button>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )}
                {arr.map((mail) => (
                    <>
                        <Card
                            style={{
                                width: "100%",
                                margin: "10px",
                                background: "#e1e2e3",
                                color: "black",
                            }}
                        >
                            <Card.Body>
                                <b>To:</b> {mail.receivers[0].email}
                                <br />
                                <b>CC:</b> {mail.receivers.map(myFunction)}
                                <br />
                                <b>Subject:</b> {mail.subject}
                                <Card.Text>{mail.body}</Card.Text>
                            </Card.Body>
                        </Card>
                    </>
                ))}
            </Row>
        </Container>
    );
};

export default SentEmails;

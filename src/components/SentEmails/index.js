import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreateEmail from "../CreateEmail";

const SentEmails = () => {
    const { token } = useSelector((state) => state.auth);
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(false);

    function myFunction(value, index, array) {
        if (index > 0) return value.email;
    }
    const handleChange = () => {
        setShow(true);
    };

    const [show, setShow] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get(process.env.REACT_APP_API_LINK + "/sent-emails", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data, "emails");
                setArr(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Container>
            <Row>
                <CreateEmail show={show} setShow={setShow} />
                {loading ? (
                    <Spinner animation="border" role="status" size="lg">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    <>
                        {arr.length === 0 && (
                            <>
                                <Container>
                                    <Row>
                                        <Col md={12} className="text-center">
                                            You have not sent any emails yet.
                                            <button
                                                className="btn btn-link pb-2"
                                                onClick={() =>
                                                    handleChange(true)
                                                }
                                            >
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
                                        <b>CC:</b>{" "}
                                        {mail.receivers.map(myFunction)}
                                        <br />
                                        <b>Sent at:</b>{" "}
                                        {new Date(mail.createdAt)
                                            .toString()
                                            .substr(0, 33)}
                                        <br />
                                        <b>Subject:</b> {mail.subject}
                                        <Card.Text>
                                            <b>Content:</b> {mail.body}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </>
                        ))}
                    </>
                )}
            </Row>
        </Container>
    );
};

export default SentEmails;

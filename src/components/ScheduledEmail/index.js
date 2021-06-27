import axios from "axios";
import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ScheduledEmails = () => {
    const { token, email } = useSelector((state) => state.auth);
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(false);
    function myFunction(value, index, array) {
        if (email !== value.email && index > 0) return value.email + ", ";
    }

    useEffect(() => {
        setLoading(true);
        axios
            .get(process.env.REACT_APP_API_LINK + "/scheduled-emails", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res.data, "emails");
                setArr(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);
    return (
        <Container>
            <Row>
                {!loading && (
                    <>
                        {arr.length !== 0 && (
                            <Container>
                                <Row>
                                    <Col>
                                        <h1 className="text-center">
                                            Scheduled Emails
                                        </h1>
                                    </Col>
                                </Row>
                            </Container>
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
                                        <Badge variant="success">
                                            {mail.scheduleType}
                                        </Badge>
                                        <br />
                                        <hr></hr>
                                        <b>To:</b> {mail.receivers[0].email}
                                        <br />
                                        <b>Next email due:</b>{" "}
                                        {new Date(mail.scheduleDate)
                                            .toString()
                                            .substr(0, 33)}
                                        <br />
                                        <b>CC:</b>{" "}
                                        {mail.receivers.map(myFunction)}
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

export default ScheduledEmails;

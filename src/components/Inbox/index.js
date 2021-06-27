import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const Inbox = () => {
    const { token, email } = useSelector((state) => state.auth);
    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(false);
    function myFunction(value, index, array) {
        if (email !== value.email) return value.email;
    }
    useEffect(() => {
        setLoading(true);
        axios
            .get(process.env.REACT_APP_API_LINK + "/received-emails", {
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
                {loading ? (
                    <Spinner animation="border" role="status" size="lg">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    <>
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
                                        <b>From:</b> {mail.sender.email}
                                        <br />
                                        <b>CC:</b>{" "}
                                        {mail.receivers.map(myFunction)}
                                        <br />
                                        <b>Subject:</b> {mail.subject}
                                        <Card.Text>{mail.body}</Card.Text>
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

export default Inbox;

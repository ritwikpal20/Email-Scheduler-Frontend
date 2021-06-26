import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "./index.module.css";

const Inbox = () => {
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
                console.log(res.data, "sfes");
                setArr(res.data);
                // alert("email sent");
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Container>
            <Row>
                {arr.map((mail) => (
                    <>
                        <Card style={{ width: "100%", margin: "10px" }}>
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

export default Inbox;

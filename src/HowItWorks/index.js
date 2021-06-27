import { Col, Container, Row } from "react-bootstrap";

const HowItWorks = () => {
    return (
        <Container>
            <Row className="mb-2">
                <Col md={12} className="text-center">
                    <h1>How it works</h1>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    *Register using your email-Id & Verify your email-Id.
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    *Send your first email or schedule it in future.
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12} className="text-danger">
                    *Reciever needs to have email-Id verified by our DataBase
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>*You can schedule emails in 4 given ways:</Col>
            </Row>
            <Row className="mb-2 ml-2">
                <Col md={11}>
                    <b>Recurring:</b> Select how much time(in Seconds) after
                    which you need to recursively send email. for eg. - 30
                    seconds
                </Col>
            </Row>
            <Row className="mb-2 ml-2">
                <Col md={11}>
                    <b>Weekly:</b> Select Date, Month, Time from which you need
                    to start sending emails every week. for eg. - Send email
                    every week starting from 18 July'21, at 10:45:00.
                </Col>
            </Row>
            <Row className="mb-2 ml-2">
                <Col md={11}>
                    <b>Monthly:</b> Select Date, Month, Time from which you need
                    to start sending emails every month. for eg. - Send email
                    every month starting from 25 July'21, at 16:45:30.
                </Col>
            </Row>
            <Row className="mb-2 ml-2">
                <Col md={11}>
                    <b>Yearly:</b> Select Date, Month, Time from which you need
                    to start sending emails every year. for eg. - Send email
                    every year starting from 27 July'21, at 14:22:00.
                </Col>
            </Row>
            <Row className="mb-2">
                <Col md={12}>
                    *Users can check their <b>received, sent</b> &{" "}
                    <b>scheduled</b> email history.
                </Col>
            </Row>
        </Container>
    );
};

export default HowItWorks;

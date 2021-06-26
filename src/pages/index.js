import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import CreateEmail from "../components/CreateEmail/index.js";

const HomePage = () => {
    const handleChange = () => {
        setShow(true);
    };

    const [show, setShow] = useState(false);
    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <CreateEmail show={show} setShow={setShow} />
            <Row>
                <Col className="text-center">
                    <Button
                        size="lg"
                        className={`m-2 px-2 font-weight-bolder text-center`}
                        variant="warning"
                        onClick={() => handleChange(true)}
                    >
                        Create email
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default HomePage;

import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Select from "react-select";

const CreateEmail = (props) => {
    // const [show, setShow] = useState(props.show);
    const [to, setRecepient] = useState("");
    const [cc, setCC] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const [showScheduler, setShowScheduler] = useState(false);
    const [scheduleType, setScheduleType] = useState("");

    const { token } = useSelector((state) => state.auth);

    const handler = () => {
        var scheduleTime = {};
        // if(scheduleType === "weekly"){
        //     scheduleTime.hours = "",
        //     sch
        // }
        var add = to;
        if (cc.length > 0) {
            add += ",";
            add += cc;
        }
        // console.log(to, content, subject, "data");
        axios
            .post(
                process.env.REACT_APP_API_LINK + "/send-email",
                {
                    receivers: add,
                    body: content,
                    subject: subject,
                    scheduleTime: "",
                    scheduleType: scheduleType,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                alert("Your email was successfully sent!");
                props.setShow(false);
            })
            .catch((err) => console.log(err));
    };

    const daysInWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const handleCheckboxChange = () => {
        if (showScheduler === true) {
            setShowScheduler(false);
        } else {
            setShowScheduler(true);
        }
    };
    const onDataChange = (e) => {
        const { name, value } = e.target;
        console.log(value, "data", name);
        setScheduleType(value);
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
                    <Row className="mb-2">
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
                    <Row className="mb-2">
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
                    <Row className="mb-2">
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
                    <Row className="mb-2">
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
                    <Row className="mb-2">
                        <Col md={12} className="text-center">
                            Do you want to schedule it in
                            future?&nbsp;&nbsp;&nbsp;
                            <input
                                type="checkbox"
                                id="scheduler"
                                name="scheduler"
                                value="scheduler"
                                onChange={handleCheckboxChange}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        {showScheduler && (
                            <>
                                <div
                                    className={`container ${styles.radio__button__container}`}
                                >
                                    <Col md={12} className="text-center">
                                        <span key={`recurring`}>
                                            <input
                                                type="radio"
                                                name="schedule"
                                                id={`recurring`}
                                                value={`recurring`}
                                                onChange={onDataChange}
                                                checked={
                                                    scheduleType === "recurring"
                                                }
                                            />
                                            <label
                                                htmlFor={`recurring`}
                                                className={`ml-2 ${styles.light__grey__color}`}
                                            >
                                                <span>Recurring</span>
                                            </label>
                                        </span>
                                        <span key={`weekly`}>
                                            <input
                                                type="radio"
                                                name="schedule"
                                                id={`weekly`}
                                                value={`weekly`}
                                                onChange={onDataChange}
                                                checked={
                                                    scheduleType === "weekly"
                                                }
                                            />
                                            <label
                                                htmlFor={`weekly`}
                                                className={`ml-2 ${styles.light__grey__color}`}
                                            >
                                                <span>Weekly</span>
                                            </label>
                                        </span>
                                        <span key={`monthly`}>
                                            <input
                                                type="radio"
                                                name="schedule"
                                                id={`monthly`}
                                                value={`monthly`}
                                                onChange={onDataChange}
                                                checked={
                                                    scheduleType === "monthly"
                                                }
                                            />
                                            <label
                                                htmlFor={`monthly`}
                                                className={`ml-2 ${styles.light__grey__color}`}
                                            >
                                                <span>Monthly</span>
                                            </label>
                                        </span>
                                        <span key={`yearly`}>
                                            <input
                                                type="radio"
                                                name="schedule"
                                                id={`yearly`}
                                                value={`yearly`}
                                                onChange={onDataChange}
                                                checked={
                                                    scheduleType === "yearly"
                                                }
                                            />
                                            <label
                                                htmlFor={`yearly`}
                                                className={`ml-2 ${styles.light__grey__color}`}
                                            >
                                                <span>Yearly</span>
                                            </label>
                                        </span>
                                    </Col>
                                </div>
                            </>
                        )}
                    </Row>
                    <Row>
                        <Col md={6} xs={6}>
                            Seconds
                        </Col>
                        <Col md={6} xs={6}>
                            <Select
                                // onChange={(option, action) => onSelectDataChange(option, action)}
                                options={Array.from(
                                    { length: 59 },
                                    (_, k) => k + 1
                                )?.map((number) => {
                                    return {
                                        value: number,
                                        label: `${number}`,
                                    };
                                })}
                                name="hour"
                                // closeMenuOnScroll={false}
                                // closeMenuOnSelect={false}
                                className="text-muted"
                                isSearchable={false}
                                placeholder="Select"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={6}>
                            Minutes
                        </Col>
                        <Col md={6} xs={6}>
                            <Select
                                // onChange={(option, action) => onSelectDataChange(option, action)}
                                options={Array.from(
                                    { length: 60 },
                                    (_, k) => k + 1
                                )?.map((number) => {
                                    return {
                                        value: number,
                                        label: `${number}`,
                                    };
                                })}
                                name="hour"
                                // closeMenuOnScroll={false}
                                // closeMenuOnSelect={false}
                                className="text-muted"
                                isSearchable={false}
                                placeholder="Select"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} xs={6}>
                            Hours
                        </Col>
                        <Col md={6} xs={6}>
                            <Select
                                // onChange={(option, action) => onSelectDataChange(option, action)}
                                options={Array.from(
                                    { length: 24 },
                                    (_, k) => k + 1
                                )?.map((number) => {
                                    return {
                                        value: number,
                                        label: `${number}`,
                                    };
                                })}
                                name="hour"
                                // closeMenuOnScroll={false}
                                // closeMenuOnSelect={false}
                                className="text-muted"
                                isSearchable={false}
                                placeholder="Select"
                            />
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

import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import styles from "./index.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Select from "react-select";

function convertTZ(date, tzString) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString(
            "en-US",
            { timeZone: tzString }
        )
    );
}

const CreateEmail = (props) => {
    // const [show, setShow] = useState(props.show);
    const [to, setRecepient] = useState("");
    const [cc, setCC] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    const [showScheduler, setShowScheduler] = useState(false);
    const [scheduleType, setScheduleType] = useState(null);

    const [hour, setHour] = useState("");
    const [second, setSecond] = useState("");
    const [minute, setMinute] = useState("");
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");

    const { token } = useSelector((state) => state.auth);

    const handler = () => {
        var add = to;
        if (cc.length > 0) {
            add += ",";
            add += cc;
        }

        // console.log()
        var strMin = minute;
        var str = "0";
        if (minute.toString().length !== 2) {
            str += strMin;
        }

        var strSec = second;
        var strS = "0";
        if (second.toString().length !== 2) {
            strS += strSec;
        }

        var strHou = hour;
        var strH = "0";
        if (hour.toString().length !== 2) {
            strH += strHou;
        }

        var time = `2021-${month}-${date}T${strH}:${str}:${strS}.000`;
        if (scheduleType === "" || scheduleType === null) {
            time = null;
        }
        if (scheduleType === "recurring") {
            time = new Date(new Date().getTime() + 1000 * second);
        }

        console.log(time, "wedfeg");
        axios
            .post(
                process.env.REACT_APP_API_LINK + "/send-email",
                {
                    receivers: add,
                    body: content,
                    subject: subject,
                    scheduleTime: time,
                    scheduleType: scheduleType,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                if (scheduleType === "" || scheduleType === null)
                    alert("Your email was successfully sent!");
                else alert("Your email was successfully scheduled!");
                props.setShow(false);
            })
            .catch((err) => console.log(err));
    };

    const monthInYear = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },

        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },

        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "Sepetember" },

        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];
    const handleCheckboxChange = () => {
        if (showScheduler === true) {
            setShowScheduler(false);
            setScheduleType(null);
        } else {
            setShowScheduler(true);
        }
    };
    const onDataChange = (e) => {
        const { value } = e.target;
        // console.log(value, "data");
        setScheduleType(value);
    };
    const onSelectDataChange = (option, action) => {
        const name = action.name;
        const value = option.value;
        // console.log(value, "data", name);
        if (name === "hour") {
            setHour(value);
        } else if (name === "minute") {
            setMinute(value);
        } else if (name === "second") {
            setSecond(value);
        } else if (name === "date") {
            setDate(value);
        } else if (name === "month") {
            setMonth(value);
        }
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
                        <Col md={3} xs={3}>
                            <label htmlFor="to">To</label>
                        </Col>
                        <Col md={9} xs={9}>
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
                        <Col md={3} xs={3}>
                            <label htmlFor="CC">CC</label>
                        </Col>
                        <Col md={9} xs={9}>
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
                        <Col md={3} xs={3}>
                            <label htmlFor="subject">Subject</label>
                        </Col>
                        <Col md={9} xs={9}>
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
                        <Col md={3} xs={3}>
                            <label htmlFor="content">Content</label>
                        </Col>
                        <Col md={9} xs={9}>
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

                    {/* date & time */}
                    {showScheduler && scheduleType !== "" && (
                        <Row className="mb-2">
                            <Col md={3} xs={3}>
                                Seconds
                            </Col>
                            <Col md={9} xs={9}>
                                <Select
                                    onChange={(option, action) =>
                                        onSelectDataChange(option, action)
                                    }
                                    options={Array.from(
                                        { length: 60 },
                                        (_, k) => k + 20
                                    )?.map((number) => {
                                        return {
                                            value: number,
                                            label: `${number}`,
                                        };
                                    })}
                                    name="second"
                                    // closeMenuOnScroll={false}
                                    // closeMenuOnSelect={false}
                                    className="text-muted"
                                    isSearchable={false}
                                    placeholder="Select"
                                />
                            </Col>
                        </Row>
                    )}

                    {showScheduler &&
                        scheduleType !== "recurring" &&
                        scheduleType !== "" && (
                            <Row className="mb-2">
                                <Col md={3} xs={3}>
                                    Minutes
                                </Col>
                                <Col md={9} xs={9}>
                                    <Select
                                        onChange={(option, action) =>
                                            onSelectDataChange(option, action)
                                        }
                                        options={Array.from(
                                            { length: 60 },
                                            (_, k) => k + 1
                                        )?.map((number) => {
                                            return {
                                                value: number,
                                                label: `${number}`,
                                            };
                                        })}
                                        name="minute"
                                        // closeMenuOnScroll={false}
                                        // closeMenuOnSelect={false}
                                        className="text-muted"
                                        isSearchable={false}
                                        placeholder="Select"
                                    />
                                </Col>
                            </Row>
                        )}
                    {showScheduler &&
                        scheduleType !== "recurring" &&
                        scheduleType !== "" && (
                            <Row className="mb-2">
                                <Col md={3} xs={3}>
                                    Hours
                                </Col>
                                <Col md={9} xs={9}>
                                    <Select
                                        onChange={(option, action) =>
                                            onSelectDataChange(option, action)
                                        }
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
                        )}
                    {showScheduler &&
                        scheduleType !== "recurring" &&
                        scheduleType !== "" && (
                            <Row className="mb-2">
                                <Col md={3} xs={3}>
                                    Date
                                </Col>
                                <Col md={9} xs={9}>
                                    <Select
                                        onChange={(option, action) =>
                                            onSelectDataChange(option, action)
                                        }
                                        options={Array.from(
                                            { length: 31 },
                                            (_, k) => k + 1
                                        )?.map((number) => {
                                            return {
                                                value: number,
                                                label: `${number}`,
                                            };
                                        })}
                                        name="date"
                                        className="text-muted"
                                        isSearchable={false}
                                        placeholder="Select"
                                    />
                                </Col>
                            </Row>
                        )}

                    {showScheduler &&
                        scheduleType !== "recurring" &&
                        scheduleType !== "" && (
                            <Row className="mb-2">
                                <Col md={3} xs={3}>
                                    Month
                                </Col>
                                <Col md={9} xs={9}>
                                    <Select
                                        onChange={(option, action) =>
                                            onSelectDataChange(option, action)
                                        }
                                        options={monthInYear}
                                        name="month"
                                        className="text-muted"
                                        isSearchable={false}
                                        placeholder="Select"
                                    />
                                </Col>
                            </Row>
                        )}
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

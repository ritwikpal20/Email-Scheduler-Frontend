// Firebase
import firebase from "../../../firebase";

// React and Redux
import { Nav, Navbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logoutUser } from "../../../store/slices/authSlice";

const NavbarComp = () => {
    const { token, name, email } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                // Sign-out successful.
                dispatch(logoutUser());
                history.replace("/");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Email Scheduler&nbsp;&nbsp;</Navbar.Brand>
            {token ? (
                <>
                    <small>
                        {" "}
                        <em className="text-danger">{name ?? email}</em>
                    </small>
                    &nbsp;&nbsp;
                </>
            ) : null}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    {token ? (
                        <>
                            <NavLink to="/history">History</NavLink>
                            &nbsp;&nbsp;
                            <Button
                                variant="link"
                                className="p-0"
                                style={{ display: "inherit" }}
                                onClick={logoutHandler}
                            >
                                {" "}
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Login</NavLink>
                            &nbsp;&nbsp;
                            <NavLink to="/register">Register</NavLink>
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComp;

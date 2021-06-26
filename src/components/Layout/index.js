import Navbar from "./Navbar";
import { Container } from "react-bootstrap";

const Layout = (props) => {
    const { children } = props;
    return (
        <>
            <Navbar />
            <Container>{children}</Container>
        </>
    );
};

export default Layout;

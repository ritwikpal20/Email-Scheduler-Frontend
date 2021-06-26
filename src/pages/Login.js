import { Helmet } from "react-helmet";
import Login from "../components/Login";

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login Page</title>
            </Helmet>
            <Login />
        </>
    );
};

export default LoginPage;

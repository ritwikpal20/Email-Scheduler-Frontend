import { Helmet } from "react-helmet";
import Register from "../components/Register";

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <title>Register Page</title>
            </Helmet>
            <Register />
        </>
    );
};

export default RegisterPage;

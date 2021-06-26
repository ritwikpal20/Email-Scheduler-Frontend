import { Helmet } from "react-helmet";
import RegisterComplete from "../components/RegisterComplete";

const RegisterCompletePage = () => {
    return (
        <>
            <Helmet>
                <title>Register Complete</title>
            </Helmet>
            <RegisterComplete />
        </>
    );
};

export default RegisterCompletePage;

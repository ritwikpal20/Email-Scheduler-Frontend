import { useState, useRef } from "react";
import firebase from "../../firebase";
import { toast } from "react-toastify";

const Register = () => {
    const [email, setEmail] = useState("");
    const toastId = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
        };

        toastId.current = toast.success(
            "Sending registration link to your email ...",
            { autoClose: false }
        );
        firebase
            .auth()
            .sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                toast.dismiss(toastId.current);
                toast.success(`Email sent to ${email}`);
                setEmail("");
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem("emailForRegistration", email);
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, " ", errorMessage);
                toast.dismiss(toastId.current);
                toast.error(
                    `Something went wrong.Contact developer if error persists.`
                );
            });
    };
    const registerForm = (
        <form onSubmit={submitHandler}>
            <input
                placeholder="Please enter your email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <br />
            <button className="btn btn-primary">Register</button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3>Register</h3>
                    {registerForm}
                </div>
            </div>
        </div>
    );
};

export default Register;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import firebase from "../../firebase";
import { loginUser } from "../../store/slices/authSlice";
import { useHistory } from "react-router-dom";

// utilities
import { createUser } from "../../utilities/user";

const RegisterComplete = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);
    const submitFormHandler = (event) => {
        event.preventDefault();

        // email should be present
        if (!email) {
            toast.error("Please enter the email used for registration");
            return;
        }
        // password length validation
        if (password.length < 6) {
            toast.error("Minimum password length should be 6");
            return;
        }

        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // The client SDK will parse the code from the link for you.
            firebase
                .auth()
                .signInWithEmailLink(email, window.location.href)
                .then(async (result) => {
                    // Clear email from storage.
                    window.localStorage.removeItem("emailForRegistration");
                    // You can access the new user via result.user
                    const user = result.user;
                    const idToken = await user.getIdToken();
                    console.log("user", user, "idToken", idToken);
                    dispatch(loginUser({ token: idToken, email: user.email }));
                    user.updatePassword(password)
                        .then(async function () {
                            await createUser(idToken);
                            history.push("/");
                        })
                        .catch(function (error) {
                            toast.error(error.message);
                        });
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };
    const registerCompleteForm = (
        <form onSubmit={submitFormHandler}>
            <input
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email again"
            />
            <br />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-control"
                type="password"
                autoFocus
            />
            <br />
            <button className="btn btn-primary" type="submit">
                Continue
            </button>
        </form>
    );
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h3>Complete the Registration</h3>
                    {registerCompleteForm}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;

import styles from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// firebase
import firebase from "./firebase.js";

// React and Redux
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "./store/slices/authSlice";
import LoggedInRoute from "./components/Route/LoggedInRoute";
import LoggedOutRoute from "./components/Route/LoggedOutRoute";

// Components
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";
import CreateEmail from "./components/CreateEmail";

// Pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages";
import RegisterCompletePage from "./pages/RegisterComplete";
import HistoryPage from "./pages/history";

const App = () => {
    const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const idToken = await user.getIdToken();
                const email = user.email;
                const name = user.displayName;
                console.log("user", user.displayName);
                dispatch(
                    loginUser({ token: idToken, email: email, name: name })
                );
            } else {
                // User is signed out
                // ...
            }
            setCheckingAuthStatus(false);
        });
    }, [dispatch]);
    return (
        <div className="App">
            {checkingAuthStatus ? (
                <div className={styles.CenterScreenSpinnerContainer}>
                    <Spinner />
                </div>
            ) : (
                <>
                    <ToastContainer />
                    <Layout>
                        <Switch>
                            <LoggedInRoute path="/" exact>
                                <HomePage />
                            </LoggedInRoute>
                            <LoggedInRoute path="/history">
                                <HistoryPage />
                            </LoggedInRoute>

                            {/* out */}
                            <LoggedOutRoute path="/login">
                                <LoginPage />
                            </LoggedOutRoute>

                            <LoggedOutRoute path="/register" exact>
                                <RegisterPage />
                            </LoggedOutRoute>
                            <LoggedOutRoute path="/register/complete" exact>
                                <RegisterCompletePage />
                            </LoggedOutRoute>
                        </Switch>
                    </Layout>
                </>
            )}
        </div>
    );
};

export default App;

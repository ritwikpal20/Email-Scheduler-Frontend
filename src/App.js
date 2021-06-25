import styles from "./App.module.css";

// firebase
import firebase from "./firebase.js";

// React and Redux
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "./store/slices/authSlice";
import LoggedInRoute from "./components/Route/LoggedInRoute";
import LoggedOutRoute from "./components/Route/LoggedOutRoute";

// Components
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Spinner from "./components/Spinner";

// Pages
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages";

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
                console.log("user", user);
                dispatch(loginUser(idToken, email));
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
                            <Route path="/" exact>
                                <HomePage />
                            </Route>
                            <LoggedOutRoute path="/login">
                                <LoginPage />
                            </LoggedOutRoute>
                            <LoggedOutRoute path="/register" exact>
                                <RegisterPage />
                            </LoggedOutRoute>
                        </Switch>
                    </Layout>
                </>
            )}
        </div>
    );
};

export default App;

import styles from "./App.module.css";

// firebase
import firebase from "./firebase.js";

// React and Redux
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser } from "./store/slices/authSlice";

// Components
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Login from "./components/Login/index.js";
import Register from "./components/Register/index.js";
import Spinner from "./components/Spinner";

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
                            <Route path="/login" component={Login} />
                            <Route
                                path="/register"
                                exact
                                component={Register}
                            />
                        </Switch>
                    </Layout>
                </>
            )}
        </div>
    );
};

export default App;

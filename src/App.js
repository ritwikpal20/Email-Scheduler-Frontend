// firebase
import firebase from "./firebase.js";

// React and Redux
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

// Components
import Layout from "./components/Layout";

import "./App.css";
import Login from "./components/Login/index.js";
import Register from "./components/Register/index.js";

const App = () => {
  const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);
  // const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const idToken = await user.getIdToken();
        const email = user.email;
        console.log("user", user);
        // dispatch(loggedInUser(idToken, email));
      } else {
        // User is signed out
        // ...
      }
      setCheckingAuthStatus(false);
    });
  }, []);
  return (
    <div className="App">
      {checkingAuthStatus ? (
        <div
          style={{
            position: "absolute",
            top: "50vh",
            left: "50vw",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <ToastContainer />
          <Layout>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </Layout>
        </>
      )}
    </div>
  );
};

export default App;

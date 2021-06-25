// Only logged out users can view else redirect to home page
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedInRoute = ({ children, ...rest }) => {
    let token = useSelector((state) => state.auth.token);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

export default LoggedInRoute;

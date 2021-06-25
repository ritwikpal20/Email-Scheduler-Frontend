// Only Logged in User can view else redirect
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const LoggedInRoute = ({ children, ...rest }) => {
    let token = useSelector((state) => state.auth.token);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default LoggedInRoute;

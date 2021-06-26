import axios from "axios";

const createUser = (token) => {
    axios
        .post(
            process.env.REACT_APP_API_LINK + "/create-user",
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {})
        .catch((err) => console.log(err));
};

export { createUser };

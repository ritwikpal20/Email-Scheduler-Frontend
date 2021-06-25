import styles from "./index.module.css";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: inline-block;
    margin: auto;
    border-color: red;
`;

const Spinner = () => {
    return (
        <div className={styles.Spinner}>
            <HashLoader color="blue" css={override} size={150} />
        </div>
    );
};

export default Spinner;

import { Helmet } from "react-helmet";
import Inbox from "../components/Inbox";

const HistoryPage = () => {
    return (
        <>
            <Helmet>
                <title>history Page</title>
            </Helmet>
            <Inbox />
        </>
    );
};

export default HistoryPage;

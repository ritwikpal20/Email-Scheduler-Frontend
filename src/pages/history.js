import { Helmet } from "react-helmet";
import SentEmails from "../components/SentEmails";

const HistoryPage = () => {
    return (
        <>
            <Helmet>
                <title>history Page</title>
            </Helmet>
            <SentEmails />
        </>
    );
};

export default HistoryPage;

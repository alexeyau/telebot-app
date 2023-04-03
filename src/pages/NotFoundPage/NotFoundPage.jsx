import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
    const location = useLocation();
    
    return(
        <>
            Page with URL - {location.pathname} is not found
        </>
    )
}

export default NotFoundPage;
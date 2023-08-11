import Button from "react-bootstrap/Button";
import './main.css';

function NotFound() {
    return (
        <>
            <br />
            <h1 className='text-center'>404 Not Found</h1>
            <p className='text-center'><Button variant="link" href="./">Back to home page</Button></p>
        </>
    );
}

export default NotFound;
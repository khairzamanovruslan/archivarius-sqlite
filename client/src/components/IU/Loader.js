import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return <div>
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '80px', marginBottom: '30px' }}>
            <Spinner animation="border" />
        </div>
    </div>
}

export default Loader;
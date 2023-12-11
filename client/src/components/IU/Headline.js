

const Headline = ({ children }) => {
    return <div>
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '30px', marginBottom: '30px' }}>
            <h1>{children}</h1>
        </div>
    </div>
}

export default Headline;
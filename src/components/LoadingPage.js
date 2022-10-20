import React from 'react';
import "../styles/spinner.css";

const LoadingPage = () => {
    return (
        <div className='spinner'>  
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingPage;
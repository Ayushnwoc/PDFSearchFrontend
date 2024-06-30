import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

const LoadingCircle = () => {
    return (
        <div className="circle-wrapper">
            <CirclesWithBar
                height="40"
                width="40"
                color="#4fa94d"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default LoadingCircle;

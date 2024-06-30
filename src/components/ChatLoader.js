import React from 'react';
import { Discuss } from 'react-loader-spinner';

const LoadingChat = () => {
    return (
        <div className="discuss-wrapper">
            <Discuss
                visible={true}
                height="80"
                width="80"
                ariaLabel="discuss-loading"
                wrapperStyle={{}}
                wrapperClass="discuss-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </div>
    );
};

export default LoadingChat;

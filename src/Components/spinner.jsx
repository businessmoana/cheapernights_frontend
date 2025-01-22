import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-b-4" />
        </div>
    );
};

export default Spinner;
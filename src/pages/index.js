import HomePage from '@/components/Home/components';

import React from 'react';

const page = () => {
    return (
        <>
            <div style={{ backgroundColor: 'red', color: 'white', padding: '100px', fontSize: '50px', textAlign: 'center', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
                TESTING UPDATES - IF YOU SEE THIS, IT WORKS
            </div>
            <HomePage />
        </>
    );
};

export default page;

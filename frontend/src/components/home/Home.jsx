import React, { memo } from 'react';
import SignUp from '../signup/SignUp';
const Home = memo(() => {
    return (
        <div className='relative bg-black h-screen'>
            <SignUp></SignUp>
        </div>
    );
});

export default Home;
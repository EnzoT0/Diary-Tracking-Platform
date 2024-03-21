import React from 'react';
import Homebar from '../components/Homebar';

const Diary = () => {
    return (
        <div>
            <Homebar/>
            Diary
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { navigate("/DiaryEntry");}}> Add diary Entry</button>
        </div>
    );
};

export default Diary;
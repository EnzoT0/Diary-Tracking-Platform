import React from 'react';
import Homebar from '../components/Homebar';
import { useNavigate } from 'react-router-dom';

const Diary = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Homebar/>
            Diary
            <button style={{ fontSize: '24px', padding: '5em' }} onClick={() => { navigate("/diaryEntry");}}> Add diary Entry</button>
        </div>
    );
};

export default Diary;
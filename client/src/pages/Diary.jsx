import React from 'react';
import Homebar from '../components/Homebar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

function Diary() {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const searchParams = new URLSearchParams(location.search);
    const eid = searchParams.get("eid");
    const did = searchParams.get("did");
    const email = eid;
    const diaryId = did;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    email: email,
                    diaryId: diaryId
                };
                const response = await fetch(`http://localhost:8080/diary`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.parse(JSON.stringify(data))
                });
                const fetchdata = await response.json();
                setEntries(fetchdata);
            } catch (error) {
                const data = {
                    email: email,
                    diaryId: diaryId
                };
                console.error('Error fetching data:', error);
                console.log('Data fetched:', data);
            }
        };
        fetchData();
    }, []);

    const [selectedEntry, setSelectedEntry] = useState('');

    const handleRadioChange = (entryId) => {
        setSelectedEntry(entryId);
    };

    const handleDelete = () => {
        const data = {
            email: email,
            diaryid: diaryId
        };
        fetch(`http://localhost:8080/diaryentry/deletediary`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.parse(JSON.stringify(data))
        })
        .then(response => response.json())
        .then(result => {
            console.log('Data sent to backend:', result);
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        });
    }

    return (
        <div>
            <Homebar/>
            Diary
            <div style={{ marginVertical: 10 }} />
            <div>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <div>
                            {entry.date}
                        </div>
                        <div>
                            {entry.emotion}
                        </div>
                        <div>
                            {entry.comments}
                        </div>
                        <div>
                            {entry.issue}
                        </div>
                        <div>
                            {entry.issueDescription}
                        </div>
                        <div key={`default-radio`} className="mb-3">
                            <Form.Check
                                type='radio'
                                label={`default radio`}
                                id={`default-radio`}
                                checked={selectedEntry === entry.id}
                                onChange={() => handleRadioChange(entry.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button style={{ fontSize: '24px', padding: '2em' }}> 
                <Link to={`/diaryEntry?eid=${eid}&did=${did}`}>
                    Add diary Entry
                </Link>
             </button>

            {/* <button style={{ fontSize: '24px', padding: '2em' }} onClick={() => { navigate("/diaryUpdate");}}> Update diary Entry</button> */}

            <button style={{ fontSize: '24px', padding: '2em' }} onClick={() => { handleDelete();}}> 
            <Link to={`/diarylist?eid=${eid}`}>
                Delete diary
            </Link>
            </button>
        </div>
    );
};

export default Diary;
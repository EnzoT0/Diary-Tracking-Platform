import React, {useState} from 'react';
import '../styles/Entry.css';
import Form from 'react-bootstrap/Form';
import Homebar from '../components/Homebar';
// function GetDiaryEntry() {
//     return (
//     <>
//         <form>
//             <label>
//                 Journal Entry
//             </label>

//             <input type = "text" id = "journal"> Write in what you think here </input>
//             <input type="submit" value = "Submit" onSubmit={}></input>
//         </form>
//     </>
//         )
// }

function EntriesForm() {
    const [emotion, setEmotion] = useState('');
    const [comments, setComments] = useState('');
    const [isEmotionFilled, setIsEmotionFilled] = useState(false);
    const [isCommentFilled, setIsCommentFilled] = useState(false);

    const handleEmotionChange = (event) => {
        setEmotion(event.target.value);
        setIsEmotionFilled(event.target.value.length > 0);    
    };
    
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
        setIsCommentFilled(event.target.value.length > 0);
        
    };

    const handleSubmit = () => {
        console.log('Emotion:', emotion);
        console.log('Comments:', comments);
        const data = {
            emotion: emotion,
            comments: comments,
        };
    
        fetch('http://localhost:8080/diaryentry/newdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Data sent to backend:', result);
        })
        .catch(error => {
            console.error('Error sending data to backend:', error);
        });
    };

    // const isDateValid = () => {
    //     let month = parseInt(dateMonth);
    //     let day = parseInt(dateDay);
    //     let hour = parseInt(dateHour);
    //     let minutes = parseInt(dateMinute);
    //     return (
    //         month >= 1 &&
    //         month <= 12 &&
    //         day >= 1 &&
    //         day <= 31 &&
    //         hour >= 0 &&
    //         hour <= 23 &&
    //         minutes >= 0 &&
    //         minutes <= 59
    //     );
    // };

    const isFormValid = () => {
        return (
            isCommentFilled && isEmotionFilled 
        );
    };

    return (
        <div>
            <Homebar />
            <div style={{ marginVertical: 10 }} />
            <div>
                New Entry
                <div style={{ marginVertical: 10 }} />
            </div>

            <div>
                Emotion
            </div>

            <input
                type="text"
                name="emotion"
                placeholder="Enter your emotion"
                onChange={handleEmotionChange}
                value={emotion}
            />
            <br />

            <div>
                Comments
            </div>
            <input
                type="text"
                name="comments"
                placeholder="Enter your comments"
                onChange={handleCommentsChange}
                value={comments}
            />
            <div style={{ marginVertical: 10 }} />
            
            {!isFormValid() ? (
                <p style={{ color: 'red' }}>Please fill in all fields before submitting</p>
            ) : null}
            <a href='/diary'>
            <button
                type="submit"
                disabled={!isFormValid()}
                style={{
                    backgroundColor: '#571F83',
                    borderRadius: 5,
                    fontWeight: 'bold',
                    fontSize: 15,
                    height: 50,
                    width: 100,
                    marginHorizontal: 50,
                    marginVertical: 10,
                    color: 'white',
                }}
                onClick={handleSubmit}
            >
                Submit
            </button>
            </a>
        </div>
    );
}

export default EntriesForm;
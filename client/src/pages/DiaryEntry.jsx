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

// function handlesubmit() {
//     // send data to back end
//     // signify that the data has been logged.
// }

function EntriesForm() {
    // const [title, setTitle] = useState('');
    // const [dateYear, setDateYear] = useState('2024');
    // const [dateMonth, setDateMonth] = useState('1');
    // const [dateDay, setDateDay] = useState('28');
    // const [dateHour, setDateHour] = useState('0');
    // const [dateMinute, setDateMinute] = useState('0');

    // TODO : make sure you create create the userinput into json string and then let the thing jsonify it. Name the variable singleuserinputobject.
    // const sendData = await request("http://localhost:8080/diaryentry").send(jsonify(singleuserinputobject));

    const [emotion, setEmotion] = useState('');
    const [comments, setComments] = useState('');
    const [isEmotionFilled, setIsEmotionFilled] = useState(false);
    const [isCommentFilled, setIsCommentFilled] = useState(false);

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleEmotionChange = (event) => {
        setEmotion(event.target.value);
        setIsEmotionFilled(event.target.value.length > 0);

        
    };
    
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
        setIsCommentFilled(event.target.value.length > 0);
        
    };

    const handleSubmit = () => {
        //console.log('Title:', title);
        console.log('Date:', Date());
        console.log('Emotion:', emotion);
        console.log('Comments:', comments);
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
                <p style={{ color: 'red' }}>Please fill in both emotion and comments before submitting</p>
            ) : null}
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
        </div>
    );
}

export default EntriesForm;
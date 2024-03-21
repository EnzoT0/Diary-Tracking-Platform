import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Homebar.jsx';

const sizeWidth = 3; // Adjust based on the number of properties in your EmotionBoard data

const fakeData = [{
  ID: '1',
  subtype: 'Happy',
  OverallType: 'Positive',
}, {
  ID: '2',
  subtype: 'Sad',
  OverallType: 'Negative',
}, {
  ID: '3',
  subtype: 'Angry',
  OverallType: 'Negative',
}, {
  ID: '4',
  subtype: 'Excited',
  OverallType: 'Positive',
}, {
  ID: '5',
  subtype: 'Anxious',
  OverallType: 'Negative',
}, {
  ID: '6',
  subtype: 'Relaxed',
  OverallType: 'Positive',
}];



const EmotionBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emotionBoard, setEmotionBoard] = useState(null);

  console.log("hello")

  useEffect(() => {
    // const fetchEmotionBoard = async () => {
    //   try {
    //     const response = await axios.get(`/api/emotionBoard/${id}`);
    //     setEmotionBoard(response.data);
    //   } catch (error) {
    //     console.error('Error fetching EmotionBoard data:', error);
    //   }
    // };

    // fetchEmotionBoard();

    const id = searchParams.get('id');
    console.log(id)

    setEmotionBoard(fakeData.find((data) => data.ID === id));
    console.log(emotionBoard)
    
  }, [searchParams]);

  if (!emotionBoard) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            {Object.keys(emotionBoard).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(emotionBoard).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default EmotionBoard;

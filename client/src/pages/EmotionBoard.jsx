// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from "react-router-dom";
// import Table from 'react-bootstrap/Table';

// const Columnsnames =  ["EmotionID", "Subtypes", "OverallType"];

// function DisplayEmotions(year) {

//     const mockup = [{
//         EmotionID: 1,
//         SubType: "mock1",
//         OverallType: "Angry"
//     }, {
//         EmotionID: 2,
//         SubType: "mock2",
//         OverallType: "Happy"
//     }];

//     return (
//         <>
//         <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
//         <thead>
//           <tr>
//             {Columnnames.map((colname) => (
//               <th key = {colname}> {colname} </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {mockup.map((queryresult) => (
//             <tr>
//               {Columnnames.map((colname) => (
//               <th key = {colname}> {queryresult[colname]} </th>
//             ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       </>
//     )
// }

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Homebar from '../components/Homebar.jsx';

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
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");
  const [fetchData, setFetchData] = useState([]);

  console.log("hello")

  // useEffect(() => {
  //   // const fetchEmotionBoard = async () => {
  //   //   try {
  //   //     const response = await axios.get(`/api/emotionBoard/${id}`);
  //   //     setEmotionBoard(response.data);
  //   //   } catch (error) {
  //   //     console.error('Error fetching EmotionBoard data:', error);
  //   //   }
  //   // };

  //   // fetchEmotionBoard();

  //   const id = searchParams.get('id');
  //   console.log(id)

  //   setEmotionBoard(fakeData.find((data) => data.ID === id));
  //   console.log(emotionBoard)
    
  // }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const body = {
              email: eid
            };
            const response = await fetch(`http://localhost:8080/emotionboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.parse(JSON.stringify(body))
            });
            const data = await response.json();
            setFetchData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);

  if (!fetchData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Homebar/>
      {/* <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
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
      </Table> */}
      <div>
        {/* Render JSON object */}
        {fetchData.map((item, index) => (
          <div key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionBoard;


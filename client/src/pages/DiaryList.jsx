import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Homebar from "../components/Homebar";
import Diary from "./Diary";
import { Link } from "react-router-dom";

function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const body = {
              email: eid
            };
            const response = await fetch(`http://localhost:8080/diaryentry/render`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.parse(JSON.stringify(body))
            });
            const data = await response.json();
            setDiaries(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    fetchData();
}, []);


// const handleDiaryClick = (id) => {
//   // Handle click event for diary button
//   // Redirect to diary page using the id
// };

const handleAddDiary = () => {
  // Handle click event for add diary button
  // Generate a new id for the new diary
  // Add the new diary to the diaries array
  
    const newId = diaries.length + 1;
    const newDiary = { id: newId };
    setDiaries([...diaries, newDiary]);
  
};

return (
  <>
    {/* ...existing code... */}
    <Homebar />
    <div>
      {/* Display buttons for each diary */}
      {diaries.map((diary) => (
        <button key={diary.id}>
          <Link to={`/diary?eid=${eid}&did=${diary.id}`}>
              Diary {diary.id}
          </Link>
        </button>
      ))}
      {/* Button to add a new diary */}
      <button onClick={handleAddDiary}>Add Diary</button>
    </div>

    
  </>
);}

//   return (
//     <>
//       <Homebar />
//       <Table
//         striped
//         bordered
//         borderColor="white"
//         hover
//         size="xxl"
//         style={{ justifySelf: "center" }}
//       >
//         <thead>
//           <tr>
//             {Columnnames.map((colname) => (
//               <th key={colname}> {colname} </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {goals.map((goal) => (
//             <tr key={goal.GoalID}>
//               {Columnnames.map((colname) => (
//                 <td key={colname}> {goal[colname]} </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <div>
//         <input type="text" value={inputValue} onChange={handleChange} />
//         <button onClick={handleAddGoal}>Add Diary</button>
//       </div>
//     </>
//   );
// }

export default DiaryList;

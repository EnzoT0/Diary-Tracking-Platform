import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Homebar from "../components/Homebar";
import Diary from "./Diary";
import { Link } from "react-router-dom";

function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [condition, setCondition] = useState("");
  const [fetchedData, setFetchData] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");

  const fetchData = async () => {
    try {
      const body = {
        email: eid,
        
      };
      fetch("http://localhost:8080/diaryentry/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "cors",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDiaries(JSON.parse(data.result));
        console.log("Data got from backend:", data.result);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch1 = () => {
    const data = {
        email: eid,
        issue: inputValue,
      };
      fetch("http://localhost:8080/diaryentry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFetchData(data.result);
          console.log("Data got from backend:", data.result);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch2 = () => {
    const data = {
        email: eid,
        condition: condition,
      };
      fetch("http://localhost:8080/diaryentry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFetchData(data.result);
          console.log("Data got from backend:", data.result);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
  };

  const handleCondition = (event) => {
    setCondition(event.target.value);
  }

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      {/* ...existing code... */}
      <Homebar />
      <div>
        {/* Display buttons for each diary */}
        {/* {diaries.map((array, index) => (
          <Link key={index} to={`/diary?eid=${eid}&did=${index}`}>
            <button>
              Diary {array[0]}
            </button>
          </Link>
        ))} */}
        {diaries}
        {/* Button to add a new diary */}
        <button onClick={handleAddDiary}>Add Diary</button>
      </div>

      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSearch1}>search1</button>
        <br />
        What part of diary do you want to see? Diarytheme or Menutheme?
        <br />
        If diarytheme, write in diarytheme else menutheme
        <br />
        <input type="text" value={condition} onChange={handleCondition} />
        <button onClick={handleSearch2}>search2</button>
        {fetchedData}
      </div>
    </>
  );
}

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
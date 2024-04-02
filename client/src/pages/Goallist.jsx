import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Homebar from "../components/Homebar";

const Columnnames = ["GoalID", "GoalDescription", "Status"];

async function DisplayGoals() {
  const [goals, setGoals] = useState([
    {
      GoalID: 1,
      GoalDescription: "mock1",
      Status: true, // true for done
    },
    {
      GoalID: 2,
      GoalDescription: "mock2",
      Status: false, // false for notdone
    },
  ]);
  // API REQUEST FOR GOALLIST
  // await request("http://localhost:8080/goallist");

  const [inputValue, setInputValue] = useState("");

  const handleAddGoal = () => {
    const newGoal = {
      GoalID: goals.length + 1,
      GoalDescription: inputValue,
      Status: false, // assuming newly added goals are not done
    };
    setGoals([...goals, newGoal]);
    setInputValue(""); // Clear input after adding
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Homebar />
      <Table
        striped
        bordered
        borderColor="white"
        hover
        size="xxl"
        style={{ justifySelf: "center" }}
      >
        <thead>
          <tr>
            {Columnnames.map((colname) => (
              <th key={colname}> {colname} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.GoalID}>
              {Columnnames.map((colname) => (
                <td key={colname}> {goal[colname]} </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
    </>
  );
}

export default DisplayGoals;

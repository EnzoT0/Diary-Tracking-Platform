import React, { useState } from "react";
import "../styles/Entry.css";
import Form from "react-bootstrap/Form";
import Homebar from "../components/Homebar";
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
  const searchParams = new URLSearchParams(window.location.search);
  const eid = searchParams.get("eid");
  const did = searchParams.get("did");
  const [dateYear, setDateYear] = useState("2024");
  const [dateMonth, setDateMonth] = useState("1");
  const [dateDay, setDateDay] = useState("28");
  const [emotion, setEmotion] = useState("");
  const [comments, setComments] = useState("");
  const [activity, setActivity] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [issue, setIssue] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [isEmotionFilled, setIsEmotionFilled] = useState(false);
  const [isCommentFilled, setIsCommentFilled] = useState(false);
  const [isActivityFilled, setIsActivityFilled] = useState(false);
  const [isActivityDescriptionFilled, setIsActivityDescriptionFilled] =
    useState(false);
  const [isIssueFilled, setIsIssueFilled] = useState(false);
  const [isIssueDescriptionFilled, setIsIssueDescriptionFilled] =
    useState(false);

  const handleEmotionChange = (event) => {
    setEmotion(event.target.value);
    setIsEmotionFilled(event.target.value.length > 0);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
    setIsCommentFilled(event.target.value.length > 0);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
    setIsActivityFilled(event.target.value.length > 0);
  };

  const handleActivityDescriptionChange = (event) => {
    setActivityDescription(event.target.value);
    setIsActivityDescriptionFilled(event.target.value.length > 0);
  };

  const handleYearChange = (event) => {
    setDateYear(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleMonthChange = (event) => {
    setDateMonth(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleDayChange = (event) => {
    setDateDay(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleIssueChange = (event) => {
    setIssue(event.target.value);
    setIsIssueFilled(event.target.value.length > 0);
  };

  const handleIssueDescriptionChange = (event) => {
    setIssueDescription(event.target.value);
    setIsIssueDescriptionFilled(event.target.value.length > 0);
  };

  const handleSubmit = () => {
    //console.log('Title:', title);
    console.log("Date:", Date());
    console.log("Emotion:", emotion);
    console.log("Comments:", comments);
    console.log("Activity:", activity);
    console.log("Activity Description:", activityDescription);
    console.log("Issue:", issue);
    console.log("Issue Description:", issueDescription);

    const data = {
      email: eid,
      diaryid: did,
      emotion: emotion,
      comments: comments,
      activity: activity,
      activityDescription: activityDescription,
      issue: issue,
      issueDescription: issueDescription, // TODO: might be conflicting
    };

    fetch(`http://localhost:8080/diaryentry/newdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data sent to backend:", result);
      })
      .catch((error) => {
        console.error("Error sending data to backend:", error);
      });
  };

  const isDateValid = () => {
    let year = parseInt(dateYear);
    let month = parseInt(dateMonth);
    let day = parseInt(dateDay);
    // let hour = parseInt(dateHour);
    // let minutes = parseInt(dateMinute);
    return (
      year > 1500 && month >= 1 && month <= 12 && day >= 1 && day <= 31
      // hour >= 0 &&
      // hour <= 23 &&
      // minutes >= 0 &&
      // minutes <= 59
    );
  };

  const isFormValid = () => {
    return (
      isCommentFilled &&
      isEmotionFilled &&
      isActivityFilled &&
      isActivityDescriptionFilled &&
      isDateValid() &&
      isIssueFilled &&
      isIssueDescriptionFilled
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

      <div>Date</div>
      <input
        type="text"
        name="dateYear"
        placeholder="Year"
        onChange={handleYearChange}
        value={dateYear}
      />
      <input
        type="text"
        name="dateMonth"
        placeholder="Month"
        onChange={handleMonthChange}
        value={dateMonth}
      />
      <input
        type="text"
        name="dateDay"
        placeholder="Day"
        onChange={handleDayChange}
        value={dateDay}
      />
      <div style={{ marginVertical: 10 }} />

      <div>Emotion</div>

      <input
        type="text"
        name="emotion"
        placeholder="Enter your emotion"
        onChange={handleEmotionChange}
        value={emotion}
      />
      <br />

      <div>Comments</div>
      <input
        type="text"
        name="comments"
        placeholder="Enter your comments"
        onChange={handleCommentsChange}
        value={comments}
      />
      <div style={{ marginVertical: 10 }} />

      <div>Activity</div>
      <input
        type="text"
        name="activity"
        placeholder="Enter your activity"
        onChange={handleActivityChange}
        value={activity}
      />
      <div style={{ marginVertical: 10 }} />

      <div>Activity Description</div>
      <input
        type="text"
        name="activityDescription"
        placeholder="Enter your activity description"
        onChange={handleActivityDescriptionChange}
        value={activityDescription}
      />
      <div style={{ marginVertical: 10 }} />

      <div>Issue</div>
      <input
        type="text"
        name="issue"
        placeholder="Enter your issue"
        onChange={handleIssueChange}
        value={issue}
      />
      <div style={{ marginVertical: 10 }} />

      <div>Issue Description</div>
      <input
        type="text"
        name="issueDescription"
        placeholder="Enter your issue description"
        onChange={handleIssueDescriptionChange}
        value={issueDescription}
      />
      <div style={{ marginVertical: 10 }} />

      {!isFormValid() ? (
        <p style={{ color: "red" }}>
          Please fill in all fields correctly before submitting
        </p>
      ) : null}
      <a href={`/diary?eid=${eid}&did=${did}`}>
        <button
          type="submit"
          disabled={!isFormValid()}
          style={{
            backgroundColor: "#571F83",
            borderRadius: 5,
            fontWeight: "bold",
            fontSize: 15,
            height: 50,
            width: 100,
            marginHorizontal: 50,
            marginVertical: 10,
            color: "white",
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

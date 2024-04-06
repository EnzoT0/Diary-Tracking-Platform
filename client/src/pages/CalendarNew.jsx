import Table from "react-bootstrap/Table";
import Navbar from "../components/Homebar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EmotionBoard from "./EmotionBoard.jsx";

const sizeHeight = 52;
const sizeWidth = 5;

const Types = [
  "Year",
  "YearTheme",
  "Date",
  "Summary",
  "EmotionBoard",
  "IssueBoard",
];
const COLUMNS = [
  "Year",
  "YearTheme",
  "Theme",
  "Date",
  "Summary",
  "IssueDateofEntry",
  "IssueName",
  "IssueResolved",
  "IssueDetails",
  "EmotionExamples",
  "EmotionCategory",
];

function ResponsiveExample() {
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");
  let [searchP, setSearchP] = useState("");
  let [searchS, setSearchS] = useState("");
  const [issue, setIssue] = useState(false);
  const [yearsHaving1, setYearsHaving1] = useState("");
  const [yearsHaving2, setYearsHaving2] = useState("");
  let [fetchData, setFetchData] = useState([]);

  // const handleSearchP = (event) => {
  //   clearTimeout(typingTimeout);
  //   const timeout = setTimeout(() => {
  //     setSearchP(event.target.value.replace(/[^a-zA-Z,]/g, ""));
  //   }, 1000);
  //   setTypingTimeout(timeout);

  // };

  // const handleSearchS = (event) => {
  //   clearTimeout(typingTimeout);
  //   const timeout = setTimeout(() => {
  //     setSearchS(event.target.value.replace(/[^a-zA-Z,]/g, ""));
  //   }, 1000);
  //   setTypingTimeout(timeout);
  // };

  const handleSearch = () => {
    if (searchP !== "" && searchS !== "") {
      const data = {
        projection: searchP,
        selection: searchS, // TODO: possible conflict
        email: eid,
      };
      fetch("http://localhost:8080/calendar/projectionandselection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.parse(JSON.stringify(data)),
      })
        .then((response) => setFetchData(response))
        .then((result) => {
          console.log("Data got from backend:", result);
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    } else if (searchP !== "") {
      const data = {
        projection: searchP, // TODO: possible conflict
        email: eid,
      };
      fetch("http://localhost:8080/calendar/projection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.parse(JSON.stringify(data)),
      })
        .then((response) => setFetchData(response))
        .then((result) => {
          console.log("Data got from backend:", result);
        })
        .catch((error) => {
          console.error("Error getting data to backend:", error);
        });
    } else if (searchS !== "") {
      const data = {
        selection: searchS, // TODO: possible conflict
        email: eid,
      };
      fetch("http://localhost:8080/calendar/selection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.parse(JSON.stringify(data)),
      })
        .then((response) => setFetchData(response))
        .then((result) => {
          console.log("Data got from backend:", result);
        })
        .catch((error) => {
          console.error("Error getting data to backend:", error);
        });
    } else {
      const data = {
        email: eid,
        issue: issue ? 1 : 0,
      };
      fetch("http://localhost:8080/calendar/none", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
        body: JSON.parse(JSON.stringify(data)),
      })
        .then((response) => setFetchData(response))
        .then((result) => {
          console.log("Data got from backend:", result);
        })
        .catch((error) => {
          console.error("Error getting data to backend:", error);
        });
    }
  };

  useEffect(() => {
    if (searchP !== "" || searchS !== "") {
      handleSearch();
    }
  }, []);

  const handleSearchP = (event) => {
    setSearchP(event.target.value.replace(/[^a-zA-Z,]/g, ""));
  };

  const handleSearchS = (event) => {
    setSearchS(event.target.value.replace(/[^a-zA-Z,]/g, ""));
  };

  const toggleIssue = () => {
    setIssue(!issue);
  };

  const handleyearsHaving1 = (event) => {
    setYearsHaving1(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleyearsHaving2 = (event) => {
    setYearsHaving2(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleGB1 = () => {
    const data = {
      email: eid,
      table: "Issue",
    };
    fetch(`http://localhost:8080/calendar/GROUPBY`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => setFetchData(response))
      .then((result) => {
        console.log("Data got from backend:", result);
      })
      .catch((error) => {
        console.error("Error getting data to backend:", error);
      });
  };

  const handleGB2 = () => {
    const data = {
      email: eid,
      table: "EB",
    };
    fetch(`http://localhost:8080/calendar/GROUPBY`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => setFetchData(response[0]))
      .then((result) => {
        console.log("Data got from backend:", result);
      })
      .catch((error) => {
        console.error("Error getting data to backend:", error);
      });
  };

  const handleHaving = () => {
    const data = {
      email: eid,
      recentyearno: yearsHaving1,
    };
    fetch(`http://localhost:8080/calendar/HAVING`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => setFetchData(response))
      .then((result) => {
        console.log("Data got from backend:", result);
      })
      .catch((error) => {
        console.error("Error getting data to backend:", error);
      });
  };

  const handleHaving2 = () => {
    const data = {
      email: eid,
      recentyearno: yearsHaving2,
      resolvedissue: true,
    };
    fetch(`http://localhost:8080/calendar/HAVING`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => setFetchData(response))
      .then((result) => {
        console.log("Data got from backend:", result);
      })
      .catch((error) => {
        console.error("Error getting data to backend:", error);
      });
  };

  const handleDivision = () => {
    const data = {
      email: eid,
    };
    fetch(`http://localhost:8080/calendar/division`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(JSON.stringify(data)),
    })
      .then((response) => setFetchData(response))
      .then((result) => {
        console.log("Data got from backend:", result);
      })
      .catch((error) => {
        console.error("Error getting data to backend:", error);
      });
  };

  return (
    <div>
      <Navbar />

      <button>
        <Link to={`/issueBoard?eid=${eid}`}>Issue Board</Link>
      </button>

      <button>
        <Link to={`/emotionBoard?eid=${eid}`}>Emotion Board</Link>
      </button>

      <div>
        There are 5 fields to choose from in the calendar: <br />
        y.yearfield,y.Yeartheme,y.Dateofentry,y.Summary,yt.Theme <br />
        Example search: y.yearfield,y.Yeartheme,y.Dateofentry,y.Summary,
        <br />
      </div>
      <input
        type="text"
        placeholder="Projection"
        value={searchP}
        onChange={(e) => handleSearchP(e)}
      />
      <div style={{ marginVertical: 10 }} />
      <div>
        Example search: y.yearfield = 2022 AND y.Yeartheme = &quot;Hello
        World&quot;
      </div>
      <input
        type="text"
        placeholder="Selection"
        value={searchS}
        onChange={(e) => handleSearchS(e)}
      />
      <button onClick={() => handleSearch()}>Search</button>
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => toggleIssue()}>
        {issue ? "haveIssue: YES" : "haveIssue: NO"}
      </button>
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleGB1()}>
        number of issues by year overall
      </button>
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleGB2()}>
        number of emotions by year overall
      </button>
      {/* <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleGB3()}>number of emotions within a year</button> */}
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleHaving()}>
        number of issues within the recent ? year
      </button>
      <input
        type="number"
        placeholder="Enter year"
        value={yearsHaving1}
        onChange={(e) => handleyearsHaving1(e)}
      />
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleHaving2()}>
        number of issues within ? year resolved
      </button>
      <input
        type="number"
        placeholder="Enter year"
        value={yearsHaving2}
        onChange={(e) => handleyearsHaving2(e)}
      />
      <div style={{ marginVertical: 10 }} />
      <button onClick={() => handleDivision()}>
        find all the issues that have not been resolved every year overall.
      </button>

      {/* <Table
        striped
        bordered
        borderColor="white"
        hover
        size="xxl"
        style={{ justifySelf: "center" }}
      >
        <thead>
          <tr>
            {COLUMNS.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fetchData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {Array.from({ length: sizeWidth }).map((_, indexWidth) => (
                <td key={indexWidth}>
                  {/* Conditionally render EmotionBoard component 
                  {indexWidth === 3 ? (
                    <Link
                      to={`/emotionBoard??eid=${eid}?id=${data.EmotionBoard}`}
                    >
                      EmotionBoard {data.EmotionBoard}
                    </Link>
                  ) : indexWidth === 4 ? (
                    <Link to={`/issueBoard??eid=${eid}?id=${data.IssueBoard}`}>
                      IssueBoard {data.IssueBoard}
                    </Link>
                  ) : (
                    data[COLUMNS[indexWidth]] // Render other fields
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table> */}

      <div style={{ marginVertical: 10 }} />

      <div>
        {/* Render JSON object */}
        {fetchData.map((item, index) => (
          <div key={index}>
            {JSON.stringify(item, null, 2).split(',"Summary"').join(",\n")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResponsiveExample;

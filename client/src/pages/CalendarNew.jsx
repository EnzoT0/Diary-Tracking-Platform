import Table from 'react-bootstrap/Table';

import Navbar from '../components/Homebar.jsx';
import { Link } from 'react-router-dom';

const sizeHeight = 52
const sizeWidth = 5

const Types = ['Year', 'YearTheme', 'Date', 'Summary', 'EmotionBoard', 'IssueBoard'];

function ResponsiveExample() {
  const fetchData = [{
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/01/2021",
    "Summary": "First day of the year",
    "EmotionBoard": 1,
    "IssueBoard": 1
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/02/2021",
    "Summary": "Second day of the year",
    "EmotionBoard": 2,
    "IssueBoard": 2
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/03/2021",
    "Summary": "Third day of the year",
    "EmotionBoard": 3,
    "IssueBoard": 3
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/04/2021",
    "Summary": "Fourth day of the year",
    "EmotionBoard": 4,
    "IssueBoard": 4
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/05/2021",
    "Summary": "Fifth day of the year",
    "EmotionBoard": 5,
    "IssueBoard": 5
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/06/2021",
    "Summary": "Sixth day of the year",
    "EmotionBoard": 6,
    "IssueBoard": 6
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/07/2021",
    "Summary": "Seventh day of the year",
    "EmotionBoard": 7,
    "IssueBoard": 7
  }]

  return (
    <div>

      <Navbar/>
      <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            {Types.map((day, index) => (
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
                  {/* Conditionally render EmotionBoard component */}
                  {indexWidth === 3 ? (
                    <Link to={`/emotionBoard?id=${data.EmotionBoard}`}>
                      EmotionBoard {data.EmotionBoard}
                    </Link>
                  ) : 
                    indexWidth === 4 ? (
                    <Link to={`/issueBoard?id=${data.IssueBoard}`}>
                      IssueBoard {data.IssueBoard}
                    </Link>
                  ) : (
                    data[Types[indexWidth]] // Render other fields
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsiveExample;

import Table from 'react-bootstrap/Table';

import Navbar from '../components/Homebar.jsx';

const sizeHeight = 52
const sizeWidth = 6

const Types = ['Year', 'YearTheme', 'Date', 'Summary', 'EmotionBoard', 'IssueBoard'];

function ResponsiveExample() {
  const fetchData = [{
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/01/2021",
    "Summary": "First day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/02/2021",
    "Summary": "Second day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/03/2021",
    "Summary": "Third day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/04/2021",
    "Summary": "Fourth day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/05/2021",
    "Summary": "Fifth day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/06/2021",
    "Summary": "Sixth day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  },
  {
    "Year": "2021",
    "YearTheme": "New Beginnings",
    "Date": "01/07/2021",
    "Summary": "Seventh day of the year",
    "EmotionBoard": "Happy",
    "IssueBoard": "None"
  }]


  return (
    <div>
      <Navbar/>
      <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            {Array.from({ length: sizeWidth }).map((_, index) => (
              <th key={index}>{Types[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fetchData.map((data, index) => (
            <tr key={index}>
              {Object.values(data).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsiveExample;
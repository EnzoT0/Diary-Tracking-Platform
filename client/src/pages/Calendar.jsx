import Table from 'react-bootstrap/Table';

import Navbar from '../components/Homebar.jsx';
import { get, request, send, set } from 'http';

const sizeHeight = 52
const sizeWidth = 6

const Types = ['Year', 'YearTheme', 'Date', 'Summary', 'EmotionBoard', 'IssueBoard'];

async function Calendar() {
  // const fetchData = [{
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/01/2021",
  //   "Summary": "First day of the year",
  //   "EmotionBoard": 1,
  //   "IssueBoard": 1
  // }, {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/02/2021",
  //   "Summary": "Second day of the year",
  //   "EmotionBoard": 2,
  //   "IssueBoard": 2
  // },   {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/03/2021",
  //   "Summary": "Third day of the year",
  //   "EmotionBoard": 3,
  //   "IssueBoard": 3
  // },
  // {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/04/2021",
  //   "Summary": "Fourth day of the year",
  //   "EmotionBoard": 4,
  //   "IssueBoard": 4
  // },
  // {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/05/2021",
  //   "Summary": "Fifth day of the year",
  //   "EmotionBoard": 5,
  //   "IssueBoard": 5
  // },
  // {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/06/2021",
  //   "Summary": "Sixth day of the year",
  //   "EmotionBoard": 6,
  //   "IssueBoard": 6
  // },
  // {
  //   "Year": "2021",
  //   "YearTheme": "New Beginnings",
  //   "Date": "01/07/2021",
  //   "Summary": "Seventh day of the year",
  //   "EmotionBoard": 7,
  //   "IssueBoard": 7
  // }]

  const fetchData = await request("http://localhost:8080/calendar");

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

export default Calendar;
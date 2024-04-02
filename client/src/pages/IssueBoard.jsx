import Table from 'react-bootstrap/Table';
import Homebar from '../components/Homebar';

const Columnnames =  ["IssueID", "Name", "Resolved", "Date", "Details"];

async function DisplayIssues(year) {

    // const mockup = [{
    //     IssueID: 1,
    //     Name: "mock1",
    //     Resolved: true,
    //     Date: Date('January 20, 2020'),
    //     Details: "HelloWorld"
    // }, {
    //     IssueID: 2,
    //     Name: "mock2",
    //     Resolved: false,
    //     Date: Date('January 21, 2020'),
    //     Details: "HelloWorld1"
    // }];

    const mockup = await request("http://localhost:8080/issueboard");

    return (
        <>
        <Homebar />
        <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            {Columnnames.map((colname) => (
              <th key = {colname}> {colname} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockup.map((queryresult) => (
            <tr>
              {Columnnames.map((colname) => (
              <th key = {colname}> {queryresult[colname]} </th>
            ))}
            </tr>
          ))}
        </tbody>
      </Table>
      </>
    )
}

export default DisplayIssues
import Table from 'react-bootstrap/Table';
const http = require("node:http");

const Columnsnames =  ["ID", "Name", "Email", "Placemet"];

async function DisplayFriends() {

    const mockup = await request("http://localhost:8080/friends");

    return (
        <>
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

export default DisplayGoals
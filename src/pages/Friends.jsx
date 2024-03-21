import Table from 'react-bootstrap/Table';

const Columnsnames =  ["ID", "Name", "Email", "Placemet"];

function DisplayFriends() {

    const mockup = [{
        ID: 1,
        Name: "mock1",
        Email: "mock1@gmail.com", // note that password is not returned since it is private.
        Placemet: "Vancouver" // true for done
    }, {
        ID: 2,
        Name: "mock2",
        Email: "mock2@gmail.com",
        Placemet: "Toronto" // false for notdone
    }];

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
import Table from 'react-bootstrap/Table';

const Columnsnames =  ["GoalID", "GoalDescription", "Status"];

function DisplayGoals() {

    const mockup = [{
        GoalID: 1,
        GoalDescription: "mock1",
        Status: true // true for done
    }, {
        GoalID: 2,
        GoalDescription: "mock2",
        Status: false // false for notdone
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
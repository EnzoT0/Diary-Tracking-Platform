import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

const Columnnames =  ["ID", "Name", "Email", "Placemet"];

function DisplayFriends() {

    // const mockup = [{
    //     ID: 1,
    //     Name: "mock1",
    //     Email: "mock1@gmail.com", // note that password is not returned since it is private.
    //     Placemet: "Vancouver" // true for done
    // }, {
    //     ID: 2,
    //     Name: "mock2",
    //     Email: "mock2@gmail.com",
    //     Placemet: "Toronto" // false for notdone
    // }];
    const searchParams = new URLSearchParams(location.search);
    const eid = searchParams.get("eid");
    const [friends, setFriends] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const body = {
                email: eid
              };
              const response = await fetch(`http://localhost:8080/friends`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.parse(JSON.stringify(body))
              });
              const data = await response.json();
              setFriends(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);

    return (
        <>
          <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
          <thead>
            <tr>
              {Columnnames.map((colname) => (
                <th key={colname}> {colname} </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {friends.map((queryresult, index) => (
              <tr key={index}>
                {Columnnames.map((colname) => (
                <th key={colname}> {queryresult[colname]} </th>
              ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )
}

export default DisplayGoals
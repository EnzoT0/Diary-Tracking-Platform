import Table from 'react-bootstrap/Table';
import Homebar from '../components/Homebar';
import { useEffect, useState } from 'react';

const Columnnames =  ["IssueID", "Name", "Resolved", "Date", "Details"];

function DisplayIssues() {
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");

    const mockup = [{
        IssueID: 1,
        Name: "mock1",
        Resolved: true,
        Date: Date('January 20, 2020'),
        Details: "HelloWorld"
    }, {
        IssueID: 2,
        Name: "mock2",
        Resolved: false,
        Date: Date('January 21, 2020'),
        Details: "HelloWorld1"
    }];
    const [issues, setIssues] = useState([]);
    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
          try {
              const body = {
                email: eid
              };
              const response = await fetch(`http://localhost:8080/issueboard`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.parse(JSON.stringify(body))
              });
              const data = await response.json();
              setFetchData(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      fetchData();
  }, []);

    return (
        <>
        <Homebar />
        {/* <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
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
      </Table> */}
      <div>
        {/* Render JSON object */}
        {fetchData.map((item, index) => (
          <div key={index}>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))}
      </div>
      </>
    )
}

export default DisplayIssues
import Table from 'react-bootstrap/Table';

import Navbar from '../components/Homebar.jsx';

const sizeHeight = 52;
const sizeWidth = 7;

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ResponsiveExample() {
  return (
    <div>
      <Navbar/>
      <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            <th>Week</th>
            {Array.from({ length: sizeWidth }).map((_, index) => (
              <th key={index}>{Days[index]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: sizeHeight }).map((_, indexHeight) => (
            <tr>
              <td key={indexHeight}>{indexHeight+1}</td>
              {Array.from({ length: sizeWidth }).map((_, indexWidth) => (
                <td key={indexWidth}>Table cell {indexWidth+1}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsiveExample;

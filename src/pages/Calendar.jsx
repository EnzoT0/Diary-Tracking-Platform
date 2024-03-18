import Table from 'react-bootstrap/Table';

const sizeHeight = 15;
const sizeWidth = 7;

const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function ResponsiveExample() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: sizeWidth }).map((_, index) => (
            <th key={index}>{Days[index]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: sizeHeight }).map((_, indexHeight) => (
          <tr>
            <td key={indexHeight}>{indexHeight}</td>
            {Array.from({ length: sizeWidth }).map((_, indexWidth) => (
              <td key={indexWidth}>Table cell {indexWidth}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ResponsiveExample;
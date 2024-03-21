import React from 'react';
import Table from 'react-bootstrap/Table';
import Navbar from '../components/Homebar.jsx';
import { Link } from 'react-router-dom'; // Import Link from React Router
import EmotionBoard from './EmotionBoard.jsx'; // Import EmotionBoard component

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
            {Days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: sizeHeight }).map((_, indexHeight) => (
            <tr key={indexHeight}>
              <td>{indexHeight + 1}</td>
              {Array.from({ length: sizeWidth }).map((_, indexWidth) => (
                <td key={indexWidth}>
                  {/* Render Link to EmotionBoard */}
                  {indexHeight === 0 && indexWidth === 3 ? (
                    <Link to={`/emotionBoard${indexHeight + 1}`}>
                      EmotionBoard {indexHeight + 1}
                    </Link>
                  ) : (
                    `Table cell ${indexWidth + 1}`
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ResponsiveExample;

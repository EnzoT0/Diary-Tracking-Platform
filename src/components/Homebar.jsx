import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Homebar() {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', paddingBottom: '2em'}}>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href='/'>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/calendar" style={{margin: '7em'}}>Calendar</Nav.Link>
            <Nav.Link href="/diary" style={{margin: '7em'}}>Diary</Nav.Link>
            <Nav.Link href="/goallist" style={{margin: '7em'}}>Goal List</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Homebar;
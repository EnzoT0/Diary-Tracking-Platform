import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Homebar() {
  const searchParams = new URLSearchParams(location.search);
  const eid = searchParams.get("eid");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        paddingBottom: "2em",
      }}
    >
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href={`/menu?eid=${eid}`}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={`/calendar?eid=${eid}`} style={{ margin: "7em" }}>
              Calendar
            </Nav.Link>
            <Nav.Link href={`/diarylist?eid=${eid}`} style={{ margin: "7em" }}>
              Diary
            </Nav.Link>
            <Nav.Link href={`/goallist?eid=${eid}`} style={{ margin: "7em" }}>
              Goal List
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Homebar;

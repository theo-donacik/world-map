import { Nav } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

export default function NavToAdminBtn() {
  return (
    <div className='nav-btn'>
      <Nav.Link href="/world-map/#/admin">
        <Person/>
      </Nav.Link>
    </div>
  )
}
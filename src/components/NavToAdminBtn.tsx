import { Nav } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

export default function NavToAdminBtn() {
  return (
    <div className='nav-btn'>
      <Nav.Link href="/#/admin">
        <Person/>
      </Nav.Link>
    </div>
  )
}
import { Nav } from "react-bootstrap";
import { ArrowReturnLeft } from "react-bootstrap-icons";

export default function NavToMainBtn() {
  return (
    <div className="nav-btn">
      <Nav.Link href="/">
        <ArrowReturnLeft/>
      </Nav.Link>
    </div>
  )
}
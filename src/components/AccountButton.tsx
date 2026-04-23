import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { apiValidateAdminToken } from "../dao/discord";
import { token_key } from "../util/constnats";
import DiscordModal from "./DiscordModal";

export default function AccountButton({token}: {token: string | false}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showDCLogin, setShowDCLogin] = useState<boolean>(false)

  useEffect(() => {
    const adminToken = localStorage.getItem(token_key)
    if(adminToken) {
      apiValidateAdminToken(adminToken)
      .then(() => {
        setIsAdmin(true)
      })
      .catch(() => {
        console.log("Invalid admin token")
      })
    }
  }, [token])
  
  if(token && !isAdmin) {
    return(
      <div></div>
    )
  }
  else if(token && isAdmin) {
    return (
      <div className='nav-btn'>
        <Nav.Link href="/#/admin">
          <Person/>
        </Nav.Link>
      </div>  
    )
  }
  else {
    return (
      <div className='nav-btn'>
        <Person onClick={() => setShowDCLogin(true)}/>
        <DiscordModal show={showDCLogin} setShow={setShowDCLogin}/>
      </div>  
    )
  }

}
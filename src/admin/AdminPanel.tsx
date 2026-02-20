import { useEffect, useState } from "react"
import { apiValidateAdminToken } from "../dao/login";
import { admin_token_key } from "../util/constnats";
import AdminControls from "./AdminControls";
import LoginPage from "./LoginPage";

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const adminToken = localStorage.getItem(admin_token_key)
    if(adminToken) {
      apiValidateAdminToken(adminToken)
      .then(() => {
        setLoggedIn(true)
      })
      .catch(() => {
        console.log("Invalid admin token")
        localStorage.removeItem(admin_token_key)
      })
    }
  }, [])
  
  return (
    <div>
      {
        loggedIn ? <AdminControls/> : <LoginPage setLoggedIn={setLoggedIn}/>
      }
    </div>
  );
}
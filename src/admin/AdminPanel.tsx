import { useEffect, useState } from "react"
import { apiValidateAdminToken } from "../dao/discord";
import { token_key } from "../util/constnats";
import AdminControls from "./AdminControls";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
  }, [])
  
  return (
    <div>
      {
        isAdmin ? <AdminControls/> : <div>Failed to validate admin status</div>
      }
    </div>
  );
}
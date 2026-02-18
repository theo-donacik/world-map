import { useState } from "react"
import AdminControls from "./AdminControls";
import LoginPage from "./LoginPage";

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  
  return (
    <div>
      {
        loggedIn ? <AdminControls/> : <LoginPage setLoggedIn={setLoggedIn}/>
      }
    </div>
  );
}
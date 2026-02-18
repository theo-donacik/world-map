import { useState } from "react";
import { Form } from "react-bootstrap";
import { apiLogin } from "../dao/login";

export default function LoginPage({setLoggedIn}: {setLoggedIn: (isLogged: boolean) => void}) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFail, setLoginFail] = useState<boolean>(false);


  function handleLogin() {
    apiLogin(username, password)
    .then((token) => {
      setLoggedIn(true)
    })
    .catch(() => {
      setLoginFail(true);
    });
  }

  return (
    <div className="login">
    <Form>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />      
      </Form.Group>
      {loginFail && <p>Invalid Username Or Password</p>}
    </Form>
    <button onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}
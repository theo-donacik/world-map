import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
const LOGIN_API = API_BASE+'/login'

export async function apiLogin(
  username: string,
  password: string
)
{
  const r = await axios.post(LOGIN_API, {
    username: username,
    password: password,
  });
  return r.data;
}
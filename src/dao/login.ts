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

export async function apiCheckToken(token: string) {
  const r = await axios.post(LOGIN_API + '/validate', {
    token: token,
  });
  return r.data;
} 

export async function apiNewToken() {
  console.log("API BASE:", API_BASE)
  const r = await axios.post(LOGIN_API + '/anon');
  return r.data;
} 

export async function apiValidateAdminToken(token: string) {
  const r = await axios.post(LOGIN_API + '/validateAdmin', {
    token: token 
  });
  return r.data;
} 
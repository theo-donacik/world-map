export const token_key = "token"

export function getAuthHeader() {
  const adminToken = localStorage.getItem(token_key)
  return {headers: { 'Authorization': 'Bearer ' + adminToken }}
}
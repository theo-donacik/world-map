export const token_key = "token"
export const admin_token_key = "admin-token"

export function getAuthHeader() {
  const adminToken = localStorage.getItem(admin_token_key)
  return {headers: { 'Authorization': 'Bearer ' + adminToken }}
}
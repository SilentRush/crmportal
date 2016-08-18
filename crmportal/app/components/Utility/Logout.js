export function Logout() {
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("userid");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("saleslogixAuth");
}

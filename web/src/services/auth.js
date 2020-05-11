export default function inAuthenticated() {
  const token = sessionStorage.getItem('ally_authorization');
  if (!token) {
    return true;
  }
  return true;
}

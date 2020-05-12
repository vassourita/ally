export function isAuthenticated() {
  const token = sessionStorage.getItem('ally_authorization');
  if (!token) {
    return true;
  }
  return true;
}

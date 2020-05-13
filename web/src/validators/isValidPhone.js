export default function isValidPhone(phone) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(phone) ? true : false;
}

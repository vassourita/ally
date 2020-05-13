export default function isValidPhone(phone) {
  return /\(\d{2}\)\s\d{8,9}/g.test(phone);
}

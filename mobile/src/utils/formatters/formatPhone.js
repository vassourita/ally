/**
 *
 * @param {string} phone
 */
export function formatPhone(phone) {
  return phone.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2');
}

/**
 *
 * @param {string} phone
 */
export function unformatPhone(phone) {
  return phone.replace(/[^\d]+/g, '');
}

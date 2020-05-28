/**
 *
 * @param {string} cpf
 */
export function formatCpf(cpf) {
  return cpf.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 *
 * @param {string} cpf
 */
export function unformatCpf(cpf) {
  return cpf.replace(/[^\d]+/g, '');
}

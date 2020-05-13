export function formatCnpj(cnpj) {
  return cnpj.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5');
}
export function unformatCnpj(cnpj) {
  return cnpj.replace(/[^\d]+/g, '');
}

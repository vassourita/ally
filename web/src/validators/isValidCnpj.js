export default function isValidCnpj(cnpj) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(cnpj) ? true : false;
}

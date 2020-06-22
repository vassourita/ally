export class AllySqlJoinTypeError extends Error {
  constructor() {
    super('Joins must always have a type');
    this.name = 'AllySqlJoinTypeError';
  }
}

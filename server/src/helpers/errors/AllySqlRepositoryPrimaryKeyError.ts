export default class AllySqlRepositoryPrimaryKeyError extends Error {
  constructor() {
    super('A model should have at least 1 primary key field');
    this.name = 'AllySqlModelPrimaryKeyError';
  }
}

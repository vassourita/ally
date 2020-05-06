declare namespace allySql {
  interface Model {
    tableName: string;
    tableSchema: allySql.ISchema;
    fields: string[];
    primaryFields: string[];
    requiredFields: string[];
    returnFields: string[];
  }

  interface ISchema {
    [fieldName: string]: {
      primary?: boolean;
      required?: boolean;
      returning?: boolean;
    };
  }

  interface IQuery {
    attrs?: string[];
    where?: IWhere;
    join?: IJoin[];
    limit?: number;
    offset?: number;
  }

  interface IWhere {
    [field: string]: string;
  }

  interface IJoin {
    model: Model;
    attrs: string[];
    join: IJoin[];
    on: IWhere;
    as: string;
    type: 'many' | 'single';
  }
}

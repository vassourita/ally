export {};

declare global {
  type Context = typeof import('./src/Context').default;

  interface HttpRequest {
    body: object;
    query: {
      page?: number;
    };
    params: object;
  }

  interface HttpResponse {
    body: any;
    statusCode: number;
  }

  interface HttpError {
    message: string;
  }

  type ControllerRoute = (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;

  namespace allySql {
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
        type: Boolean | Number | String | ISchema[];
      };
    }

    interface IQueryOne {
      attrs?: string[];
      where?: IWhere;
      join?: IJoin[];
      offset?: number;
    }

    interface IQueryMany extends IQueryOne {
      limit?: number;
    }

    interface IDeleteQuery {
      where: IWhere;
    }

    type IWhere = {
      [field: string]: string | number | boolean;
    };

    interface IJoin {
      model: Model;
      attrs: string[];
      join: IJoin[];
      on: IWhere;
      as: string;
      type: 'many' | 'single';
    }
  }
}

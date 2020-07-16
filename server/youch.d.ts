declare module 'youch' {
  import { Request, Request } from 'express';

  class Youch {
    constructor(err: Error, req: Request);

    toJSON(): Promise<any>;
  }
  export default Youch;
}

declare module 'leite' {
  export default {} as any;
}

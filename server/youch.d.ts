declare module 'youch' {
  import { Request } from 'express';

  class Youch {
    constructor(err: Error, req: Request);

    toJSON(): Promise<any>;
  }
  export default Youch;
}

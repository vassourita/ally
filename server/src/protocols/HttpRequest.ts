export default interface HttpRequest {
  body: object;
  params: {
    id: number;
  };
  query: {
    page?: number;
  };
  headers: {
    'x-content-type': string;
    authorization: string;
  };
  user?: {};
}

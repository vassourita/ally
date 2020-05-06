export default class ControllerBase {
  index?: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  show?: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  create?: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  update?: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  delete?: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
}

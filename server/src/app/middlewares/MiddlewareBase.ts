import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

export default abstract class MiddlewareBase {
  public abstract async handle(request: HttpRequest, ctx: Context): Promise<HttpResponse>;
}

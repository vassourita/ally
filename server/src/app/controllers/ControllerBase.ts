import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

export default class ControllerBase {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.NotImplemented();
  }
  static async show(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.NotImplemented();
  }
  static async create(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.NotImplemented();
  }
  static async update(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.NotImplemented();
  }
  static async delete(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.NotImplemented();
  }
}

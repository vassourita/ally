import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

export default class ControllerBase {
  static index: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  static show: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  static create: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  static update: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
  static delete: (request: HttpRequest, ctx: Context) => Promise<HttpResponse>;
}

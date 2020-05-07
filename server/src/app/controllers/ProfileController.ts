import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

import ControllerBase from './ControllerBase';

export default class ProfileController extends ControllerBase {
  static async show(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    return ctx.Ok(request.user);
  }
}

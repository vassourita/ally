import axios from 'axios';
import bcrypt from 'bcryptjs';

import Context from '../../Context';
import HttpRequest from '../../protocols/HttpRequest';
import HttpResponse from '../../protocols/HttpResponse';

import ControllerBase from './ControllerBase';

export default class UserController extends ControllerBase {
  static async index(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const { page = 1 } = request.query;

    const users = await ctx.Users.find({
      limit: 10,
      offset: (page - 1) * 10,
    });

    return ctx.Ok(users);
  }

  static async show(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const { id } = request.params;

    const user = await ctx.Users.findOne({
      where: { id },
    });

    if (user) {
      return ctx.Ok(user);
    }

    return ctx.NotFound('User does not exists');
  }

  static async store(request: HttpRequest, ctx: Context): Promise<HttpResponse> {
    const data = request.body as any;

    const userExists = await ctx.Users.findOne({
      where: { email: data.email },
    });

    if (userExists) {
      return ctx.Unauthorized('User already exists', 'email');
    }

    const { filename } = request.file;
    const { data: address } = await axios.get(`https://viacep.com.br/ws/${data.cep}/json/`);
    const cities = fs.readFileSync(resolve(__dirname, '..', '..', 'json', 'municipios.json'));
    const microregion = JSON.parse(cities).filter(city => city.id == address.ibge)[0].microrregiao;

    const passwordHash = await bcrypt.hash(data.password, 8);

    const user = await ctx.Users.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      birth: data.birth,
      employer: data.employer,
      password: passwordHash,
      city: address.localidade,
      microregion_id: microregion.id,
      image: filename,
    });

    return ctx.Created(user);
  }
}

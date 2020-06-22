import 'dotenv/config';
import { AllyApi } from '@root/Api';

const api = new AllyApi();

api.listen(3333);

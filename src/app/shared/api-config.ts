import { environment } from "src/environments/environment";

export class ApiConfig {

  static readonly API_BASE = environment.API_ENDPOINT;

  static readonly users = ApiConfig.API_BASE + '/users';

  static readonly messages = ApiConfig.API_BASE + '/messages';
}
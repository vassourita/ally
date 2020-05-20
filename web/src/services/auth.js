export default class Auth {
  static TOKEN_KEY = '@ally-authorization';

  static get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  static getToken = () => {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const parsed = JSON.parse(token);
      return parsed.token;
    }
  };

  static getUserId = () => {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const parsed = JSON.parse(token);
      return parsed.id;
    }
  };

  static login = (token, id) => {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify({ token, id }));
  };

  static logout = () => {
    localStorage.removeItem(this.TOKEN_KEY);
  };
}

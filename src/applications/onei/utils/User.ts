import JwtDecode from 'jwt-decode';

export default class User {

  public static from(token: string) {
    try {
      const obj = JwtDecode(token);
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  private user_name: string;
  private authorities: String[];
  private scope: String[];
  private jasper: String;
  private user_id: String;

  constructor(user: User) {
    this.user_name = user.user_name;
    this.user_id = user.user_id;
    this.authorities = user.authorities;
    this.scope = user.scope;
    this.jasper = user.jasper;
  }
}

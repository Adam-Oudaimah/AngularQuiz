export class User {
  public id: number;
  public first_name: string;
  public last_name: string;
  public avatar: string;
  public email: string;

  constructor() {
    // Initialization inside the constructor
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
    this.avatar = '';
    this.email = '';
  }
}

export class Users {
  data: Array<User> = [];
}

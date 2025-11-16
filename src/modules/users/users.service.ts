import bcrypt from "bcrypt";

const users = [
  { id: 1, email: "demo@mail.com", password: bcrypt.hashSync("123456", 10) },
];

export class UserService {
  static findByEmail(email: string) {
    return users.find((user) => user.email === email);
  }
}

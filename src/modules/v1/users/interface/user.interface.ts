export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IForgetPassword {
  email: string;
  role: string;
}
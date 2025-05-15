export interface IUser {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
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

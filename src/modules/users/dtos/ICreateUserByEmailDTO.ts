type Roles = 'admin' | 'user' | 'shop';

export default interface ICreateUserDTO {
  email?: string;
  name?: string;
  password?: string;
  username: string;
  phone_number?: string;
  roles?: Roles;
}
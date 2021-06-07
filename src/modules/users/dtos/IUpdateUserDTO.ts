type Permissions = 'user' | 'admin' | 'shop';

export default interface IUpdateUserDTO {
  email?: string;
  name?: string;
  password?: string;
  username?: string;
  roles?: Permissions;
  bio?: string;
  
}

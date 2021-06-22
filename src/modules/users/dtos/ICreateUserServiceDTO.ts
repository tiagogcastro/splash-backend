export default interface ICreateUserServiceDTO {
  role?: string;
  name?: string;
  phone_number?: string;
  email?: string;
  verification_code?: string;
  balance_amount?: number;
  username?: string;
  password: string;
  sponsorship_code?: string;
  terms?: boolean;
}

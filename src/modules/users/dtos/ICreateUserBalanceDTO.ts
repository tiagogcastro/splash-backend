export default interface ICreateUserBalanceDTO {
  user_id: string;
  total_balance?: number;
  available_for_withdraw?: number;
}

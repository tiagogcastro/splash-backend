export default interface ICreateUserBalanceDTO {
  user_id: string;
  total_balance?: number;
  available_balance_amount?: number;
  unavailable_balance_amount?: number;
}

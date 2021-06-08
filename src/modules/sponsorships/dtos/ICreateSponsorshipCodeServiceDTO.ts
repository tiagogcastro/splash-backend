export default interface ICreateSponsorshipCodeServiceDTO {
  sponsor_user_id: string;
  allow_withdrawal_balance: boolean;
  amount: number;
}

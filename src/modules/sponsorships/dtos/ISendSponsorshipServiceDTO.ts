export default interface ISendSponsorshipServiceDTO {
  user_recipient_id: string;
  sponsor_user_id: string;
  amount: number;
  allow_withdrawal_balance: boolean;
}

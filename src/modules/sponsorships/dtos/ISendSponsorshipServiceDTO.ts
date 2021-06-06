export default interface ISendSponsorshipServiceDTO {
  user_recipient_id: string;
  sponsor_user_id: string;
  sponsorship_code: boolean;
  amount: number;
  allow_withdrawal_balance: boolean;
}

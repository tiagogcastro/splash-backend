export default interface ISendSponsorshipServiceDTO {
  user_recipient_id: string;
  sponsor_id: string;
  allow_withdrawal?: boolean;
  your_sponsor_balance: number;
}

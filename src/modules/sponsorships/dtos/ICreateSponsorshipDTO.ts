export default interface ICreateSponsorshipDTO {
  sponsored_user_id?: string;
  sponsor_user_id: string;
  amount: number;
  sponsorship_code?: string;
  allow_withdrawal: boolean;
}

export default interface IUpdateSponsorshipDTO {
  sponsored_user_id: string;
  status: 'redeemed' | 'expired';
}

export default interface IUpdateUserByAdminServiceDTO {
  user_id: string;
  reset_password?: string;
  withdraw_amount?: number;
  balance_amount_add?: number;
  roles?: string;
}

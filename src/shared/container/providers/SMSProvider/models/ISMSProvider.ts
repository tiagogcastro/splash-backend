import IVerifyCodeDTO from '../dtos/IVerifyCodeDTO';

export default interface ISMSProvider {
  sendCode(to: string): Promise<void>;
  verifyCode(verifyCodeData: IVerifyCodeDTO): Promise<void>;
}

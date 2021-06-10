import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  address: string;
}
export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template_data: IParseMailTemplateDTO;
}

import fs from 'fs';
import { compile } from 'handlebars';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider
{
  async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileRead = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = compile(templateFileRead);

    return parseTemplate(variables);
  }
}

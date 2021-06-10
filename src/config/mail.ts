interface IMailDefault {
  from: {
    name: string;
    address: string;
  };
}
interface IMailConfig {
  driver: 'ethereal' | 'ses';
  config: {
    ethereal: {
      defaults: IMailDefault;
    };
    ses: {
      defaults: IMailDefault;
      api_version: string;
      region: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  config: {
    ethereal: {
      defaults: {
        from: {
          name: 'Equipe Ethereal',
          address: 'etherealmail@mail.com',
        },
      },
    },
    ses: {
      defaults: {
        from: {
          name: 'Lavimco',
          address: 'lavimco@lavimco.com',
        },
      },
      api_version: '2010-12-01',
      region: 'sa-east-1',
    },
  },
} as IMailConfig;

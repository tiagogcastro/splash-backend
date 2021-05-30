import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeFieldsAndAddNewFieldsToUser1622329658639
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('users', [
      {
        oldColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: false,
        }),

        newColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        }),

        newColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
          isNullable: false,
        }),

        newColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
          isNullable: true,
        }),
      },
    ]);

    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'sponsoring',
        type: 'int',
        default: 0,
      }),

      new TableColumn({
        name: 'sponsored',
        type: 'int',
        default: 0,
      }),

      new TableColumn({
        name: 'phoneNumber',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'money',
        type: 'float',
        default: 0,
      }),

      new TableColumn({
        name: 'permissions',
        type: 'int',
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('users', [
      new TableColumn({
        name: 'sponsoring',
        type: 'int',
        default: 0,
      }),

      new TableColumn({
        name: 'sponsored',
        type: 'int',
        default: 0,
      }),

      new TableColumn({
        name: 'phoneNumber',
        type: 'varchar',
        isNullable: true,
      }),

      new TableColumn({
        name: 'money',
        type: 'float',
        default: 0,
      }),

      new TableColumn({
        name: 'permissions',
        type: 'int',
        default: 0,
      }),
    ]);

    await queryRunner.changeColumns('users', [
      {
        newColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: false,
        }),

        oldColumn: new TableColumn({
          name: 'name',
          type: 'varchar',
          isNullable: true,
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        }),

        oldColumn: new TableColumn({
          name: 'email',
          type: 'varchar',
          isUnique: true,
          isNullable: true,
        }),
      },
      {
        newColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
          isNullable: false,
        }),

        oldColumn: new TableColumn({
          name: 'password',
          type: 'varchar',
          isNullable: true,
        }),
      },
    ]);
  }
}

import { v4 as uuid } from 'uuid';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { hashSync } from 'bcryptjs';

export default class CreateUser1622143314249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
            length: '40',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            length: '40',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bio',
            type: 'varchar',
            isNullable: true,
            length: '90',
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
            length: '110',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true,
            length: '30',
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'active_account',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([
        {
          id: uuid(),
          name: 'Administrator',
          username: 'administrator',
          email: 'd0fe9bbf6f8f275c0a83fb622f3fcde7@lavimco.com',
          password: hashSync('131a8cd69bd56ee2af94a34597ff0d57'),
          role: 'admin',
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserBalance1622734880809
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_balance',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'total_balance',
            type: 'float',
            default: 0,
          },
          {
            name: 'available_for_withdraw',
            type: 'float',
            default: 0,
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
        foreignKeys: [
          {
            name: 'FKUserBalanceUserID',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_balance');
  }
}

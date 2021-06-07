import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSponsorBalance1623003005990
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sponsor_balance',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'available_for_withdrawal',
            type: 'float',
          },
          {
            name: 'balance_amount',
            type: 'float',
          },
          {
            name: 'sponsored_user_id',
            type: 'uuid',
          },
          {
            name: 'sponsor_shop_id',
            type: 'uuid',
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
            name: 'FKSponsorShopID',
            columnNames: ['sponsor_shop_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKSponsoredUserID',
            columnNames: ['sponsored_user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sponsor_balance');
  }
}

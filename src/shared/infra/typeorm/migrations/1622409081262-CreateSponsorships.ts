import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSponsorships1622409081262
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sponsorships',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_recipient_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'sponsor_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'your_sponsor_balance',
            type: 'float',
          },
          {
            name: 'withdrawal_balance_available',
            type: 'boolean',
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
            name: 'FKUserRecipientID',
            columnNames: ['user_recipient_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKSponsorID',
            columnNames: ['sponsor_id'],
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
    await queryRunner.dropTable('sponsorships');
  }
}

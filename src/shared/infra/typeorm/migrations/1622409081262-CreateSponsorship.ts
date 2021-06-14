import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSponsorship1622409081262
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sponsorship',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'sponsor_user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'sponsored_user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'allow_withdrawal',
            type: 'boolean',
          },
          {
            name: 'sponsorship_code',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
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
            name: 'FKSponsorUserID',
            columnNames: ['sponsor_user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKSponsoredUserID',
            columnNames: ['sponsored_user_id'],
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
    await queryRunner.dropTable('sponsorship');
  }
}

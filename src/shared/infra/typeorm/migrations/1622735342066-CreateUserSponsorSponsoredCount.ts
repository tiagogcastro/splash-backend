import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUserSponsoringSponsored1622735342066
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_sponsor_sponsored_count',
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
            name: 'sponsor_count',
            type: 'int',
            default: 0,
          },
          {
            name: 'sponsored_count',
            type: 'int',
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
            name: 'FKUserSponsoringSponsoredUserID',
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
    await queryRunner.dropTable('user_sponsor_sponsored_count');
  }
}

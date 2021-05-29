import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSponsoring1622226527670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sponsoring',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'sponsoring_userId',
            type: 'uuid',
          },
          {
            name: 'sponsored_userId',
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
            name: 'sponsoringFK_userId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['sponsoring_userId'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'sponsoredFK_userId',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['sponsored_userId'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sponsoring');
  }
}

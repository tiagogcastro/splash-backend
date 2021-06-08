"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSponsorsingSponsored1622735619450 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'sponsorsing_sponsored',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'sponsor_user_id',
        type: 'uuid',
        isUnique: true,
        isNullable: true
      }, {
        name: 'sponsored_user_id',
        type: 'uuid',
        isUnique: true,
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKSponsorUserID',
        columnNames: ['sponsor_user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FKSponsoredUserID',
        columnNames: ['sponsored_user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('sponsorsing_sponsored');
  }

}

exports.default = CreateSponsorsingSponsored1622735619450;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserSponsorsingSponsored1622735342066 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_sponsorsing_sponsored',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'user_id',
        type: 'uuid',
        isUnique: true,
        isNullable: true
      }, {
        name: 'sponsoring_count',
        type: 'int',
        default: 0
      }, {
        name: 'sponsored_count',
        type: 'int',
        default: 0
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
        name: 'FKUserSponsoringSponsoredUserID',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_sponsorsing_sponsored');
  }

}

exports.default = CreateUserSponsorsingSponsored1622735342066;
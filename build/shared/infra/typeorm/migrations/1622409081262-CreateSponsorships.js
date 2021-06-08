"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSponsorships1622409081262 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'sponsorships',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'sponsor_user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'sponsored_user_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'amount',
        type: 'float'
      }, {
        name: 'status',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'allow_withdrawal',
        type: 'boolean'
      }, {
        name: 'sponsorship_code',
        type: 'varchar',
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
    await queryRunner.dropTable('sponsorships');
  }

}

exports.default = CreateSponsorships1622409081262;
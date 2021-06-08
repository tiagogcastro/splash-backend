"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSponsorBalance1623003005990 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'sponsor_balance',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'balance_amount',
        type: 'float'
      }, {
        name: 'sponsored_user_id',
        type: 'uuid'
      }, {
        name: 'sponsor_shop_id',
        type: 'uuid'
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
        name: 'FKSponsorShopID',
        columnNames: ['sponsor_shop_id'],
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
    await queryRunner.dropTable('sponsor_balance');
  }

}

exports.default = CreateSponsorBalance1623003005990;
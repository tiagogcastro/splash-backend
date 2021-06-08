"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateUserBalance1622734880809 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user_balance',
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
        name: 'total_balance',
        type: 'float',
        default: 0
      }, {
        name: 'balance_amount',
        type: 'float',
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
        name: 'FKUserBalanceUserID',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('user_balance');
  }

}

exports.default = CreateUserBalance1622734880809;
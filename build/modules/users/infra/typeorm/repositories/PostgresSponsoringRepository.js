"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Sponsoring = _interopRequireDefault(require("../entities/Sponsoring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresSponsoringRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Sponsoring.default);
  }

  async deleteById(id) {
    await this.ormRepository.delete(id);
  }

  async create(sponsoringData) {
    const userSponsoring = this.ormRepository.create(sponsoringData);
    await this.ormRepository.save(userSponsoring);
    return userSponsoring;
  }

  async findBySponsoringAndSponsored(sponsor_user_id, sponsored_user_id) {
    const userSponsoring = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id
      }
    });
    return userSponsoring;
  }

  async findAllBySponsoringUserId(sponsoring_user_id) {
    const usersSponsoring = await this.ormRepository.find({
      where: {
        sponsoring_user_id
      },
      relations: ['sponsored_userId']
    });
    return usersSponsoring;
  }

  async findAllBySponsoredUserId(sponsored_user_id) {
    const usersSponsored = await this.ormRepository.find({
      where: {
        sponsored_user_id
      },
      relations: ['sponsor_userId']
    });
    return usersSponsored;
  }

}

exports.default = PostgresSponsoringRepository;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Sponsorship = _interopRequireDefault(require("../entities/Sponsorship"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostgresSponsorshipsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Sponsorship.default);
  }

  async findByUnreadSponsorshipCode(sponsorship_code) {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsorship_code
      }
    });
    return sponsorship;
  }

  async updateSponsorship(sponsor_user_id, sponsorshipsUpdateData) {
    const {
      affected
    } = await this.ormRepository.update(sponsor_user_id, sponsorshipsUpdateData);

    if (affected === 1) {
      const updated = await this.ormRepository.findOne(sponsor_user_id);
      return updated;
    }

    return undefined;
  }

  async findBySponsorshipCode(sponsorship_code) {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsorship_code
      }
    });
    return sponsorship;
  }

  async findAllSponsorshipsFromUser(sponsored_user_id) {
    const sponsorships = await this.ormRepository.find({
      where: {
        sponsored_user_id
      },
      relations: ['sponsor']
    });
    return sponsorships;
  }

  async save(sponsorship) {
    return this.ormRepository.save(sponsorship);
  }

  async findSponsorship({
    sponsor_user_id,
    sponsored_user_id
  }) {
    const sponsorship = await this.ormRepository.findOne({
      where: {
        sponsor_user_id,
        sponsored_user_id
      }
    });
    return sponsorship;
  }

  async findAllSponsoredFromUser(sponsor_user_id) {
    const sponsorships = await this.ormRepository.find({
      where: {
        sponsor_user_id
      },
      relations: ['sponsored']
    });
    return sponsorships;
  }

  async create(sponsorshipData) {
    const sponsorship = this.ormRepository.create(sponsorshipData);
    await this.ormRepository.save(sponsorship);
    return sponsorship;
  }

}

exports.default = PostgresSponsorshipsRepository;
import { Request, Response } from 'express';

import SponsorUserService from '@modules/users/services/SponsorUserService';


class SponsoringController {
  async update(request: Request, response: Response): Promise<Response> {
    const {sponsoring_userId, sponsored_userId} = request.body;

    const sponsoringUser = new SponsorUserService();

    const sponsor = await sponsoringUser.execute(sponsoring_userId, sponsored_userId);

    return response.json(sponsor);
  }
}

export default SponsoringController;


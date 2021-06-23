import SendVerificationTokenService from '@modules/users/services/SendVerificationTokenService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SendVerificationTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { email } = request.body;

    const sendVerificationToken = container.resolve(
      SendVerificationTokenService,
    );
    await sendVerificationToken.execute({ user_id, email });

    return response.status(200).json({
      status: 'success',
      message:
        'Please check your email, your code will be expire after 12 hours',
    });
  }
}

export default SendVerificationTokenController;

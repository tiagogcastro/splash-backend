import UpdateUserByAdminService from '@modules/users/services/UpdateUserByAdminService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class AdminsController {
  async update(request: Request, response: Response): Promise<Response> {
    const {
      user_id,
      balance_amount_add,
      reset_password,
      roles,
      withdraw_amount,
    } = request.body;

    const updateUserByAdmin = container.resolve(UpdateUserByAdminService);

    const userBalance = await updateUserByAdmin.execute({
      user_id,
      balance_amount_add,
      reset_password,
      roles,
      withdraw_amount,
    });

    return response.status(200).json(classToClass(userBalance));
  }
}

export default AdminsController;

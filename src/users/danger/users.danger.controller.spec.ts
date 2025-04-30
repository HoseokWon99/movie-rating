import { Test, TestingModule } from '@nestjs/testing';
import { UsersDangerController } from './users.danger.controller';
import { UsersService } from '../users.service';
import { UpdatePasswordDTO } from './dto';
import { Response } from 'express';
import { JwtService } from "@nestjs/jwt";

describe('UsersDangerController', () => {
  let controller: UsersDangerController;
  let usersServiceMock: { updateUser: jest.Mock; deleteUser: jest.Mock };
  let jwtServiceMock: { verifyAsync: jest.Mock };
  let resMock: Partial<Response>;

  beforeEach(async () => {

    usersServiceMock = {
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };

    jwtServiceMock = {
      verifyAsync: jest.fn()
    };

    resMock = {
      locals: { userInfo: { id: 1, email: 'test@example.com' } },
      sendStatus: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersDangerController],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },

      ],
    }).compile();

    controller = module.get<UsersDangerController>(UsersDangerController);
  });

  describe('resetPassword', () => {
    it('should call updateUser with correct params and send 200', async () => {
      const dto: UpdatePasswordDTO = { oldPassword: 'newpassword123' };

      await controller.resetPassword(dto, resMock as Response);

      expect(usersServiceMock.updateUser).toHaveBeenCalledWith({
        id: 1,
        password: dto.oldPassword,
      });
      expect(resMock.locals?.userInfo).toBeUndefined();
      expect(resMock.sendStatus).toHaveBeenCalledWith(200);
    });
  });

  describe('quit', () => {
    it('should call deleteUser with correct userInfo and send 200', async () => {
      await controller.quit(resMock as Response);

      expect(usersServiceMock.deleteUser).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
      expect(resMock.locals?.userInfo).toBeUndefined();
      expect(resMock.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceMock: { signIn: jest.Mock; signOut: jest.Mock; renew: jest.Mock };
  let resMock: Pick<Response, "cookie" | "send" | "locals">;

  beforeEach(async () => {
    authServiceMock = {
      signIn: jest.fn(),
      signOut: jest.fn(),
      renew: jest.fn(),
    };
    resMock = {
      cookie: jest.fn(),
      send: jest.fn(),
      locals: {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('signIn', () => {
    it('should call signIn and set cookie', async () => {
      const dto: SignInDTO = { email: 'test@example.com', password: 'password' };
      authServiceMock.signIn.mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });

      const result = await controller.signIn(dto, resMock as Response);

      expect(authServiceMock.signIn).toHaveBeenCalledWith(dto);
      expect(resMock.cookie).toHaveBeenCalledWith(
        'refresh-token',
        'refresh-token',
        { maxAge: Number(process.env.JWT_REFRESH_TOKEN_DURATION) },
      );
      expect(result).toEqual({ accessToken: 'access-token' });
    });
  });

  describe('signOut', () => {
    it('should call signOut with token', async () => {
      resMock.locals.token = 'some-refresh-token';

      await controller.signOut(resMock as Response);

      expect(authServiceMock.signOut).toHaveBeenCalledWith('some-refresh-token');
    });
  });

  describe('renew', () => {
    it('should call renew and send new access token', () => {
      resMock.locals.userInfo = { id: 1, email: 'test@example.com' };
      authServiceMock.renew.mockReturnValue('new-access-token');

      controller.renew(resMock as Response);

      expect(authServiceMock.renew).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
      expect(resMock.locals.userInfo).toBeUndefined();
      expect(resMock.send).toHaveBeenCalledWith({ accessToken: 'new-access-token' });
    });
  });
});

import { AuthService } from './auth.service';
import { UsersService } from '../users';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO, TokenPayload } from './dto';
import { encryptPassword } from '../utils/encryptPassord';
import Redis from "ioredis";
import { config } from "dotenv";

config({ path: __dirname + "/../../.env" });


describe('AuthService', () => {
  let service: AuthService;
  let usersServiceMock: { getUserBy: jest.Mock; }
  let jwtServiceMock: { sign: jest.Mock };
  let redisMock: { set: jest.Mock };

  beforeEach(async () => {
    usersServiceMock = { getUserBy: jest.fn() };
    jwtServiceMock = { sign: jest.fn() };
    redisMock = { set: jest.fn() };

    service = new AuthService(
      usersServiceMock as unknown as UsersService,
      jwtServiceMock as unknown as JwtService,
      redisMock as unknown as Redis
    );

  });

  describe('signIn', () => {
    it('should return access and refresh tokens', async () => {
      const dto: SignInDTO = { email: 'test@example.com', password: 'password123' };

      usersServiceMock.getUserBy.mockResolvedValue({ id: 1 });

      jwtServiceMock.sign
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.signIn(dto);

      expect(usersServiceMock.getUserBy).toHaveBeenCalledWith({
        email: dto.email,
        password: encryptPassword('password123'),
      });

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });

    });
  });

  describe('renew', () => {
    it('should return a new access token', () => {
      const userInfo: TokenPayload = { id: 1, email: 'test@example.com' };
      jwtServiceMock.sign.mockReturnValue('new-access-token');

      const token = service.renew(userInfo);

      expect(jwtServiceMock.sign).toHaveBeenCalledWith(
        userInfo,
        { expiresIn: Number(process.env.JWT_ACCESS_TOKEN_DURATION) }
      );
      expect(token).toBe('new-access-token');
    });
  });

  describe('signOut', () => {
    it('should exist (no-op test for now)', async () => {
      await service.signOut('access-token');
      expect(redisMock.set).toHaveBeenCalledWith(
        'access-token', 1, "EX", Number(process.env.JWT_ACCESS_TOKEN_DURATION)
      )
    });
  });
});

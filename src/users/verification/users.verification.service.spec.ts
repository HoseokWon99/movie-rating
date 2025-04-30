import { Test, TestingModule } from '@nestjs/testing';
import { UsersVerificationService } from './users.verification.service';
import { UsersService } from '../users.service';
import { MailClient } from '../../config/mail';
import Redis from 'ioredis';
import { SignUpDTO, ForgetPasswordDTO } from './dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersVerificationService', () => {
  let service: UsersVerificationService;
  let mailClient: MailClient;
  let usersService: UsersService;
  let redis: Redis;

  const mockMailClient = {
    sendMail: jest.fn()
  };

  const mockUsersService = {
    getUserBy: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn()
  };

  const mockRedis = {
    set: jest.fn(),
    get: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersVerificationService,
        { provide: MailClient, useValue: mockMailClient },
        { provide: UsersService, useValue: mockUsersService },
        { provide: Redis, useValue: mockRedis },
      ]
    }).compile();

    service = module.get<UsersVerificationService>(UsersVerificationService);
    mailClient = module.get<MailClient>(MailClient);
    usersService = module.get<UsersService>(UsersService);
    redis = module.get<Redis>(Redis);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send email verification and store SignUpDTO with key', async () => {
    const dto: SignUpDTO = { name: "test", email: 'test@example.com', password: 'pass1234!' };
    await service.signUp(dto);
  });

  it('should send password reset and set redis key on forgetPassword', async () => {
    mockUsersService.getUserBy.mockResolvedValue({ id: 1 });
    const dto: ForgetPasswordDTO = { name: "test", email: 'test@example.com' };
    await service.forgetPassword(dto);
    expect(mailClient.sendMail).toHaveBeenCalled();
    expect(redis.set).toHaveBeenCalled();
  });

  it('should verify email and create user', async () => {
    const dto: SignUpDTO = { name: "test", email: 'verify@example.com', password: 'pass1234!' };
    mockRedis.get.mockResolvedValue(JSON.stringify(dto));
    await service.verifyEmail('key');
    expect(usersService.createUser).toHaveBeenCalledWith(expect.objectContaining({ email: dto.email }));
  });

  it('should throw if verifyEmail key not found', async () => {
    mockRedis.get.mockResolvedValue(null);
    await expect(service.verifyEmail('invalid')).rejects.toThrow(NotFoundException);
  });

  it('should reset password if key is valid', async () => {
    mockRedis.get.mockResolvedValue('42');
    await service.resetPassword('key', 'newpass5678!');
    expect(usersService.updateUser).toHaveBeenCalledWith({ id: 42, password: 'newpass5678!' });
  });

  it('should throw if resetPassword key is missing', async () => {
    mockRedis.get.mockResolvedValue(null);
    await expect(service.resetPassword('invalid', 'newpass5678!')).rejects.toThrow(NotFoundException);
  });
});
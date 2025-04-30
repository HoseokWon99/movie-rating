import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dto';

describe('UsersService', () => {
  let service: UsersService;

  let usersReposMock: {
    findOneBy: jest.Mock;
    save: jest.Mock;
    remove: jest.Mock;
  };

  let eventEmitterMock: { emit: jest.Mock };

  beforeEach(() => {

    usersReposMock = {
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    eventEmitterMock = { emit: jest.fn() };

    service = new UsersService(
      usersReposMock as unknown as Repository<User>,
      eventEmitterMock as unknown as EventEmitter2
    );

  });

  describe('getUserBy', () => {

    it('should return user if found', async () => {
      const user = { id: 1, email: 'test@example.com' } as User;
      usersReposMock.findOneBy.mockResolvedValue(user);
      const result = await service.getUserBy({ email: 'test@example.com' });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      usersReposMock.findOneBy!.mockResolvedValue(undefined);

      await expect(service.getUserBy({ email: 'test@example.com' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('existsUserBy', () => {
    it('should return true if user exists', async () => {
      usersReposMock.findOneBy!.mockResolvedValue({} as User);

      const result = await service.existsUserBy({ email: 'test@example.com' });
      expect(result).toBe(true);
    });

    it('should return false if user does not exist', async () => {
      usersReposMock.findOneBy.mockResolvedValue(null);
      const result = await service.existsUserBy({ email: 'test@example.com' });
      expect(result).toBe(false);
    });
  });

  describe('createUser', () => {

    it('should throw BadRequestException if email exists', async () => {
      usersReposMock.findOneBy.mockResolvedValue({} as User);

      const dto = {
        email: 'test@example.com',
        authType: 'NATIVE',
        password: '1234'
      } as CreateUserDTO;

      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if password is missing for NATIVE', async () => {
      usersReposMock.findOneBy.mockResolvedValue(null);
      const dto = { email: 'test@example.com', authType: 'NATIVE' } as CreateUserDTO;
      await expect(service.createUser(dto)).rejects.toThrow(BadRequestException);
    });

    it('should save user and emit event if valid', async () => {
      usersReposMock.findOneBy.mockResolvedValue(null);
      usersReposMock.save.mockResolvedValue({ id: 1, name: "test" } as User);

      await service.createUser({
        email: 'test@example.com',
        authType: 'NATIVE',
        password: '1234' } as CreateUserDTO
      );

      expect(usersReposMock.save).toHaveBeenCalled();
      expect(eventEmitterMock.emit).toHaveBeenCalledWith('user.created', { id: 1, name: "test" });
    });
  });

  describe('deleteUser', () => {
    it('should remove user and emit event', async () => {
      const user = { id: 1 } as User;
      usersReposMock.findOneBy!.mockResolvedValue(user);
      usersReposMock.remove!.mockResolvedValue(user);
      await service.deleteUser({ email: 'test@example.com' });
      expect(usersReposMock.remove).toHaveBeenCalledWith(user);
      expect(eventEmitterMock.emit).toHaveBeenCalledWith('user.deleted', user);
    });
  });

  describe('updateUser', () => {
    it('should save updated user', async () => {
      const updateDto: UpdateUserDTO = { id: 1, password: 'isrocked3234!' } as UpdateUserDTO;
      usersReposMock.save!.mockResolvedValue(updateDto);
      await service.updateUser(updateDto);
      expect(usersReposMock.save).toHaveBeenCalledWith(updateDto);
    });
  });
});

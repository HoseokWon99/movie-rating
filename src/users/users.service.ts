import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.model";
import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { encryptPassword } from "../utils/encryptPassord";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly _usersRepos: Repository<User>,
        @Inject(EventEmitter2)
        private readonly _eventEmitter: EventEmitter2
    ) {}

    async getUserBy(dto: GetUserDTO) {
      const user = await this._usersRepos.findOneBy(dto);
      if (!user) throw new NotFoundException();
      return user;
    }

    async existsUserBy(dto: GetUserDTO) {
      return await this._usersRepos.findOneBy(dto)
        .then(user => !!user);
    }

    async createUser(dto: CreateUserDTO) {

        if (await this.existsUserBy({ email: dto.email }))
            throw new BadRequestException("이미 존재하는 이메일 입니다");

        if (dto.authType === "NATIVE") {

           if (dto.password === undefined)
                throw new BadRequestException("패스워드가 비어있습니다");

            dto.password = encryptPassword(dto.password);
        }

        const user: User = await this._usersRepos.save(dto);
        this._eventEmitter.emit("user.created", user);
    }

    async deleteUser(dto: GetUserDTO) {

      const user = await this.getUserBy(dto)
        .then(this._usersRepos.remove);

      this._eventEmitter.emit("user.deleted", user);
    }

    async updateUser(dto: UpdateUserDTO) {
      await this._usersRepos.save(dto);
    }


}

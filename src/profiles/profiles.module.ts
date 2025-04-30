import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./profile.model";
import { ProfilesViewController } from "./profiles.view.controller";
import { AuthModule } from "../auth";
import { AUTH_GUARDS } from "../auth";
import { User } from "../users";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [ProfilesController, ProfilesViewController],
  providers: [ProfilesService, ...AUTH_GUARDS, AuthService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    AuthModule
  ],
  exports: [ProfilesService]
})
export class ProfilesModule {}

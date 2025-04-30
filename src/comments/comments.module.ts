import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from "./comment.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentsModule {}

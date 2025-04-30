import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { Comment } from "./comment.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment)
        private readonly _commentsRepos: Repository<Comment>,
    ) {}

    async getComment(id: number) {

        const comment = await this._commentsRepos
            .findOneBy({ id: id });

        if (!comment) throw new NotFoundException();
        return comment;
    }

}

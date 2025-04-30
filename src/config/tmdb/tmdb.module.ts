import { Module } from "@nestjs/common";

@Module({
    providers: [TMDBModule],
    exports: [TMDBModule]
})
export class TMDBModule {}
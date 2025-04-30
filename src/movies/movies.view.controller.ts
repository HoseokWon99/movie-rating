import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("movies")
export class MoviesViewController {

    @Get("/:movieId")
    render(
        @Res() res: Response
    ) {
        res.render("movie-detail.html");
    }

}
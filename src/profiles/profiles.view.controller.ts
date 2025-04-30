import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";


@Controller("profiles")
export class ProfilesViewController {


  @Get("/")
  renderProfile(@Res() res: Response) {
    res.render("edit-profile.html");
  }


}

